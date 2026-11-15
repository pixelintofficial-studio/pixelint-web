/* PIXELINT — Projects Data & Rendering */
(function () {
  'use strict';

  var PROJECTS = [
    {
      id: "01",
      slug: "viven-aviation",
      name: "Viven Aviation",
      url: "https://viven-delta.vercel.app",
      domain: "VIVENAVIATION.IN",
      category: "Corporate website",
      filter: "websites",
      location: "Indonesia",
      summary: "Corporate website for an Indonesia-based aircraft leasing company, presenting its fleet and leasing services with the polish the aviation industry expects.",
      services: ["Web Design", "Web Development", "UI/UX"],
      featured: true,
      linkText: "Visit site ↗",
      ariaLabel: "Visit Viven Aviation website (opens in new tab)",
      desktopImg: "assets/img/work/viven-aviation-desktop.webp",
      mobileImg: "assets/img/work/viven-aviation-mobile.webp",
      scrollable: true
    },
    {
      id: "02",
      slug: "sriyam-store",
      name: "Sriyam Store",
      url: "https://sriyam.store",
      domain: "SRIYAM.STORE",
      category: "E-commerce",
      filter: "ecommerce",
      location: "India",
      summary: "Online store for hand-finished devotional frames, heritage rack posters and books, with sizes, cart, order tracking and WhatsApp ordering, 'Bringing Divinity to Every Home.'",
      services: ["Web Design", "Web Development", "UI/UX"],
      featured: true,
      linkText: "Visit site ↗",
      ariaLabel: "Visit Sriyam Store website (opens in new tab)",
      desktopImg: "assets/img/work/sriyam-store-desktop.webp",
      mobileImg: "assets/img/work/sriyam-store-mobile.webp",
      scrollable: true
    },
    {
      id: "03",
      slug: "wrap-store-dpi",
      name: "Wrap Store DPI",
      url: "https://wrap-web-one.vercel.app",
      domain: "WRAPSTOREDPI.IN",
      category: "E-commerce",
      filter: "ecommerce",
      location: "India",
      summary: "Online store for iPhone and Samsung cases, screen protection and power accessories, with deals, wishlist, search and a smooth path to checkout.",
      services: ["Web Design", "E-commerce Setup"],
      featured: true,
      linkText: "Visit site ↗",
      ariaLabel: "Visit Wrap Store DPI website (opens in new tab)",
      desktopImg: "assets/img/work/wrap-store-dpi-desktop.webp",
      mobileImg: "assets/img/work/wrap-store-dpi-mobile.webp",
      scrollable: true
    },
    {
      id: "04",
      slug: "sriyam-shivam",
      name: "Sriyam Shivam",
      url: "https://sriyamshivam.in",
      domain: "SRIYAMSHIVAM.IN",
      category: "Company website",
      filter: "websites",
      location: "India",
      summary: "Temple pilgrimage platform for South India's sacred sites, with an interactive temple map, yatra planning and bilingual Tamil/English content.",
      services: ["Web Design", "Web Development", "UI/UX"],
      featured: true,
      linkText: "Visit site ↗",
      ariaLabel: "Visit Sriyam Shivam website (opens in new tab)",
      desktopImg: "assets/img/work/sriyam-shivam-desktop.webp",
      mobileImg: "assets/img/work/sriyam-shivam-mobile.webp",
      scrollable: true
    },
    {
      id: "05",
      slug: "templeint-labs",
      name: "TempleInt Labs",
      url: "https://templeint.in",
      domain: "TEMPLEINT.IN",
      category: "Landing page",
      filter: "websites",
      location: "India",
      summary: "Company landing page for a devotional-tech studio, introducing its travel and sacred-craft ventures in one clear story.",
      services: ["Web Design", "Web Development"],
      featured: false,
      linkText: "Visit site ↗",
      ariaLabel: "Visit TempleInt Labs website (opens in new tab)",
      desktopImg: "assets/img/work/templeint-labs-desktop.webp",
      mobileImg: "assets/img/work/templeint-labs-mobile.webp",
      scrollable: true
    },
    {
      id: "06",
      slug: "wrapstore-pos",
      name: "WrapStore POS",
      url: "https://wrapstore-schema.vercel.app",
      domain: "WRAPSTORE-SCHEMA.VERCEL.APP",
      category: "Web app · POS",
      filter: "webapps",
      location: "India",
      summary: "Store management system with an admin panel that runs the shop behind the storefront: billing, stock and day-to-day operations in one place.",
      services: ["UI/UX", "Web App Development"],
      featured: false,
      linkText: "Live demo ↗",
      ariaLabel: "View WrapStore POS live demo (opens in new tab)",
      desktopImg: "assets/img/work/wrapstore-pos-desktop.webp",
      mobileImg: "assets/img/work/wrapstore-pos-mobile.webp",
      scrollable: false
    }
  ];

  window.PIXELINT_PROJECTS = PROJECTS;

  function renderCard(proj, index, options) {
    options = options || {};
    var isFirst = index === 0;
    var phoneSide = options.phoneSide || (index % 2 === 0 ? 'phone-right' : 'phone-left');
    var isFeatured = proj.featured;
    var hasPhone = options.alwaysPhone || isFeatured;
    var scrollClass = proj.scrollable ? 'can-scroll' : '';

    var servicesHtml = proj.services.map(function (s) {
      return '<li>' + s + '</li>';
    }).join('');

    return (
      '<article class="work-card wipe ' + phoneSide + ' ' + (isFeatured ? 'is-featured' : '') + '" data-filter="' + proj.filter + '" data-slug="' + proj.slug + '">' +
        '<span class="work-card-num" aria-hidden="true">' + proj.id + '</span>' +
        '<div class="browser-frame">' +
          '<div class="browser-bar">' +
            '<div class="browser-dots" aria-hidden="true">' +
              '<span class="b-dot b-gold"></span>' +
              '<span class="b-dot b-w40"></span>' +
              '<span class="b-dot b-w20"></span>' +
            '</div>' +
            '<div class="browser-domain">' + proj.domain + '</div>' +
          '</div>' +
          '<div class="browser-screen ' + scrollClass + '">' +
            '<img src="' + proj.desktopImg + '" alt="' + proj.name + ' website homepage" width="1440" height="900" ' + (isFirst ? 'loading="eager"' : 'loading="lazy"') + ' decoding="async">' +
            '<a class="work-hover-bar" href="' + proj.url + '" target="_blank" rel="noopener noreferrer" aria-hidden="true" tabindex="-1">' +
              '<span>' + proj.linkText + '</span>' +
            '</a>' +
          '</div>' +
          (hasPhone ? (
            '<div class="phone-frame peek" aria-hidden="true">' +
              '<div class="phone-notch"></div>' +
              '<div class="phone-screen">' +
                '<img src="' + proj.mobileImg + '" alt="' + proj.name + ' mobile view" width="390" height="844" loading="lazy" decoding="async">' +
              '</div>' +
            '</div>'
          ) : '') +
        '</div>' +
        '<div class="work-info">' +
          '<div class="work-meta">' +
            '<span class="work-cat">' + proj.category + '</span>' +
            '<span class="work-loc">' + proj.location + '</span>' +
          '</div>' +
          '<h3 class="display work-title">' + proj.name + '</h3>' +
          '<p class="work-summary">' + proj.summary + '</p>' +
          '<ul class="tags">' + servicesHtml + '</ul>' +
          '<div class="work-action">' +
            '<a class="btn btn-gold work-link" href="' + proj.url + '" target="_blank" rel="noopener noreferrer" aria-label="' + proj.ariaLabel + '">' +
              proj.linkText +
            '</a>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function initWork() {
    // 1. Homepage Bento Grid (#work-bento)
    var bentoContainer = document.getElementById('work-bento');
    if (bentoContainer) {
      var featured = PROJECTS.filter(function (p) { return p.featured; });
      var bentoHtml = featured.map(function (p, idx) {
        return renderCard(p, idx, { phoneSide: 'phone-right' });
      }).join('');
      bentoContainer.innerHTML = bentoHtml;
    }

    // 2. Full Work Page (#work-grid)
    var workGrid = document.getElementById('work-grid');
    if (workGrid) {
      var allCardsHtml = PROJECTS.map(function (p, idx) {
        return renderCard(p, idx, {
          alwaysPhone: true,
          phoneSide: idx % 2 === 0 ? 'phone-right' : 'phone-left'
        });
      }).join('');
      workGrid.innerHTML = allCardsHtml;

      // Filter Bar Interaction
      var filterButtons = document.querySelectorAll('.filter-pill');
      var filterStatus = document.getElementById('filter-status');
      var cards = workGrid.querySelectorAll('.work-card');

      function applyFilter(filterName, updateHash) {
        var visibleCount = 0;
        filterButtons.forEach(function (btn) {
          var active = btn.dataset.filter === filterName;
          btn.classList.toggle('is-active', active);
          btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        cards.forEach(function (card) {
          var match = filterName === 'all' || card.dataset.filter === filterName;
          if (match) {
            visibleCount++;
            card.classList.remove('is-filtered-out');
            card.removeAttribute('aria-hidden');
            // Replay reveal animation
            card.classList.remove('is-in');
            setTimeout(function () { card.classList.add('is-in'); }, 20);
          } else {
            card.classList.add('is-filtered-out');
            card.setAttribute('aria-hidden', 'true');
          }
        });

        if (filterStatus) {
          filterStatus.textContent = 'Showing ' + visibleCount + ' projects';
        }

        if (updateHash && window.history && window.history.replaceState) {
          var newHash = filterName === 'all' ? '' : '#' + filterName;
          var url = window.location.pathname + window.location.search + newHash;
          window.history.replaceState(null, '', url);
        }
      }

      filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          applyFilter(btn.dataset.filter, true);
        });
      });

      // Read hash on load or on hashchange (e.g. #ecommerce, #websites, #webapps)
      function syncFromHash() {
        var h = (window.location.hash || '').replace('#', '').toLowerCase();
        var valid = ['all', 'ecommerce', 'websites', 'webapps'];
        if (h && valid.indexOf(h) !== -1) {
          applyFilter(h, false);
        } else if (!h) {
          applyFilter('all', false);
        }
      }

      syncFromHash();
      window.addEventListener('hashchange', syncFromHash);
    }

    if (window.PIXELINT_OBSERVE_TARGETS) {
      window.PIXELINT_OBSERVE_TARGETS();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWork);
  } else {
    initWork();
  }
})();
