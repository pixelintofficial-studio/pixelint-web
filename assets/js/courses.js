/* PIXELINT — The Dojo / Courses Data & Interactions */
(function () {
  'use strict';

  var COURSES = [
    {
      id: "product-design-ai",
      num: "01",
      title: "Product Design with AI",
      short: "Product design with AI",
      iconSvg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
      pitch: "Design digital products faster and smarter, with AI woven into research, ideation, prototyping and testing.",
      senseis: "Srinidhi · Nithish · Sadham",
      white: [
        "Design thinking & product basics",
        "User research with AI assistants",
        "Figma fundamentals"
      ],
      gold: [
        "AI-assisted ideation & wireframing",
        "Prototyping with AI tools",
        "Design systems"
      ],
      black: [
        "Building an AI-powered product concept",
        "Usability testing & iteration",
        "Portfolio case study"
      ],
      liveProject: "Design and pitch a complete product for a live brief, end to end, with AI in your workflow.",
      duration: "12 weeks",
      mode: "Online / In-person",
      nextBatch: "Enrolling now"
    },
    {
      id: "full-stack",
      num: "02",
      title: "Full Stack Development",
      short: "Full stack development",
      iconSvg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      pitch: "Go from your first line of code to shipping complete web apps: front end, back end and deployment.",
      senseis: "Nithish · Srinidhi",
      white: [
        "HTML, CSS & modern JavaScript",
        "Git & GitHub",
        "Responsive layouts"
      ],
      gold: [
        "React front ends",
        "Node.js & APIs",
        "Databases: SQL & NoSQL"
      ],
      black: [
        "Auth, payments & security basics",
        "Deploying to the cloud",
        "Building a full-stack app"
      ],
      liveProject: "Build and ship a live full-stack web app for a real use case.",
      duration: "12 weeks",
      mode: "Online / In-person",
      nextBatch: "Enrolling now"
    },
    {
      id: "ui-ux",
      num: "03",
      title: "UI & UX Design",
      short: "UI & UX design",
      iconSvg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
      pitch: "Learn to design interfaces people love: research, flows, visual design and prototypes that feel effortless.",
      senseis: "Sadham · Srinidhi · Nithish",
      white: [
        "UX principles & psychology",
        "User research & personas",
        "Information architecture"
      ],
      gold: [
        "Wireframes & user flows",
        "Visual UI design in Figma",
        "Interaction & micro-animation"
      ],
      black: [
        "Prototyping & usability testing",
        "Design systems & developer handoff",
        "Portfolio case studies"
      ],
      liveProject: "Redesign a real product for a live brief and present it as a full case study.",
      duration: "12 weeks",
      mode: "Online / In-person",
      nextBatch: "Enrolling now"
    },
    {
      id: "marketing-meta-ads",
      num: "04",
      title: "Marketing Strategy & Meta Ads",
      short: "Marketing & Meta ads",
      iconSvg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
      pitch: "Plan campaigns that convert: positioning, audiences, content and Meta ads that turn spend into sales.",
      senseis: "Thiru · Jaishrinaath",
      white: [
        "Marketing fundamentals & positioning",
        "Audience research",
        "Content & social strategy"
      ],
      gold: [
        "Meta Ads Manager setup",
        "Targeting, budgets & creatives",
        "Pixel & conversion tracking"
      ],
      black: [
        "A/B testing & scaling",
        "Analytics & reporting",
        "Full-funnel campaign planning"
      ],
      liveProject: "Plan and run a live Meta ad campaign, then report on the results.",
      duration: "12 weeks",
      mode: "Online / In-person",
      nextBatch: "Enrolling now"
    }
  ];

  window.PIXELINT_COURSES = COURSES;

  /* ---------- Render Course Cards (Section D) ---------- */
  function renderCourseCard(course) {
    return [
      '<article class="course-card wipe" id="course-' + course.id + '" data-course-id="' + course.id + '">',
      '  <div class="course-card-top">',
      '    <div class="course-icon-tile" aria-hidden="true">',
      '      ' + course.iconSvg,
      '    </div>',
      '    <div class="course-num-row">',
      '      <span class="pill-live" aria-hidden="true">LIVE PROJECT</span>',
      '      <span class="course-card-num" aria-hidden="true">' + course.num + '</span>',
      '    </div>',
      '  </div>',
      '  <h3 class="display course-card-title">' + course.title + '</h3>',
      '  <p class="course-card-pitch">' + course.pitch + '</p>',
      '  <div class="course-meta-grid">',
      '    <div class="c-meta-item">',
      '      <span class="c-meta-k">DURATION</span>',
      '      <span class="c-meta-v">' + course.duration + '</span>',
      '    </div>',
      '    <div class="c-meta-item">',
      '      <span class="c-meta-k">MODE</span>',
      '      <span class="c-meta-v">' + course.mode + '</span>',
      '    </div>',
      '    <div class="c-meta-item">',
      '      <span class="c-meta-k">PATH</span>',
      '      <span class="c-meta-v">White → Black belt</span>',
      '    </div>',
      '    <div class="c-meta-item">',
      '      <span class="c-meta-k">NEXT BATCH</span>',
      '      <span class="c-meta-v">' + course.nextBatch + '</span>',
      '    </div>',
      '  </div>',
      '  <div class="course-card-actions">',
      '    <a class="btn btn-gold btn-enrol-action" href="#enrol" data-course-id="' + course.id + '">Enrol</a>',
      '    <a class="btn btn-ghost btn-curr-action" href="#path" data-course-id="' + course.id + '">View curriculum ↓</a>',
      '  </div>',
      '</article>'
    ].join('\n');
  }

  /* ---------- Render Curriculum Panel (Section E) ---------- */
  function renderCurriculumPanel(course) {
    var whiteList = course.white.map(function (m, i) {
      var num = '0' + (i + 1);
      return '<li class="curr-module"><span class="mod-num">' + num + '</span><span class="mod-name">' + m + '</span></li>';
    }).join('');

    var goldList = course.gold.map(function (m, i) {
      var num = '0' + (i + 4);
      return '<li class="curr-module"><span class="mod-num">' + num + '</span><span class="mod-name">' + m + '</span></li>';
    }).join('');

    var blackList = course.black.map(function (m, i) {
      var num = '0' + (i + 7);
      return '<li class="curr-module"><span class="mod-num">' + num + '</span><span class="mod-name">' + m + '</span></li>';
    }).join('');

    return [
      '<div class="path-panel-inner" id="path-panel-inner">',
      '  <div class="curr-header-row">',
      '    <div class="curr-title-group">',
      '      <h3 class="display curr-title">' + course.title + '</h3>',
      '      <p class="curr-senseis">SENSEIS: ' + course.senseis + '</p>',
      '    </div>',
      '    <div class="curr-actions-group">',
      '      <div class="curr-meta-badges">',
      '        <span class="pill-meta">12 WEEKS</span>',
      '        <span class="pill-live">LIVE PROJECT</span>',
      '      </div>',
      '      <a class="btn btn-gold btn-enrol-action" href="#enrol" data-course-id="' + course.id + '">Enrol in this course</a>',
      '    </div>',
      '  </div>',
      '  <div class="curr-columns-wrap">',
      '    <div class="curr-belt-track" aria-hidden="true"></div>',
      '    <div class="curr-columns">',
      '      <!-- White Belt -->',
      '      <div class="curr-col">',
      '        <div class="belt-bar belt-white">',
      '          <span class="belt-bar-name">WHITE BELT</span>',
      '          <span class="belt-bar-knot"><span class="knot-box knot-white"></span><span class="knot-tails"></span></span>',
      '          <span class="belt-bar-weeks">WEEKS 1–4</span>',
      '        </div>',
      '        <div class="curr-col-subhead">Basics &amp; Fundamentals</div>',
      '        <ol class="curr-modules" start="1">',
      '          ' + whiteList,
      '        </ol>',
      '      </div>',
      '      <!-- Gold Belt -->',
      '      <div class="curr-col">',
      '        <div class="belt-bar belt-gold">',
      '          <span class="belt-bar-name">GOLD BELT</span>',
      '          <span class="belt-bar-knot"><span class="knot-box knot-gold"></span><span class="knot-tails"></span></span>',
      '          <span class="belt-bar-weeks">WEEKS 5–8</span>',
      '        </div>',
      '        <div class="curr-col-subhead">Build &amp; Architecture</div>',
      '        <ol class="curr-modules" start="4">',
      '          ' + goldList,
      '        </ol>',
      '      </div>',
      '      <!-- Black Belt -->',
      '      <div class="curr-col">',
      '        <div class="belt-bar belt-black">',
      '          <span class="belt-bar-name">BLACK BELT</span>',
      '          <span class="belt-bar-knot"><span class="knot-box knot-black"></span><span class="knot-tails"></span></span>',
      '          <span class="belt-bar-weeks">WEEKS 9–12</span>',
      '        </div>',
      '        <div class="curr-col-subhead">Mastery &amp; Portfolio</div>',
      '        <ol class="curr-modules" start="7">',
      '          ' + blackList,
      '        </ol>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div class="curr-live-project-strip">',
      '    <div class="lp-tag">',
      '      <span>LIVE PROJECT · WEEKS 9–12</span>',
      '      <i aria-hidden="true"></i>',
      '    </div>',
      '    <p class="lp-pitch">' + course.liveProject + '</p>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ---------- Main Dojo App Controller ---------- */
  function initDojoPage() {
    var coursesContainer = document.getElementById('courses-grid');
    var tabsContainer = document.getElementById('curr-tabs');
    var panelContainer = document.getElementById('curr-panel');
    var enrolChipsContainer = document.getElementById('course-chips');
    if (!coursesContainer && !tabsContainer) return;

    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Render 2x2 Courses Grid
    if (coursesContainer) {
      coursesContainer.innerHTML = COURSES.map(renderCourseCard).join('\n');
    }

    // 2. Render Enrol Form Course Chips
    if (enrolChipsContainer) {
      enrolChipsContainer.innerHTML = COURSES.map(function (c) {
        return '<button type="button" class="chip chip-toggle" data-course-id="' + c.id + '" aria-pressed="false">' + c.short + '</button>';
      }).join('\n');
    }

    // 3. Render Tabs
    var activeCourseId = COURSES[0].id;

    // Check deep link hash or query param:
    var initialHash = window.location.hash;
    if (initialHash && initialHash.indexOf('#path-') === 0) {
      var candidate = initialHash.replace('#path-', '');
      if (COURSES.some(function (c) { return c.id === candidate; })) {
        activeCourseId = candidate;
      }
    }

    // Render Tab Pills
    if (tabsContainer) {
      tabsContainer.innerHTML = COURSES.map(function (c) {
        var isAct = c.id === activeCourseId;
        return '<button type="button" role="tab" class="path-tab-pill' + (isAct ? ' is-active' : '') + '" data-course-id="' + c.id + '" aria-selected="' + (isAct ? 'true' : 'false') + '" id="tab-' + c.id + '" aria-controls="curr-panel">' + c.num + ' · ' + c.short + '</button>';
      }).join('\n');
    }

    // Switch Curriculum Tab
    function switchTab(courseId, updateHash) {
      var course = COURSES.find(function (c) { return c.id === courseId; });
      if (!course) return;

      activeCourseId = courseId;

      // Update Tab Buttons
      var tabs = tabsContainer ? tabsContainer.querySelectorAll('.path-tab-pill') : [];
      tabs.forEach(function (t) {
        var active = t.dataset.courseId === courseId;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        if (active && updateHash && tabsContainer) {
          var targetLeft = t.offsetLeft - (tabsContainer.clientWidth - t.clientWidth) / 2;
          if (typeof tabsContainer.scrollTo === 'function') {
            tabsContainer.scrollTo({ left: targetLeft, behavior: 'smooth' });
          } else {
            tabsContainer.scrollLeft = targetLeft;
          }
        }
      });

      // Update Panel Content & Slash Wipe Animation
      if (panelContainer) {
        panelContainer.setAttribute('aria-label', course.title + ' curriculum');

        if (!prefersReduced) {
          panelContainer.classList.add('is-slashing');
        }

        panelContainer.innerHTML = renderCurriculumPanel(course);

        // Stagger module list entrance
        if (!prefersReduced) {
          var modules = panelContainer.querySelectorAll('.curr-module');
          modules.forEach(function (m, idx) {
            m.style.animationDelay = (idx * 0.05 + 0.15).toFixed(2) + 's';
          });

          setTimeout(function () {
            panelContainer.classList.remove('is-slashing');
          }, 700);
        }
      }

      if (updateHash && history.replaceState) {
        history.replaceState(null, '', '#path-' + courseId);
      }
    }

    // Initial Panel Render
    switchTab(activeCourseId, false);

    // Tab Click Listeners
    if (tabsContainer) {
      tabsContainer.addEventListener('click', function (e) {
        var btn = e.target.closest('.path-tab-pill');
        if (btn && btn.dataset.courseId) {
          switchTab(btn.dataset.courseId, true);
        }
      });

      // Arrow Key Navigation (Left / Right)
      tabsContainer.addEventListener('keydown', function (e) {
        var tabs = Array.from(tabsContainer.querySelectorAll('.path-tab-pill'));
        var currentIndex = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
        if (currentIndex === -1) return;

        var nextIndex = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        }

        if (nextIndex !== -1) {
          e.preventDefault();
          tabs[nextIndex].focus();
          switchTab(tabs[nextIndex].dataset.courseId, true);
        }
      });
    }

    // "View curriculum ↓" button listeners on course cards
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn-curr-action');
      if (btn && btn.dataset.courseId) {
        switchTab(btn.dataset.courseId, true);
      }
    });

    // 4. Enrol Pre-Selection Logic & Form Handling
    function preselectCourse(courseId) {
      if (!courseId) return;
      var chips = document.querySelectorAll('#course-chips .chip-toggle');
      chips.forEach(function (chip) {
        if (chip.dataset.courseId === courseId) {
          chip.setAttribute('aria-pressed', 'true');
        }
      });
      syncCourseInput();
    }

    function syncCourseInput() {
      var picked = [];
      var chips = document.querySelectorAll('#course-chips .chip-toggle[aria-pressed="true"]');
      chips.forEach(function (c) {
        var course = COURSES.find(function (item) { return item.id === c.dataset.courseId; });
        if (course) picked.push(course.title);
      });
      var hidden = document.getElementById('f-enrol-courses');
      if (hidden) hidden.value = picked.join(', ');
      var subjectInp = document.getElementById('f-enrol-subject');
      if (subjectInp) {
        subjectInp.value = picked.length > 0 ? ('Dojo enrolment — ' + picked.join(', ')) : 'Dojo enrolment';
      }
      var err = document.getElementById('f-courses-err');
      if (err) {
        if (picked.length > 0) err.hidden = true;
      }
      return picked;
    }

    // Toggle Course Chips
    if (enrolChipsContainer) {
      enrolChipsContainer.addEventListener('click', function (e) {
        var chip = e.target.closest('.chip-toggle');
        if (chip) {
          var pressed = chip.getAttribute('aria-pressed') === 'true';
          chip.setAttribute('aria-pressed', pressed ? 'false' : 'true');
          syncCourseInput();
        }
      });
    }

    // Single-Select "I am a" Chips (Student · Working professional · Business owner)
    var profileChips = document.querySelectorAll('#profile-chips .chip-radio');
    profileChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        profileChips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', 'true');
        var hidden = document.getElementById('f-enrol-profile');
        if (hidden) hidden.value = chip.dataset.profile || chip.textContent.trim();
      });
    });

    // Enrol button click handler: scrolls to #enrol and preselects
    document.addEventListener('click', function (e) {
      var enrolBtn = e.target.closest('.btn-enrol-action');
      if (enrolBtn && enrolBtn.dataset.courseId) {
        preselectCourse(enrolBtn.dataset.courseId);
      }
    });

    // URL Query param ?course=<id> pre-selection
    try {
      var params = new URLSearchParams(window.location.search);
      var queryCourse = params.get('course');
      if (queryCourse) {
        preselectCourse(queryCourse);
        switchTab(queryCourse, false);
      }
    } catch (e) {}

    // Form Validation & Submission
    var enrolForm = document.getElementById('enrol-form');
    var enrolCard = document.getElementById('enrol-card');
    if (enrolForm && enrolCard) {
      var nameInp = document.getElementById('e-name');
      var phoneInp = document.getElementById('e-phone');
      var emailInp = document.getElementById('e-email');
      var coursesErr = document.getElementById('f-courses-err');
      var nameErr = document.getElementById('e-name-err');
      var phoneErr = document.getElementById('e-phone-err');
      var emailErr = document.getElementById('e-email-err');
      var note = document.getElementById('enrol-note');

      enrolForm.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var valid = true;
        var firstErrorEl = null;

        // Check Course selection (at least 1)
        var pickedCourses = syncCourseInput();
        if (pickedCourses.length === 0) {
          valid = false;
          if (coursesErr) coursesErr.hidden = false;
          if (!firstErrorEl) firstErrorEl = enrolChipsContainer;
        } else {
          if (coursesErr) coursesErr.hidden = true;
        }

        // Check Name
        if (!nameInp.value.trim()) {
          valid = false;
          if (nameErr) nameErr.hidden = false;
          nameInp.classList.add('is-invalid');
          if (!firstErrorEl) firstErrorEl = nameInp;
        } else {
          if (nameErr) nameErr.hidden = true;
          nameInp.classList.remove('is-invalid');
        }

        // Check WhatsApp Number
        var phoneClean = phoneInp.value.replace(/[\s\-\(\)\+]/g, '');
        if (!phoneClean || phoneClean.length < 8) {
          valid = false;
          if (phoneErr) phoneErr.hidden = false;
          phoneInp.classList.add('is-invalid');
          if (!firstErrorEl) firstErrorEl = phoneInp;
        } else {
          if (phoneErr) phoneErr.hidden = true;
          phoneInp.classList.remove('is-invalid');
        }

        // Check Email
        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInp.value.trim() || !emailRe.test(emailInp.value.trim())) {
          valid = false;
          if (emailErr) emailErr.hidden = false;
          emailInp.classList.add('is-invalid');
          if (!firstErrorEl) firstErrorEl = emailInp;
        } else {
          if (emailErr) emailErr.hidden = true;
          emailInp.classList.remove('is-invalid');
        }

        if (!valid) {
          if (firstErrorEl) {
            firstErrorEl.focus();
            if (typeof firstErrorEl.scrollIntoView === 'function') {
              firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
          return;
        }

        // Submission
        var endpoint = enrolForm.getAttribute('data-endpoint') || 'https://formsubmit.co/ajax/pixelintofficial@gmail.com';
        var submitBtn = enrolForm.querySelector('button[type="submit"]');
        var originalBtnText = submitBtn ? submitBtn.innerHTML : 'Save my seat →';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending…';
        }

        // Prepare JSON payload
        var formData = new FormData(enrolForm);
        var payload = {};
        formData.forEach(function (v, k) {
          payload[k] = v;
        });

        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then(function (res) {
            if (!res.ok) throw new Error('Submission failed');
            enrolCard.classList.add('is-success');
          })
          .catch(function () {
            if (note) {
              note.textContent = 'Something went wrong saving your seat. Please reach out to pixelintofficial@gmail.com or on WhatsApp.';
              note.style.color = '#e04545';
            }
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnText;
            }
          });
      });

      // Start Over button in success state
      var startOverBtn = document.getElementById('enrol-start-over');
      if (startOverBtn) {
        startOverBtn.addEventListener('click', function () {
          enrolForm.reset();
          document.querySelectorAll('#course-chips .chip-toggle').forEach(function (c) {
            c.setAttribute('aria-pressed', 'false');
          });
          document.querySelectorAll('#profile-chips .chip-radio').forEach(function (c, idx) {
            c.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
          });
          syncCourseInput();
          enrolCard.classList.remove('is-success');
          nameInp.focus();
        });
      }
    }

    // Notify reveal system about newly injected cards
    if (typeof window.PIXELINT_OBSERVE_TARGETS === 'function') {
      window.PIXELINT_OBSERVE_TARGETS();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDojoPage);
  } else {
    initDojoPage();
  }
})();
