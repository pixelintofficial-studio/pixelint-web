/* PIXELINT — site interactions */
(function () {
  'use strict';

  var root = document.documentElement;
  var header = document.getElementById('header');

  /* ---------- Mobile menu ---------- */
  if (header) {
    var menuBtn = header.querySelector('.menu-btn');
    if (menuBtn) {
      var setMenu = function (open) {
        header.classList.toggle('menu-open', open);
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      };
      menuBtn.addEventListener('click', function () {
        setMenu(!header.classList.contains('menu-open'));
      });
      header.querySelectorAll('.mobile-nav a').forEach(function (a) {
        a.addEventListener('click', function () { setMenu(false); });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && header.classList.contains('menu-open')) {
          setMenu(false);
          menuBtn.focus();
        }
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 980) setMenu(false);
      });
    }

    /* ---------- Pixel Thread: scroll progress ---------- */
    var ticking = false;
    var updateProgress = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      header.style.setProperty('--progress', p.toFixed(4));
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    }, { passive: true });
    updateProgress();

    /* ---------- Active nav link ---------- */
    var navLinks = {};
    header.querySelectorAll('.nav a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        navLinks[href.slice(1)] = a;
      }
    });
    if ('IntersectionObserver' in window) {
      var navIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var link = navLinks[en.target.id];
          if (link && en.isIntersecting) {
            Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove('is-active'); });
            link.classList.add('is-active');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(navLinks).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) navIO.observe(el);
      });
    }
  }

  /* ---------- Sticky pillar subnav (services.html) ---------- */
  var subnav = document.getElementById('subnav');
  if (subnav) {
    var subnavLinks = {};
    subnav.querySelectorAll('.subnav-link').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        subnavLinks[href.slice(1)] = a;
      }
    });

    // Visibility controller: show only after hero + band have fully scrolled out of view;
    // hide when scrolling back up into hero/band, or once #social-content has scrolled past.
    var band = document.querySelector('.band');
    var lastPillar = document.getElementById('social-content');
    var subnavTicking = false;

    var updateSubnavVisibility = function () {
      var headerH = header ? header.offsetHeight : 76;
      if (!band || !lastPillar) {
        subnavTicking = false;
        return;
      }
      var bandRect = band.getBoundingClientRect();
      var lastRect = lastPillar.getBoundingClientRect();
      var bandPast = bandRect.bottom <= headerH;
      var pillarActive = lastRect.bottom >= (headerH + 20);
      var shouldShow = bandPast && pillarActive;

      subnav.classList.toggle('is-visible', shouldShow);
      subnavTicking = false;
    };

    if ('IntersectionObserver' in window && band) {
      var bandObserver = new IntersectionObserver(function () {
        if (!subnavTicking) {
          subnavTicking = true;
          requestAnimationFrame(updateSubnavVisibility);
        }
      }, { threshold: 0 });
      bandObserver.observe(band);

      if (lastPillar) {
        var lastPillarObserver = new IntersectionObserver(function () {
          if (!subnavTicking) {
            subnavTicking = true;
            requestAnimationFrame(updateSubnavVisibility);
          }
        }, { threshold: 0 });
        lastPillarObserver.observe(lastPillar);
      }
    }

    window.addEventListener('scroll', function () {
      if (!subnavTicking) {
        subnavTicking = true;
        requestAnimationFrame(updateSubnavVisibility);
      }
    }, { passive: true });
    window.addEventListener('resize', updateSubnavVisibility);
    updateSubnavVisibility();

    // Active pillar highlighting & auto-scrolling sideways on mobile
    if ('IntersectionObserver' in window) {
      var subnavIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var link = subnavLinks[en.target.id];
          if (link && en.isIntersecting) {
            Object.keys(subnavLinks).forEach(function (k) {
              subnavLinks[k].classList.remove('is-active');
            });
            link.classList.add('is-active');
            // On mobile sideways scroll, gently bring the active pill into view
            if (typeof link.scrollIntoView === 'function') {
              var track = subnav.querySelector('.subnav-track');
              if (track && track.scrollWidth > track.clientWidth) {
                link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }
            }
          }
        });
      }, { rootMargin: '-20% 0px -60% 0px' });

      Object.keys(subnavLinks).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) subnavIO.observe(el);
      });
    }
  }

  /* ---------- Scroll reveals (robust system) ---------- */
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.transitionDelay = (i * 0.12) + 's';
    });
  });

  var targets = document.querySelectorAll('.reveal, .wipe, .draw, .peek, .hl-v');

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < vh && rect.bottom > 0;
  }

  function isElementAboveOrInViewport(el) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= vh;
  }

  if (root.classList.contains('motion') && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    window.PIXELINT_OBSERVE_TARGETS = function () {
      var currentTargets = document.querySelectorAll('.reveal, .wipe, .draw, .peek, .hl-v');
      document.querySelectorAll('[data-stagger]').forEach(function (group) {
        Array.prototype.forEach.call(group.children, function (child, i) {
          child.style.transitionDelay = (i * 0.12) + 's';
        });
      });
      currentTargets.forEach(function (el) {
        if (!el.classList.contains('is-in')) {
          if (isElementInViewport(el)) {
            el.classList.add('is-in');
          } else {
            io.observe(el);
          }
        }
      });
    };
    window.PIXELINT_OBSERVE_TARGETS();

    // Safety fallback: 2.5s after load, add .is-in to every element above current scroll position
    var runSafetyFallback = function () {
      setTimeout(function () {
        targets.forEach(function (el) {
          if (!el.classList.contains('is-in') && isElementAboveOrInViewport(el)) {
            el.classList.add('is-in');
            try { io.unobserve(el); } catch (e) {}
          }
        });
      }, 2500);
    };

    if (document.readyState === 'complete') {
      runSafetyFallback();
    } else {
      window.addEventListener('load', runSafetyFallback);
    }
  } else {
    // If motion is off or IntersectionObserver is missing, reveal everything at once
    targets.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Contact form ---------- */
  var card = document.getElementById('form-card');
  var form = document.getElementById('brief-form');
  if (form) {
    var servicesInput = document.getElementById('f-services');
    var emailInput = document.getElementById('f-email');
    var nameInput = document.getElementById('f-name');
    var emailErr = document.getElementById('f-email-err');
    var note = document.getElementById('form-note');
    var successText = document.getElementById('success-text');
    var chips = form.querySelectorAll('.chip');

    var syncServices = function () {
      var picked = [];
      chips.forEach(function (c) {
        if (c.getAttribute('aria-pressed') === 'true') {
          picked.push(c.dataset.value);
        }
      });
      if (servicesInput) servicesInput.value = picked.join(', ');
    };

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        syncServices();
      });
    });

    /* URL pre-select: ?service=<pillar-slug> */
    try {
      var params = new URLSearchParams(window.location.search);
      var serviceSlug = params.get('service');
      var slugMap = {
        'design': 'Design',
        'develop': 'Development',
        'market': 'Marketing & ads',
        'social-content': 'Social & content'
      };
      if (serviceSlug && slugMap[serviceSlug]) {
        var targetVal = slugMap[serviceSlug];
        chips.forEach(function (c) {
          if (c.dataset.value === targetVal) {
            c.setAttribute('aria-pressed', 'true');
          }
        });
        syncServices();
      }
    } catch (e) {}

    var validEmail = function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (note) note.textContent = '';
      var ok = true;

      if (!nameInput.value.trim()) {
        nameInput.setAttribute('aria-invalid', 'true');
        ok = false;
      } else {
        nameInput.removeAttribute('aria-invalid');
      }

      if (!validEmail(emailInput.value.trim())) {
        emailInput.setAttribute('aria-invalid', 'true');
        if (emailErr) emailErr.hidden = false;
        ok = false;
      } else {
        emailInput.removeAttribute('aria-invalid');
        if (emailErr) emailErr.hidden = true;
      }

      if (!ok) {
        if (note) note.textContent = 'Please add your name and a valid email.';
        (nameInput.getAttribute('aria-invalid') ? nameInput : emailInput).focus();
        return;
      }

      var endpoint = form.dataset.endpoint || 'https://formsubmit.co/ajax/pixelintofficial@gmail.com';
      var btn = form.querySelector('button[type="submit"]');
      var originalBtnHtml = btn ? btn.innerHTML : 'Send brief';
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }

      var formData = new FormData(form);
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
          if (!res.ok) throw new Error('Request failed');
          if (successText) {
            successText.textContent = 'Thanks — our team is studying your mission and will get back to you with next steps.';
          }
          if (card) card.classList.add('is-sent');
        })
        .catch(function () {
          if (note) {
            note.textContent = 'Something went wrong sending your brief. Please email us directly at pixelintofficial@gmail.com.';
            note.style.color = '#e04545';
          }
        })
        .finally(function () {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalBtnHtml;
          }
        });
    });

    var sendAnotherBtn = document.getElementById('send-another');
    if (sendAnotherBtn) {
      sendAnotherBtn.addEventListener('click', function () {
        form.reset();
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        syncServices();
        if (card) card.classList.remove('is-sent');
        nameInput.focus();
      });
    }
  }

  /* Smooth scroll to #contact for Start a project CTAs */
  document.querySelectorAll('a[href="#contact"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var contactSec = document.getElementById('contact');
      if (contactSec) {
        e.preventDefault();
        contactSec.scrollIntoView({ behavior: 'smooth' });
        if (history.pushState) {
          history.pushState(null, '', '#contact');
        }
      }
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     SHURIKEN SPARKS (HERO SPAWNER)
     ========================================================= */
  function initShurikenField() {
    var hero = document.querySelector('.hero');
    var field = hero ? hero.querySelector('.shuriken-field') : null;
    if (!hero || !field) return;

    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !root.classList.contains('motion')) {
      return; // Keep 4 static shuriken for reduced motion / non-motion
    }

    // Motion is enabled: clear the static fallbacks so dynamic spawner takes over
    var statics = field.querySelectorAll('.shuriken-static');
    statics.forEach(function (el) { el.remove(); });

    var isHeroVisible = true;
    var isDocVisible = !document.hidden;

    if ('IntersectionObserver' in window) {
      var heroIO = new IntersectionObserver(function (entries) {
        isHeroVisible = entries[0].isIntersecting;
      }, { threshold: 0.1 });
      heroIO.observe(hero);
    }

    document.addEventListener('visibilitychange', function () {
      isDocVisible = !document.hidden;
    });

    function getObstacleRects() {
      var heroRect = hero.getBoundingClientRect();
      var obstacles = hero.querySelectorAll('.badge, .h1, .hero-lead, .lead, .hero-btns, .hero-actions, .traits, .hero-facts, .belt-stack, .hero-jump-pills, .filter-bar, .clan-lineup');
      var rects = [];
      for (var i = 0; i < obstacles.length; i++) {
        var r = obstacles[i].getBoundingClientRect();
        rects.push({
          left: r.left - heroRect.left - 24,
          right: r.right - heroRect.left + 24,
          top: r.top - heroRect.top - 24,
          bottom: r.bottom - heroRect.top + 24
        });
      }
      return { heroRect: heroRect, rects: rects };
    }

    function spawnOne() {
      if (!isHeroVisible || !isDocVisible) {
        scheduleNext();
        return;
      }

      if (field.childElementCount >= 5) {
        scheduleNext();
        return;
      }

      var data = getObstacleRects();
      var heroRect = data.heroRect;
      var obstacleRects = data.rects;

      if (heroRect.width < 100 || heroRect.height < 100) {
        scheduleNext();
        return;
      }

      var cols = Math.floor(heroRect.width / 48);
      var rows = Math.floor(heroRect.height / 48);
      if (cols <= 2 || rows <= 2) {
        scheduleNext();
        return;
      }

      var finalX = -1, finalY = -1;
      for (var attempt = 0; attempt < 10; attempt++) {
        var c = Math.floor(Math.random() * (cols - 1)) + 1;
        var r = Math.floor(Math.random() * (rows - 1)) + 1;
        var cx = c * 48;
        var cy = r * 48;
        var hit = false;
        for (var j = 0; j < obstacleRects.length; j++) {
          var obs = obstacleRects[j];
          if (cx >= obs.left && cx <= obs.right && cy >= obs.top && cy <= obs.bottom) {
            hit = true;
            break;
          }
        }
        if (!hit) {
          finalX = cx;
          finalY = cy;
          break;
        }
      }

      if (finalX < 0 || finalY < 0) {
        scheduleNext();
        return;
      }

      var size = Math.round(14 + Math.random() * 10); // 14–24 px
      var isFaint = Math.random() < 0.4;
      var targetOpacity = isFaint ? 0.45 : 1;
      var holdTime = 1600 + Math.random() * 800; // 1.6–2.4 s

      var angle = Math.random() * Math.PI * 2;
      var dx = Math.cos(angle) * 60;
      var dy = Math.sin(angle) * 60;

      var spark = document.createElement('div');
      spark.className = 'shuriken-spark';
      spark.style.position = 'absolute';
      spark.style.left = finalX + 'px';
      spark.style.top = finalY + 'px';
      spark.style.width = size + 'px';
      spark.style.height = size + 'px';
      spark.style.color = 'var(--gold)';
      spark.style.pointerEvents = 'none';
      spark.innerHTML = '<svg class="shuriken" width="' + size + '" height="' + size + '"><use href="#shuriken"/></svg>';
      field.appendChild(spark);

      if (typeof spark.animate === 'function') {
        var flyAnim = spark.animate([
          {
            transform: 'translate(-50%, -50%) translate(' + dx.toFixed(1) + 'px, ' + dy.toFixed(1) + 'px) scale(0.4) rotate(0deg)',
            opacity: 0
          },
          {
            transform: 'translate(-50%, -50%) translate(0, 0) scale(1) rotate(720deg)',
            opacity: targetOpacity
          }
        ], {
          duration: 450,
          easing: 'cubic-bezier(0.2, 0.9, 0.2, 1)',
          fill: 'forwards'
        });

        flyAnim.onfinish = function () {
          if (!spark.isConnected) return;
          var wobbleAnim = spark.animate([
            { transform: 'translate(-50%, -50%) scale(1) rotate(720deg)' },
            { transform: 'translate(-50%, -50%) scale(1) rotate(728deg)' },
            { transform: 'translate(-50%, -50%) scale(1) rotate(712deg)' },
            { transform: 'translate(-50%, -50%) scale(1) rotate(724deg)' },
            { transform: 'translate(-50%, -50%) scale(1) rotate(720deg)' }
          ], {
            duration: 250,
            easing: 'ease-out',
            fill: 'forwards'
          });

          wobbleAnim.onfinish = function () {
            if (!spark.isConnected) return;
            var holdRot = (holdTime / 4000) * 360;
            var finalRot = 720 + holdRot;
            var holdAnim = spark.animate([
              { transform: 'translate(-50%, -50%) scale(1) rotate(720deg)' },
              { transform: 'translate(-50%, -50%) scale(1) rotate(' + finalRot.toFixed(1) + 'deg)' }
            ], {
              duration: holdTime,
              easing: 'linear',
              fill: 'forwards'
            });

            holdAnim.onfinish = function () {
              if (!spark.isConnected) return;
              var fadeAnim = spark.animate([
                {
                  transform: 'translate(-50%, -50%) scale(1) rotate(' + finalRot.toFixed(1) + 'deg)',
                  opacity: targetOpacity
                },
                {
                  transform: 'translate(-50%, -50%) scale(0.6) rotate(' + (finalRot + 36).toFixed(1) + 'deg)',
                  opacity: 0
                }
              ], {
                duration: 400,
                easing: 'ease-out',
                fill: 'forwards'
              });

              fadeAnim.onfinish = function () {
                spark.remove();
              };
            };
          };
        };
      } else {
        setTimeout(function () { spark.remove(); }, 3000);
      }

      scheduleNext();
    }

    function scheduleNext() {
      var delay = 900 + Math.random() * 700; // 900–1600 ms
      setTimeout(spawnOne, delay);
    }

    scheduleNext();
  }

  /* =========================================================
     SHURIKEN CURSOR
     ========================================================= */
  function initShurikenCursor() {
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return; // Touch / mobile devices keep native touch behaviour
    }

    root.classList.add('has-sk-cursor');

    var cursorEl = document.createElement('div');
    cursorEl.className = 'sk-cursor';
    cursorEl.setAttribute('aria-hidden', 'true');
    cursorEl.innerHTML = '<svg class="shuriken" width="28" height="28"><use href="#shuriken"/></svg>';
    document.body.appendChild(cursorEl);

    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var targetX = -100, targetY = -100;
    var curX = -100, curY = -100;
    var prevTargetX = -100, prevTargetY = -100;
    var isMouseInWindow = false;
    var isOverText = false;
    var isHoveringClickable = false;
    var burstStartTime = 0;
    var baseRotation = 0;
    var scaleHover = 1.0;
    var lastTime = performance.now();

    document.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isMouseInWindow) {
        isMouseInWindow = true;
        curX = targetX;
        curY = targetY;
        prevTargetX = targetX;
        prevTargetY = targetY;
      }

      var textEl = e.target.closest('input, textarea, select, [contenteditable]');
      isOverText = !!textEl;

      var clickEl = e.target.closest('a, button, .btn, [role="button"], [type="submit"], [type="button"], [data-cursor="hover"]');
      isHoveringClickable = !isOverText && !!clickEl;
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      isMouseInWindow = false;
      cursorEl.classList.remove('is-visible');
    });

    document.addEventListener('mouseenter', function (e) {
      isMouseInWindow = true;
      targetX = e.clientX;
      targetY = e.clientY;
      curX = targetX;
      curY = targetY;
      cursorEl.classList.add('is-visible');
    });

    document.addEventListener('mousedown', function () {
      if (isOverText) return;
      burstStartTime = performance.now();
    });

    function rafLoop(now) {
      var delta = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      if (isMouseInWindow && !isOverText) {
        cursorEl.classList.add('is-visible');
      } else {
        cursorEl.classList.remove('is-visible');
      }

      // Smooth position lerp (0.35)
      curX += (targetX - curX) * 0.35;
      curY += (targetY - curY) * 0.35;

      // Mouse speed calculation
      var vx = targetX - prevTargetX;
      var vy = targetY - prevTargetY;
      var speed = Math.hypot(vx, vy);
      prevTargetX = targetX;
      prevTargetY = targetY;

      var targetScale = isHoveringClickable ? 1.45 : 1.0;
      // 200ms ease for scaleHover
      scaleHover += (targetScale - scaleHover) * Math.min(1, delta * 8);

      var burstScaleMultiplier = 1.0;
      var extraBurstRot = 0;

      if (!prefersReduced) {
        // Spin: 1 turn / 3s base (120 deg/s), 3x faster on hover (360 deg/s) + velocity boost
        var baseSpeed = isHoveringClickable ? 360 : 120;
        var velocityBoost = speed * 0.35;
        baseRotation = (baseRotation + (baseSpeed * delta) + velocityBoost) % 36000;

        // Mousedown "throw" burst: scale 0.8 plus extra 360deg spin in 250ms
        if (burstStartTime > 0) {
          var elapsed = now - burstStartTime;
          if (elapsed < 250) {
            var p = elapsed / 250;
            extraBurstRot = p * 360;
            burstScaleMultiplier = 1.0 - 0.2 * Math.sin(p * Math.PI);
          } else {
            burstStartTime = 0;
          }
        }
      } else {
        baseRotation = 0;
      }

      var finalScale = scaleHover * burstScaleMultiplier;
      var totalRot = baseRotation + extraBurstRot;

      cursorEl.style.transform = 'translate3d(' + curX.toFixed(1) + 'px, ' + curY.toFixed(1) + 'px, 0) translate(-50%, -50%) scale(' + finalScale.toFixed(3) + ')' + (prefersReduced ? '' : ' rotate(' + totalRot.toFixed(1) + 'deg)');

      requestAnimationFrame(rafLoop);
    }

    requestAnimationFrame(rafLoop);
  }

  // Initialize Shuriken Field & Cursor
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initShurikenField();
      initShurikenCursor();
    });
  } else {
    initShurikenField();
    initShurikenCursor();
  }

  /* ---------- Odometer Roll Counters ---------- */
  function initCounters() {
    var counters = document.querySelectorAll('.count[data-count]');
    if (!counters.length) return;

    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var motionAllowed = root.classList.contains('motion') && !prefersReduced;

    if (!motionAllowed || !('IntersectionObserver' in window)) {
      counters.forEach(function (counter) {
        var target = parseInt(counter.getAttribute('data-count'), 10) || 0;
        var pad = parseInt(counter.getAttribute('data-pad'), 10) || 2;
        var str = String(target);
        while (str.length < pad) str = '0' + str;
        counter.textContent = str;
        counter.setAttribute('aria-label', String(target));
        var stat = counter.closest('.stat') || counter.parentElement;
        if (stat) stat.classList.add('is-counted');
      });
      return;
    }

    // Group counters by common parent to coordinate stagger delays
    var groups = [];
    counters.forEach(function (counter) {
      var stat = counter.closest('.stat') || counter.parentElement;
      var parent = (stat && stat.parentElement) || document.body;
      var group = groups.find(function (g) { return g.parent === parent; });
      if (!group) {
        group = { parent: parent, items: [] };
        groups.push(group);
      }
      group.items.push({ counter: counter, stat: stat });
    });

    groups.forEach(function (group) {
      var reelsToAnimate = [];

      group.items.forEach(function (item, i) {
        var counter = item.counter;
        var stat = item.stat;
        var target = parseInt(counter.getAttribute('data-count'), 10) || 0;
        var pad = parseInt(counter.getAttribute('data-pad'), 10) || 2;
        var str = String(target);
        while (str.length < pad) str = '0' + str;

        counter.setAttribute('aria-label', String(target));
        var delaySec = i * 0.15;
        if (stat) {
          stat.style.setProperty('--delay', delaySec.toFixed(2) + 's');
        }

        // Build digit columns
        var digitsHtml = '';
        var reelData = [];

        for (var dIdx = 0; dIdx < str.length; dIdx++) {
          var isLast = (dIdx === str.length - 1);
          var digitVal = parseInt(str.charAt(dIdx), 10);
          if (isNaN(digitVal)) digitVal = 0;

          var dur = isLast ? '1.8s' : '1.2s';
          var targetStep = isLast ? (10 + digitVal) : digitVal;
          var numSpans = isLast ? 20 : 10;

          var spans = '';
          for (var s = 0; s < numSpans; s++) {
            spans += '<span>' + (s % 10) + '</span>';
          }

          digitsHtml += '<span class="digit" aria-hidden="true">' +
            '<span class="digit-reel" style="--dur: ' + dur + '; --delay: var(--delay, 0s); transform: translateY(0em);">' +
            spans +
            '</span></span>';

          reelData.push({ targetStep: targetStep });
        }

        counter.innerHTML = digitsHtml;

        var renderedReels = counter.querySelectorAll('.digit-reel');
        renderedReels.forEach(function (reelEl, rIdx) {
          reelsToAnimate.push({
            reelEl: reelEl,
            step: reelData[rIdx].targetStep,
            stat: stat,
            delaySec: delaySec
          });
        });
      });

      var hasTriggered = false;

      function triggerRoll() {
        if (hasTriggered) return;
        hasTriggered = true;

        group.items.forEach(function (item, idx) {
          if (item.stat) {
            item.stat.classList.add('is-counted');
            item.stat.classList.add('is-rolling');
            var unmaskTimeout = Math.round((idx * 150) + 1900);
            setTimeout(function () {
              if (item.stat) item.stat.classList.remove('is-rolling');
            }, unmaskTimeout);
          }
        });

        // Trigger reel transforms
        requestAnimationFrame(function () {
          reelsToAnimate.forEach(function (r) {
            r.reelEl.style.transform = 'translateY(-' + r.step + 'em)';
          });
        });
      }

      function isContainerVisible(el) {
        var rect = el.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < vh * 0.85 && rect.bottom > 0;
      }

      var hashTarget = window.location.hash ? document.querySelector(window.location.hash) : null;
      var inHashTarget = hashTarget && (hashTarget === group.parent || hashTarget.contains(group.parent));

      if (inHashTarget || isContainerVisible(group.parent)) {
        triggerRoll();
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !hasTriggered) {
              triggerRoll();
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.35, rootMargin: '0px 0px -5% 0px' });

        io.observe(group.parent);
      }
    });
  }

  window.PIXELINT_INIT_COUNTERS = initCounters;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();
