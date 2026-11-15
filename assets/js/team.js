/* PIXELINT — Clan / Team Data & Interactions */
(function () {
  'use strict';

  var TEAM_MEMBERS = [
    {
      slug: 'srinidhi-gururajan',
      name: 'Srinidhi Gururajan',
      rank: 'Clan leader',
      title: 'Founder & CEO',
      roles: 'Frontend Developer · UX Designer',
      move: 'Turns a rough idea into a brand and a product people love to use.',
      skills: ['Leadership', 'Frontend', 'UX design'],
      initials: 'SG',
      isFounder: true,
      num: '01'
    },
    {
      slug: 'nithish-purushothaman',
      name: 'Nithish Purushothaman',
      rank: 'Clan co-leader',
      title: 'Co-founder',
      roles: 'UX Designer · Full-stack Developer',
      move: 'Designs the flow, then builds the whole stack behind it.',
      skills: ['UX design', 'Full-stack', 'Product'],
      initials: 'NP',
      isFounder: true,
      num: '02'
    },
    {
      slug: 'sadham',
      name: 'Sadham',
      rank: 'Design ninja',
      title: 'Design Lead',
      roles: '',
      move: 'Gives every brand a look you can spot from across the room.',
      skills: ['Brand identity', 'Visual design', 'UI'],
      initials: 'S',
      isFounder: false,
      num: '03'
    },
    {
      slug: 'thiru-pugal',
      name: 'Thiru Pugal',
      rank: 'Growth ninja',
      title: 'Marketing Lead',
      roles: '',
      move: 'Finds the right audience and gives them a reason to choose you.',
      skills: ['Marketing strategy', 'Social media', 'Campaigns'],
      initials: 'TP',
      isFounder: false,
      num: '04'
    },
    {
      slug: 'jaishrinaath-kamalakannan',
      name: 'Jaishrinaath Kamalakannan',
      rank: 'Signal ninja',
      title: 'Digital Marketing Lead',
      roles: '',
      move: 'Makes every ad budget work harder across Meta and Google.',
      skills: ['Paid ads', 'SEO', 'Analytics'],
      initials: 'JK',
      isFounder: false,
      num: '05'
    }
  ];

  window.PIXELINT_TEAM = TEAM_MEMBERS;

  function renderCard(member) {
    var skillsHtml = member.skills.map(function (s) {
      return '<li>' + s + '</li>';
    }).join('');

    var rolesHtml = member.roles ? '<span class="clan-roles">' + member.roles + '</span>' : '';
    var founderClass = member.isFounder ? ' clan-founder' : '';

    return [
      '<article class="clan-card wipe' + founderClass + '" id="' + member.slug + '" data-slug="' + member.slug + '">',
      '  <div class="clan-photo-frame">',
      '    <div class="clan-photo-placeholder" aria-hidden="true">',
      '      <span class="clan-initials">' + member.initials + '</span>',
      '      <span class="clan-photo-tag">PHOTO</span>',
      '    </div>',
      '    <img class="clan-photo" src="assets/img/team/' + member.slug + '.webp" alt="' + member.name + ', ' + member.title + ' at PIXELINT" width="800" height="1000" loading="lazy" onerror="this.remove()">',
      '    <div class="hood-panel hood-top" aria-hidden="true">',
      '      <span class="hood-num">NINJA ' + member.num + '</span>',
      '    </div>',
      '    <div class="hood-panel hood-bottom" aria-hidden="true">',
      '      <div class="hood-belt"><span class="hood-knot"></span></div>',
      '      <span class="hood-hint desktop-hint">HOVER TO UNMASK</span>',
      '      <span class="hood-hint touch-hint">TAP THE EYE TO UNMASK</span>',
      '    </div>',
      '    <button type="button" class="unmask-btn" aria-pressed="false" aria-label="Unmask ' + member.name + '">',
      '      <svg class="eye-open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
      '        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>',
      '        <circle cx="12" cy="12" r="3"/>',
      '      </svg>',
      '      <svg class="eye-closed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
      '        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>',
      '        <line x1="1" y1="1" x2="23" y2="23"/>',
      '      </svg>',
      '    </button>',
      '  </div>',
      '  <div class="clan-info">',
      '    <div class="clan-rank-row">',
      '      <span class="clan-rank">' + member.rank + '</span>',
      '    </div>',
      '    <h3 class="display clan-name">' + member.name + '</h3>',
      '    <div class="clan-title-wrap">',
      '      <span class="clan-title">' + member.title + '</span>',
      '      ' + rolesHtml,
      '    </div>',
      '    <div class="clan-move">',
      '      <span class="move-label">Signature move:</span>',
      '      <p>' + member.move + '</p>',
      '    </div>',
      '    <ul class="tags">' + skillsHtml + '</ul>',
      '  </div>',
      '</article>'
    ].join('\n');
  }

  function initTeamPage() {
    var foundersContainer = document.getElementById('team-founders');
    var leadsContainer = document.getElementById('team-leads');

    if (foundersContainer) {
      var founders = TEAM_MEMBERS.filter(function (m) { return m.isFounder; });
      foundersContainer.innerHTML = founders.map(renderCard).join('\n');
    }

    if (leadsContainer) {
      var leads = TEAM_MEMBERS.filter(function (m) { return !m.isFounder; });
      leadsContainer.innerHTML = leads.map(renderCard).join('\n');
    }

    // Attach unmask button toggles
    document.querySelectorAll('.clan-card').forEach(function (card) {
      var btn = card.querySelector('.unmask-btn');
      var memberSlug = card.getAttribute('data-slug');
      var member = TEAM_MEMBERS.find(function (m) { return m.slug === memberSlug; });
      var memberName = member ? member.name : 'Ninja';

      if (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          var isOpen = card.classList.toggle('is-open');
          btn.setAttribute('aria-pressed', isOpen ? 'true' : 'false');
          btn.setAttribute('aria-label', (isOpen ? 'Mask ' : 'Unmask ') + memberName);
        });
      }
    });

    // Notify reveal system about newly injected cards
    if (typeof window.PIXELINT_OBSERVE_TARGETS === 'function') {
      window.PIXELINT_OBSERVE_TARGETS();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeamPage);
  } else {
    initTeamPage();
  }
})();
