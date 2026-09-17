(function () {
  "use strict";

  var cfg = window.STORE_CONFIG;
  if (!cfg) { console.error("config.js did not load — STORE_CONFIG is missing."); return; }

  var root = document.documentElement;

  // ---------------------------------------------------------------------
  // Theme: apply a color palette from config.colors as CSS custom properties
  // ---------------------------------------------------------------------
  function applyPalette(mode) {
    var palette = cfg.colors[mode] || cfg.colors.dark;
    root.style.setProperty('--bg', palette.bg);
    root.style.setProperty('--bg-raised', palette.bgRaised);
    root.style.setProperty('--bg-sunken', palette.bgSunken);
    root.style.setProperty('--text', palette.text);
    root.style.setProperty('--text-dim', palette.textDim);
    root.style.setProperty('--border', palette.border);
    root.style.setProperty('--ochre', palette.ochre);
    root.style.setProperty('--rust', palette.rust);
    root.style.setProperty('--leaf', palette.leaf);
    root.style.setProperty('--focus', palette.focus);
  }

  function currentMode() {
    try {
      var stored = localStorage.getItem('store-theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (e) { /* storage unavailable */ }
    // Light is the default boutique look; only start in dark mode if the visitor's
    // system explicitly prefers it.
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  var mode = currentMode();
  applyPalette(mode);
  root.style.setProperty('--font-display', cfg.fontDisplay);
  root.style.setProperty('--font-body', cfg.fontBody);

  // ---------------------------------------------------------------------
  // Static text / branding
  // ---------------------------------------------------------------------
  document.title = cfg.storeName + (cfg.storeNameAccent ? " " + cfg.storeNameAccent : "");

  // Favicon: a small generated mark (initial letter on a solid tile) instead of a
  // generic emoji — reads as a wordmark rather than a demo/placeholder icon.
  var faviconLink = document.getElementById('favicon-link');
  if (faviconLink) {
    var letter = (cfg.faviconLetter || cfg.storeName || "S").trim().charAt(0).toUpperCase();
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">' +
      '<rect width="64" height="64" rx="14" fill="#121212"/>' +
      '<text x="32" y="43" font-family="Georgia, \'Times New Roman\', serif" font-size="32" ' +
      'fill="#D4AF37" text-anchor="middle">' + letter + '</text></svg>';
    faviconLink.href = "data:image/svg+xml," + encodeURIComponent(svg);
  }

  document.getElementById('mount-banner').textContent = cfg.bannerText;

  var logoEl = document.getElementById('mount-logo');
  logoEl.innerHTML = cfg.storeName + " <span>" + cfg.storeNameAccent + "</span>";

  document.getElementById('mount-hero-headline').textContent = cfg.heroHeadline;
  document.getElementById('mount-hero-subtitle').textContent = cfg.heroSubtitle;
  document.getElementById('mount-hero-cta-primary').textContent = cfg.heroPrimaryCta;
  var secondaryCtaEl = document.getElementById('mount-hero-cta-secondary');
  if (cfg.heroSecondaryCta) {
    secondaryCtaEl.textContent = cfg.heroSecondaryCta;
  } else {
    secondaryCtaEl.style.display = 'none';
  }

  document.getElementById('mount-footer-brand').textContent = cfg.storeName + " " + cfg.storeNameAccent;
  document.getElementById('mount-copyright-name').textContent = cfg.storeName + " " + cfg.storeNameAccent;
  document.getElementById('mount-map-caption').textContent = cfg.mapCaption;
  document.getElementById('mount-map-frame').src =
    "https://www.google.com/maps?q=" + encodeURIComponent(cfg.address) + "&output=embed";

  // Hero swatch trio (cycles through product swatch numbers so it feels tied to the catalogue)
  var heroSwatchWrap = document.getElementById('mount-hero-swatches');
  [1, 2, 3].forEach(function (n) {
    var s = (cfg.products[n - 1] && cfg.products[n - 1].swatch) || n;
    var div = document.createElement('div');
    div.className = 'swatch swatch--' + s;
    heroSwatchWrap.appendChild(div);
  });

  // Trust strip
  var trustRow = document.getElementById('mount-trust-row');
  cfg.badges.forEach(function (text) {
    var item = document.createElement('div');
    item.className = 'trust-item';
    item.innerHTML = '<span class="dot"></span>' + text;
    trustRow.appendChild(item);
  });

  // Location info list
  var infoList = document.getElementById('mount-info-list');
  var infoItems = [
    { label: 'Address', value: cfg.address },
    { label: 'Phone / WhatsApp', value: cfg.phoneDisplay },
    { label: 'Hours', value: cfg.hours }
  ];
  infoItems.forEach(function (i) {
    var li = document.createElement('li');
    li.innerHTML = '<div><b>' + i.label + '</b>' + i.value + '</div>';
    infoList.appendChild(li);
  });

  // Badges (repeated in the location section)
  var badgeWrap = document.getElementById('mount-badges');
  cfg.badges.forEach(function (text) {
    var span = document.createElement('span');
    span.className = 'badge';
    span.textContent = text;
    badgeWrap.appendChild(span);
  });

  // Social links
  var socialWrap = document.getElementById('mount-social-links');
  function addSocial(label, url) {
    if (!url) return;
    var a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = label;
    socialWrap.appendChild(a);
  }
  addSocial('Instagram', cfg.socials.instagram);
  addSocial('Facebook', cfg.socials.facebook);
  addSocial('WhatsApp', 'https://wa.me/' + cfg.whatsappNumber);

  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------------------------------------------------------------------
  // Filter tabs
  // ---------------------------------------------------------------------
  var filterTabsWrap = document.getElementById('filter-tabs');
  var allTab = document.createElement('button');
  allTab.className = 'filter-tab active';
  allTab.textContent = 'All';
  allTab.setAttribute('data-filter', 'all');
  filterTabsWrap.appendChild(allTab);
  cfg.categories.forEach(function (c) {
    var btn = document.createElement('button');
    btn.className = 'filter-tab';
    btn.textContent = c.label;
    btn.setAttribute('data-filter', c.value);
    filterTabsWrap.appendChild(btn);
  });

  // ---------------------------------------------------------------------
  // Product grid
  // ---------------------------------------------------------------------
  var grid = document.getElementById('product-grid');
  var categoryLabelByValue = {};
  cfg.categories.forEach(function (c) { categoryLabelByValue[c.value] = c.label; });

  cfg.products.forEach(function (p) {
    var card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('data-category', p.category);

    var media = document.createElement('div');
    if (p.image) {
      media.className = 'swatch';
      var img = document.createElement('img');
      img.src = p.image; img.alt = p.name;
      media.appendChild(img);
    } else {
      media.className = 'swatch swatch--' + (p.swatch || 1);
    }
    if (p.inStock !== false) {
      var tag = document.createElement('span');
      tag.className = 'stock-tag';
      tag.textContent = 'In Stock';
      media.appendChild(tag);
    }
    card.appendChild(media);

    var body = document.createElement('div');
    body.className = 'product-body';
    body.innerHTML =
      '<span class="category-label">' + (categoryLabelByValue[p.category] || p.category) + '</span>' +
      '<h3></h3>' +
      '<div class="price-row"><span class="price"></span></div>';
    body.querySelector('h3').textContent = p.name;
    body.querySelector('.price').textContent = p.price;

    var waBtn = document.createElement('button');
    waBtn.className = 'btn btn-whatsapp';
    waBtn.textContent = 'Order on WhatsApp';
    waBtn.addEventListener('click', function () {
      var message = "Hello, I am interested in buying " + p.name + " priced at " + p.price + " from your website.";
      var url = "https://wa.me/" + cfg.whatsappNumber + "?text=" + encodeURIComponent(message);
      window.open(url, '_blank', 'noopener');
    });
    body.appendChild(waBtn);

    card.appendChild(body);
    grid.appendChild(card);
  });

  // Wire up filtering now that tabs and cards both exist
  var tabs = filterTabsWrap.querySelectorAll('.filter-tab');
  var cards = grid.querySelectorAll('.product-card');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var filter = tab.getAttribute('data-filter');
      cards.forEach(function (card) {
        card.hidden = !(filter === 'all' || card.getAttribute('data-category') === filter);
      });
    });
  });

  // ---------------------------------------------------------------------
  // Theme toggle button
  // ---------------------------------------------------------------------
  document.getElementById('theme-toggle').addEventListener('click', function () {
    mode = mode === 'light' ? 'dark' : 'light';
    applyPalette(mode);
    try { localStorage.setItem('store-theme', mode); } catch (e) { /* ignore */ }
  });

  // ---------------------------------------------------------------------
  // Mobile drawer
  // ---------------------------------------------------------------------
  var hamburger = document.getElementById('hamburger-btn');
  var drawer = document.getElementById('drawer');
  var overlay = document.getElementById('drawer-overlay');
  var drawerClose = document.getElementById('drawer-close');
  function openDrawer() { drawer.classList.add('open'); overlay.classList.add('open'); hamburger.setAttribute('aria-expanded', 'true'); }
  function closeDrawer() { drawer.classList.remove('open'); overlay.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
  hamburger.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeDrawer); });

})();
