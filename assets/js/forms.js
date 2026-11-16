/**
 * PIXELINT — Universal Form Validation & Submission
 * Handles validation, AJAX submission to pixelintofficial@gmail.com via FormSubmit,
 * real-time inline errors, honeypot spam protection, sending states and success panels.
 */
(function () {
  'use strict';

  var FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/pixelintofficial@gmail.com';

  function initPixelintForms() {
    var forms = document.querySelectorAll('form[data-pixelint-form]');
    forms.forEach(function (form) {
      setupForm(form);
    });
  }

  function setupForm(form) {
    // Disable native browser validation popups
    form.noValidate = true;

    // Top alert banner (for "Please fix the highlighted fields")
    var alertBox = document.createElement('div');
    alertBox.className = 'form-alert';
    alertBox.setAttribute('role', 'alert');
    alertBox.setAttribute('aria-live', 'polite');
    alertBox.hidden = true;
    form.insertBefore(alertBox, form.firstChild);

    // Track touched fields
    var touchedMap = new WeakMap();

    // Setup choice chip / radio groups inside fieldset[data-group]
    var chipGroups = form.querySelectorAll('fieldset[data-group]');
    chipGroups.forEach(function (group) {
      setupChipGroup(group, touchedMap);
    });

    // Find all interactive fields
    var inputs = form.querySelectorAll('input:not([type="hidden"]):not(.form-honey), select, textarea');
    inputs.forEach(function (input) {
      if (input.type === 'radio' || input.type === 'checkbox') return; // Handled by group or checkbox handler

      input.addEventListener('blur', function () {
        touchedMap.set(input, true);
        validateElement(input);
      });

      input.addEventListener('input', function () {
        if (touchedMap.get(input)) {
          validateElement(input);
          hideAlertIfAllValid(form);
        }
      });

      input.addEventListener('change', function () {
        if (touchedMap.get(input)) {
          validateElement(input);
          hideAlertIfAllValid(form);
        }
      });
    });

    // Standalone checkboxes (like consent)
    var singleCheckboxes = form.querySelectorAll('.field > input[type="checkbox"]');
    singleCheckboxes.forEach(function (chk) {
      chk.addEventListener('change', function () {
        touchedMap.set(chk, true);
        validateElement(chk);
      });
    });

    // Submit handler
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Check honeypot spam trap
      var honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value.trim() !== '') {
        // Silently swallow bot submission
        showSuccessView(form);
        return;
      }

      // Validate all fields
      var firstInvalid = null;
      var hasError = false;

      // Validate chip groups
      chipGroups.forEach(function (group) {
        touchedMap.set(group, true);
        var err = validateChipGroup(group);
        if (err && !firstInvalid) {
          firstInvalid = group.querySelector('input, label') || group;
          hasError = true;
        } else if (err) {
          hasError = true;
        }
      });

      // Validate inputs/selects/textareas
      inputs.forEach(function (input) {
        if (input.type === 'radio' || input.type === 'checkbox') return;
        touchedMap.set(input, true);
        var err = validateElement(input);
        if (err && !firstInvalid) {
          firstInvalid = input;
          hasError = true;
        } else if (err) {
          hasError = true;
        }
      });

      // Validate standalone checkboxes
      singleCheckboxes.forEach(function (chk) {
        touchedMap.set(chk, true);
        var err = validateElement(chk);
        if (err && !firstInvalid) {
          firstInvalid = chk;
          hasError = true;
        } else if (err) {
          hasError = true;
        }
      });

      if (hasError) {
        alertBox.textContent = 'Please fix the highlighted fields.';
        alertBox.hidden = false;
        if (firstInvalid) {
          try {
            firstInvalid.focus({ preventScroll: false });
          } catch (ex) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
        return;
      }

      // Valid: send data
      alertBox.hidden = true;
      submitForm(form);
    });
  }

  function setupChipGroup(group, touchedMap) {
    function syncChipClasses() {
      var chips = group.querySelectorAll('.field-chip');
      chips.forEach(function (chip) {
        var input = chip.querySelector('input[type="radio"], input[type="checkbox"]');
        if (input && input.checked) chip.classList.add('is-checked');
        else chip.classList.remove('is-checked');
      });
    }

    syncChipClasses();

    group.addEventListener('change', function (e) {
      if (e.target && (e.target.type === 'radio' || e.target.type === 'checkbox')) {
        syncChipClasses();
        if (touchedMap.get(group)) {
          validateChipGroup(group);
        }
      }
    });

    group.addEventListener('sync', syncChipClasses);
  }

  function validateElement(el) {
    var field = el.closest('.field') || el.parentElement;
    var val = el.value ? el.value.trim() : '';
    var errorMsg = '';

    if (el.type === 'checkbox') {
      if (el.required && !el.checked) {
        errorMsg = 'This checkbox is required.';
      }
    } else {
      if (el.required && !val) {
        if (el.tagName.toLowerCase() === 'select') {
          errorMsg = 'Please select an option.';
        } else {
          errorMsg = 'Please fill in this field.';
        }
      } else if (val) {
        // Validate name
        if (el.getAttribute('data-validate') === 'name') {
          if (val.length < 2 || !/[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/.test(val)) {
            errorMsg = 'Please enter a valid name (at least 2 letters).';
          }
        }
        // Validate email
        else if (el.type === 'email') {
          var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
          if (!emailRegex.test(val)) {
            errorMsg = 'Please enter a valid email address.';
          }
        }
        // Validate phone
        else if (el.type === 'tel') {
          var digits = val.replace(/\D/g, '');
          var validChars = /^[+\d\s\-().]{7,25}$/;
          if (!validChars.test(val) || digits.length < 7 || digits.length > 15) {
            errorMsg = 'Please enter a valid phone number (min 7 digits).';
          }
        }
        // Validate URL
        else if (el.type === 'url') {
          try {
            var urlObj = new URL(val);
            if (!urlObj.protocol.startsWith('http')) {
              errorMsg = 'Please enter a valid URL starting with http:// or https://';
            }
          } catch (e) {
            errorMsg = 'Please enter a valid website link (e.g. https://...).';
          }
        }
        // Minlength check
        if (!errorMsg && el.minLength > 0 && val.length < el.minLength) {
          errorMsg = 'Please enter at least ' + el.minLength + ' characters (currently ' + val.length + ').';
        }
        // Maxlength check
        if (!errorMsg && el.maxLength > 0 && val.length > el.maxLength) {
          errorMsg = 'Maximum ' + el.maxLength + ' characters allowed.';
        }
      }
    }

    renderFieldError(field, el, errorMsg);
    return errorMsg;
  }

  function validateChipGroup(group) {
    var isRequired = group.hasAttribute('data-required');
    var errorMsg = '';

    if (isRequired) {
      var checked = group.querySelector('input:checked');
      if (!checked) {
        errorMsg = 'Please choose an option.';
      }
    }

    renderFieldError(group, group, errorMsg);
    return errorMsg;
  }

  function renderFieldError(container, targetEl, errorMsg) {
    var errEl = container.querySelector('.field-error');
    if (errorMsg) {
      container.classList.add('has-error');
      if (targetEl !== container && targetEl.setAttribute) {
        targetEl.setAttribute('aria-invalid', 'true');
      }
      if (!errEl) {
        errEl = document.createElement('span');
        errEl.className = 'field-error';
        errEl.setAttribute('role', 'alert');
        container.appendChild(errEl);
      }
      errEl.textContent = errorMsg;
      errEl.hidden = false;
      if (targetEl.id) {
        targetEl.setAttribute('aria-describedby', targetEl.id + '-err');
        errEl.id = targetEl.id + '-err';
      }
    } else {
      container.classList.remove('has-error');
      if (targetEl !== container && targetEl.removeAttribute) {
        targetEl.removeAttribute('aria-invalid');
      }
      if (errEl) {
        errEl.textContent = '';
        errEl.hidden = true;
      }
    }
  }

  function hideAlertIfAllValid(form) {
    var alertBox = form.querySelector('.form-alert');
    if (!alertBox || alertBox.hidden) return;
    var hasError = form.querySelector('.has-error');
    if (!hasError) {
      alertBox.hidden = true;
    }
  }

  function submitForm(form) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Send message';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-sending');
      submitBtn.textContent = 'Sending…';
    }

    // Build payload and subject
    var data = collectFormData(form);

    fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data.payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (json) {
        if (json && json.success === 'false') {
          throw new Error(json.message || 'Submission failed');
        }
        showSuccessView(form, originalBtnHtml);
      })
      .catch(function (err) {
        console.error('Form submission error:', err);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-sending');
          submitBtn.innerHTML = originalBtnHtml;
        }
        showFailureView(form, data.subject, data.email);
      });
  }

  function collectFormData(form) {
    var rawSubject = form.getAttribute('data-subject') || 'New project enquiry — PIXELINT website';
    var payload = {};
    var emailVal = '';
    var fieldValuesByName = {};

    // Collect all inputs, selects, textareas
    var elements = form.querySelectorAll('input, select, textarea');
    elements.forEach(function (el) {
      if (!el.name || el.name === '_honey' || el.type === 'submit' || el.type === 'button') return;

      var val = '';
      if (el.type === 'radio') {
        if (el.checked) val = el.value;
        else return;
      } else if (el.type === 'checkbox') {
        if (el.checked) val = el.value || 'Yes';
        else return;
      } else if (el.tagName.toLowerCase() === 'select') {
        val = el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : el.value;
      } else {
        val = el.value ? el.value.trim() : '';
      }

      if (!val) return;

      fieldValuesByName[el.name] = val;

      if (el.name === 'email') {
        emailVal = val;
      }

      // Determine human label for email row name
      var labelText = '';
      if (el.id) {
        var labelEl = form.querySelector('label[for="' + el.id + '"]');
        if (labelEl) labelText = labelEl.textContent;
      }
      if (!labelText) {
        var groupFieldset = el.closest('fieldset[data-group]');
        if (groupFieldset) {
          var legend = groupFieldset.querySelector('legend');
          if (legend) labelText = legend.textContent;
        }
      }
      if (!labelText) {
        labelText = el.name;
      }

      // Clean label
      var cleanLabel = labelText.replace(/[*:]/g, '').trim();
      payload[cleanLabel] = val;
    });

    // Replace {fieldName} in subject template
    var subject = rawSubject.replace(/\{(\w+)\}/g, function (_, key) {
      return fieldValuesByName[key] || '';
    });

    // Add FormSubmit configurations
    payload['_subject'] = subject;
    payload['_template'] = 'table';
    payload['_captcha'] = 'false';
    if (emailVal) {
      payload['_replyto'] = emailVal;
    }

    return {
      payload: payload,
      subject: subject,
      email: emailVal
    };
  }

  function showSuccessView(form, originalBtnHtml) {
    var successTitle = form.getAttribute('data-success-title') || 'Brief received.';
    var successText = form.getAttribute('data-success-text') || "Thanks — our team is studying your mission and will get back to you with next steps.";

    var panel = document.createElement('div');
    panel.className = 'form-success-panel';
    panel.setAttribute('role', 'status');
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML =
      '<span class="tick" aria-hidden="true">' +
      '  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' +
      '    <path d="M5 12.5l4.5 4.5L19 7.5"/>' +
      '  </svg>' +
      '</span>' +
      '<h3 class="display">' + escapeHtml(successTitle) + '</h3>' +
      '<p>' + escapeHtml(successText) + '</p>' +
      '<button type="button" class="btn btn-ghost form-send-another">Send another message</button>';

    form.style.display = 'none';
    form.parentNode.insertBefore(panel, form.nextSibling);

    var anotherBtn = panel.querySelector('.form-send-another');
    if (anotherBtn) {
      anotherBtn.addEventListener('click', function () {
        panel.remove();
        form.reset();

        // Reset all error states
        form.querySelectorAll('.has-error').forEach(function (f) { f.classList.remove('has-error'); });
        form.querySelectorAll('.field-error').forEach(function (e) { e.remove(); });
        form.querySelectorAll('[aria-invalid]').forEach(function (i) { i.removeAttribute('aria-invalid'); });

        // Reset radio chip visual states
        form.querySelectorAll('.field-chip').forEach(function (chip) {
          var input = chip.querySelector('input');
          if (input && input.checked) chip.classList.add('is-checked');
          else chip.classList.remove('is-checked');
        });

        // Reset submit button
        var submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-sending');
          if (originalBtnHtml) submitBtn.innerHTML = originalBtnHtml;
        }

        form.style.display = '';
        var firstInput = form.querySelector('input:not([type="hidden"]), select, textarea');
        if (firstInput) firstInput.focus();
      });
    }
  }

  function showFailureView(form, subject, email) {
    var alertBox = form.querySelector('.form-alert');
    if (!alertBox) return;

    var mailto = 'mailto:pixelintofficial@gmail.com?subject=' + encodeURIComponent(subject || 'PIXELINT Enquiry') +
      '&body=' + encodeURIComponent('Sent from: ' + email + '\n\nMessage:\n');

    alertBox.innerHTML =
      'Could not send message automatically. Please try again or email us directly at ' +
      '<a href="' + mailto + '">pixelintofficial@gmail.com</a>.';
    alertBox.hidden = false;
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPixelintForms);
  } else {
    initPixelintForms();
  }
})();
