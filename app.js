(function () {
  "use strict";

  var cfg = window.STORE_CONFIG;
  var boot = window.STORE_BOOT;
  if (!cfg) { console.error("config.js did not load — STORE_CONFIG is missing."); return; }

  var sec = cfg.sections || {};
  var currency = cfg.currencySymbol || "₦";
  var storeFullName = (cfg.storeName + (cfg.storeNameAccent ? " " + cfg.storeNameAccent : "")).trim();

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  // ---------------------------------------------------------------------
  // Photos: resolve a config value to a URL, and fall back gracefully
  // ---------------------------------------------------------------------
  function resolveImage(src) {
    if (!src || typeof src !== 'string') return '';
    src = src.trim();
    if (!src) return '';
    if (/^(https?:)?\/\/|^\/|^data:|^blob:/i.test(src)) return src;   // full URL / absolute path
    var folder = cfg.imageFolder == null ? 'images/' : cfg.imageFolder;
    if (folder && folder.slice(-1) !== '/') folder += '/';
    return folder + src.replace(/^\.?\//, '');
  }

  // Put a photo inside a .swatch element. If it's missing or fails to load, the swatch
  // pattern stays visible instead of a broken-image icon.
  function setSwatchPhoto(node, src, alt, fallbackSwatch, eager) {
    var url = resolveImage(src);
    node.className = node.className.replace(/\bswatch--\d\b/g, '').replace(/\bhas-photo\b/g, '').replace(/\s+/g, ' ').trim();
    node.classList.add('swatch', 'swatch--' + (fallbackSwatch || 1));
    if (!url) return false;
    var img = document.createElement('img');
    img.alt = alt || '';
    if (!eager) img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', function () {
      if (img.parentNode) img.parentNode.removeChild(img);
      node.classList.remove('has-photo');
    });
    img.addEventListener('load', function () { node.classList.add('has-photo'); });
    img.src = url;
    node.insertBefore(img, node.firstChild);
    return true;
  }

  // ---------------------------------------------------------------------
  // Static text / branding
  // ---------------------------------------------------------------------
  document.title = storeFullName;

  var faviconLink = $('favicon-link');
  if (faviconLink) {
    var letter = (cfg.faviconLetter || cfg.storeName || "S").trim().charAt(0).toUpperCase();
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">' +
      '<rect width="64" height="64" rx="14" fill="#121212"/>' +
      '<text x="32" y="43" font-family="Georgia, \'Times New Roman\', serif" font-size="32" ' +
      'fill="#D4AF37" text-anchor="middle">' + letter + '</text></svg>';
    faviconLink.href = "data:image/svg+xml," + encodeURIComponent(svg);
  }

  $('mount-banner').textContent = cfg.bannerText || '';
  if (!cfg.bannerText) $('mount-banner').style.display = 'none';

  var logoEl = $('mount-logo');
  logoEl.textContent = cfg.storeName + " ";
  if (cfg.storeNameAccent) logoEl.appendChild(el('span', null, cfg.storeNameAccent));
  var logoUrl = resolveImage(cfg.logoImage);
  var logoDarkUrl = resolveImage(cfg.logoImageDark);
  var logoImg = null;
  function syncLogo() {
    if (!logoImg) return;
    var dark = boot && boot.getMode && boot.getMode() === 'dark';
    logoImg.src = (dark && logoDarkUrl) ? logoDarkUrl : logoUrl;
  }
  if (logoUrl) {
    logoImg = document.createElement('img');
    logoImg.className = 'logo-img';
    logoImg.alt = storeFullName;
    logoImg.addEventListener('load', function () { if (logoImg.parentNode !== logoEl) { logoEl.textContent = ''; logoEl.appendChild(logoImg); } });
    syncLogo();                           // on error the text logo simply stays
  }

  // Nav + drawer labels
  [['nav-shop', 'drawer-shop', sec.navShop || 'Shop'],
   ['nav-about', 'drawer-about', sec.navAbout || 'About'],
   ['nav-contact', 'drawer-contact', sec.navContact || 'Contact']].forEach(function (r) {
    $(r[0]).textContent = r[2]; $(r[1]).textContent = r[2];
  });

  $('mount-hero-headline').textContent = cfg.heroHeadline;
  $('mount-hero-subtitle').textContent = cfg.heroSubtitle;
  $('mount-hero-cta-primary').textContent = cfg.heroPrimaryCta;
  var secondaryCtaEl = $('mount-hero-cta-secondary');
  if (cfg.heroSecondaryCta) secondaryCtaEl.textContent = cfg.heroSecondaryCta;
  else secondaryCtaEl.style.display = 'none';

  $('mount-footer-brand').textContent = storeFullName;
  $('mount-copyright-name').textContent = storeFullName;
  $('mount-map-caption').textContent = cfg.mapCaption || '';
  if (cfg.address) {
    $('mount-map-frame').src = "https://www.google.com/maps?q=" + encodeURIComponent(cfg.address) + "&output=embed";
  } else {
    var mapBlock = document.querySelector('.map-block');
    if (mapBlock) mapBlock.hidden = true;   // online-only store: no map
  }
  // How-to-order steps (optional)
  (function () {
    var steps = cfg.orderSteps || [];
    if (!steps.length) return;
    $('how-to-order').hidden = false;
    $('mount-steps-title').textContent = cfg.orderStepsTitle || 'How to order';
    $('mount-steps-sub').textContent = cfg.orderStepsSubtitle || '';
    steps.forEach(function (s, i) {
      var li = el('li', 'step');
      li.appendChild(el('span', 'step-num', String(i + 1)));
      li.appendChild(el('h3', null, s.title));
      if (s.text) li.appendChild(el('p', null, s.text));
      $('mount-steps').appendChild(li);
    });
  })();
  $('mount-catalog-title').textContent = sec.catalogTitle || 'Shop';
  $('mount-catalog-subtitle').textContent = sec.catalogSubtitle || '';
  $('mount-location-title').textContent = sec.locationTitle || 'Find us';
  $('year').textContent = new Date().getFullYear();

  // About section
  (function () {
    var paras = Array.isArray(cfg.aboutText) ? cfg.aboutText : (cfg.aboutText ? [cfg.aboutText] : []);
    paras = paras.filter(Boolean);
    if (!paras.length) {
      $('nav-about').style.display = 'none';
      $('drawer-about').style.display = 'none';
      return;
    }
    $('about').hidden = false;
    $('mount-about-title').textContent = cfg.aboutTitle || 'About us';
    paras.forEach(function (t) { $('mount-about-text').appendChild(el('p', null, t)); });
    if (cfg.aboutImage) {
      var ph = $('mount-about-photo');
      ph.hidden = false;
      setSwatchPhoto(ph, cfg.aboutImage, storeFullName, 2);
      // if the photo can't load, hide the block rather than show a pattern
      var probe = new Image();
      probe.onerror = function () { ph.hidden = true; };
      probe.src = resolveImage(cfg.aboutImage);
    }
  })();

  // Trust strip + badges
  (cfg.badges || []).forEach(function (text) {
    var item = el('div', 'trust-item');
    item.appendChild(el('span', 'dot'));
    item.appendChild(document.createTextNode(text));
    $('mount-trust-row').appendChild(item);
    $('mount-badges').appendChild(el('span', 'badge', text));
  });

  // Contact info (address → map, phone → tap to call)
  function telHref(display) {
    var cc = String(cfg.countryCode || '234');
    var d = String(display || '').replace(/[^\d+]/g, '');
    if (!d) return '';
    if (d.charAt(0) === '+') return 'tel:' + d;
    d = d.replace(/^0+/, '');
    return 'tel:+' + (d.indexOf(cc) === 0 ? d : cc + d);
  }
  var mapsHref = cfg.mapsUrl || (cfg.address ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(cfg.address) : '');
  var callHref = telHref(cfg.phoneDisplay) || ('tel:+' + cfg.whatsappNumber);

  [{ label: 'Address', value: cfg.address, href: mapsHref },
   { label: 'Phone / WhatsApp', value: cfg.phoneDisplay, href: callHref },
   { label: 'Hours', value: cfg.hours }].forEach(function (i) {
    if (!i.value) return;
    var li = el('li');
    var box = el('div');
    box.appendChild(el('b', null, i.label));
    if (i.href) {
      var a = el('a', 'info-link', i.value);
      a.href = i.href;
      if (i.href.indexOf('http') === 0) { a.target = '_blank'; a.rel = 'noopener'; }
      box.appendChild(a);
    } else {
      box.appendChild(document.createTextNode(i.value));
    }
    li.appendChild(box);
    $('mount-info-list').appendChild(li);
  });
  (function () {
    var wrap = $('mount-location-actions');
    if (mapsHref) {
      var dir = el('a', 'btn btn-outline', 'Get directions');
      dir.href = mapsHref; dir.target = '_blank'; dir.rel = 'noopener';
      wrap.appendChild(dir);
    }
    var call = el('a', 'btn btn-outline', 'Call us');
    call.href = callHref;
    wrap.appendChild(call);
    if (cfg.whatsappNumber) {
      var wa = el('a', 'btn btn-primary', 'Chat on WhatsApp');
      wa.href = 'https://wa.me/' + cfg.whatsappNumber + '?text=' + encodeURIComponent(cfg.floatingMessage || 'Hello!');
      wa.target = '_blank'; wa.rel = 'noopener';
      wrap.insertBefore(wa, wrap.firstChild);
    }
  })();

  // Social links
  function addSocial(label, url) {
    if (!url) return;
    var a = el('a', null, label);
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    $('mount-social-links').appendChild(a);
  }
  addSocial('Instagram', cfg.socials && cfg.socials.instagram);
  addSocial('Facebook', cfg.socials && cfg.socials.facebook);
  addSocial('TikTok', cfg.socials && cfg.socials.tiktok);
  addSocial('YouTube', cfg.socials && cfg.socials.youtube);
  addSocial('WhatsApp', 'https://wa.me/' + cfg.whatsappNumber);

  // Floating chat button
  if (cfg.floatingButton !== false) {
    var fab = $('fab');
    fab.hidden = false;
    fab.href = 'https://wa.me/' + cfg.whatsappNumber + '?text=' + encodeURIComponent(cfg.floatingMessage || 'Hello!');
    $('fab-label').textContent = cfg.floatingButtonLabel || 'Chat';
    fab.setAttribute('aria-label', (cfg.floatingButtonLabel || 'Chat') + ' on WhatsApp');
  }

  // ---------------------------------------------------------------------
  // WhatsApp messages
  // ---------------------------------------------------------------------
  function waUrl(message) {
    return "https://wa.me/" + cfg.whatsappNumber + "?text=" + encodeURIComponent(message);
  }
  function openWa(message) { window.open(waUrl(message), '_blank', 'noopener'); }

  function orderMessage(p, size, color) {
    var parts = [];
    if (size) parts.push('Size: ' + size);
    if (color) parts.push('Colour: ' + color);
    var options = parts.length ? ' (' + parts.join(', ') + ')' : '';
    var tpl = cfg.orderMessage || "Hello, I am interested in buying {product}{options} priced at {price} from your website.";
    return tpl.replace('{product}', p.name).replace('{options}', options).replace('{price}', p.price);
  }
  function restockMessage(p) {
    return (cfg.restockMessage || "Hello, is {product} coming back in stock?").replace('{product}', p.name);
  }

  // ---------------------------------------------------------------------
  // Products: normalise config rows and Google Sheet rows into one shape
  // ---------------------------------------------------------------------
  function toList(v) {
    if (Array.isArray(v)) return v.map(function (s) { return String(s).trim(); }).filter(Boolean);
    if (typeof v === 'string') return v.split(/[,;|]/).map(function (s) { return s.trim(); }).filter(Boolean);
    return [];
  }
  function slug(s) { return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  function normalize(p, categories) {
    var cat = p.category || '';
    if (cat) {
      var hit = categories.filter(function (c) {
        return c.value === cat || c.label.toLowerCase() === String(cat).toLowerCase() || c.value === slug(cat);
      })[0];
      if (hit) cat = hit.value;
      else { categories.push({ value: slug(cat) || cat, label: cat }); cat = slug(cat) || cat; }
    }
    var photos = [];
    [p.image].concat(toList(p.images)).forEach(function (x) { if (x && photos.indexOf(x) < 0) photos.push(x); });
    return {
      name: String(p.name || '').trim(),
      price: String(p.price || '').trim(),
      category: cat,
      photos: photos,
      description: p.description ? String(p.description).trim() : '',
      sizes: toList(p.sizes),
      colors: toList(p.colors),
      badge: p.badge ? String(p.badge).trim() : '',
      swatch: p.swatch || 1,
      inStock: p.inStock !== false
    };
  }

  function buildModel(rawProducts) {
    var categories = (cfg.categories || []).map(function (c) { return { value: c.value, label: c.label }; });
    var products = rawProducts.map(function (p) { return normalize(p, categories); })
      .filter(function (p) { return p.name; });
    return { products: products, categories: categories };
  }

  // ---------------------------------------------------------------------
  // Hero photos: cfg.heroImages first, then the first products' photos, then swatch patterns
  // ---------------------------------------------------------------------
  function buildHero(products) {
    var wrap = $('mount-hero-swatches');
    wrap.textContent = '';
    [1, 2, 3].forEach(function (n) {
      var product = products[n - 1] || {};
      var photo = (cfg.heroImages && cfg.heroImages[n - 1]) || (product.photos && product.photos[0]) || '';
      var div = el('div');
      setSwatchPhoto(div, photo, product.name || storeFullName, product.swatch || n, true);
      wrap.appendChild(div);
    });
  }

  // ---------------------------------------------------------------------
  // Catalog (filter tabs + cards)
  // ---------------------------------------------------------------------
  var grid = $('product-grid');
  var filterWrap = $('filter-tabs');
  var statusEl = $('catalog-status');
  var current = { products: [], categories: [] };

  function setStatus(msg) {
    statusEl.textContent = msg || '';
    statusEl.hidden = !msg;
  }

  function needsOptions(p) { return p.inStock && (p.sizes.length || p.colors.length); }

  function renderCatalog(model) {
    current = model;
    grid.textContent = '';
    filterWrap.textContent = '';
    filterWrap.setAttribute('role', 'group');
    filterWrap.setAttribute('aria-label', 'Filter products');
    buildHero(model.products);

    if (!model.products.length) { setStatus(sec.emptyMessage || ''); filterWrap.hidden = true; return; }
    setStatus('');

    var labelByValue = {};
    model.categories.forEach(function (c) { labelByValue[c.value] = c.label; });

    // Only show tabs for categories that actually have products
    var used = model.categories.filter(function (c) {
      return model.products.some(function (p) { return p.category === c.value; });
    });
    filterWrap.hidden = used.length < 2;
    if (used.length >= 2) {
      var tabs = [{ value: 'all', label: sec.allLabel || 'All' }].concat(used);
      tabs.forEach(function (t, i) {
        var b = el('button', 'filter-tab' + (i === 0 ? ' active' : ''), t.label);
        b.type = 'button';
        b.setAttribute('data-filter', t.value);
        b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
        filterWrap.appendChild(b);
      });
    }

    model.products.forEach(function (p) {
      var card = el('article', 'product-card');
      card.setAttribute('data-category', p.category);
      if (!p.inStock) card.classList.add('sold-out');

      var media = el('button', 'card-media');
      media.type = 'button';
      media.setAttribute('aria-label', 'View details for ' + p.name);
      setSwatchPhoto(media, p.photos[0], p.name, p.swatch);
      if (!p.inStock) media.appendChild(el('span', 'tag tag-out', 'Sold out'));
      else if (p.badge) media.appendChild(el('span', 'tag', p.badge));
      else if (cfg.showInStockTag) media.appendChild(el('span', 'tag tag-stock', 'In Stock'));
      media.addEventListener('click', function () { openModal(p, media); });
      card.appendChild(media);

      var body = el('div', 'product-body');
      if (labelByValue[p.category]) body.appendChild(el('span', 'category-label', labelByValue[p.category]));
      var h3 = el('h3');
      var nameBtn = el('button', 'name-link', p.name);
      nameBtn.type = 'button';
      nameBtn.addEventListener('click', function () { openModal(p, nameBtn); });
      h3.appendChild(nameBtn);
      body.appendChild(h3);
      var pr = el('div', 'price-row');
      pr.appendChild(el('span', 'price', p.price));
      body.appendChild(pr);

      var cta = el('button', 'btn btn-whatsapp');
      cta.type = 'button';
      if (!p.inStock) {
        cta.className = 'btn btn-outline btn-block';
        cta.textContent = 'Ask about restock';
        cta.addEventListener('click', function () { openWa(restockMessage(p)); });
      } else if (needsOptions(p)) {
        cta.textContent = p.sizes.length ? 'Choose size' : 'Choose options';
        cta.addEventListener('click', function () { openModal(p, cta); });
      } else {
        cta.textContent = 'Order on WhatsApp';
        cta.addEventListener('click', function () { openWa(orderMessage(p)); });
      }
      body.appendChild(cta);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  filterWrap.addEventListener('click', function (e) {
    var tab = e.target.closest ? e.target.closest('.filter-tab') : null;
    if (!tab) return;
    var f = tab.getAttribute('data-filter');
    filterWrap.querySelectorAll('.filter-tab').forEach(function (t) {
      var on = t === tab;
      t.classList.toggle('active', on);
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    grid.querySelectorAll('.product-card').forEach(function (card) {
      card.hidden = !(f === 'all' || card.getAttribute('data-category') === f);
    });
  });

  // ---------------------------------------------------------------------
  // Product detail modal (swipe gallery, size/colour choice, order)
  // ---------------------------------------------------------------------
  var modal = $('product-modal');
  var gallery = $('pm-gallery');
  var dots = $('pm-dots');
  var pmOrder = $('pm-order');
  var pmError = $('pm-error');
  var modalState = { product: null, size: '', color: '', opener: null, slides: 0 };

  function fillChips(wrapId, groupId, values, key) {
    var wrap = $(wrapId), group = $(groupId);
    wrap.textContent = '';
    group.hidden = !values.length;
    values.forEach(function (v) {
      var b = el('button', 'chip', v);
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', 'false');
      b.addEventListener('click', function () {
        var already = modalState[key] === v;
        modalState[key] = already ? '' : v;
        wrap.querySelectorAll('.chip').forEach(function (c) {
          var on = c === b && !already;
          c.setAttribute('aria-checked', on ? 'true' : 'false');
          c.classList.toggle('selected', on);
        });
        pmError.hidden = true;
      });
      wrap.appendChild(b);
    });
  }

  function galleryIndex() {
    var w = gallery.clientWidth || 1;
    return Math.max(0, Math.min(modalState.slides - 1, Math.round(gallery.scrollLeft / w)));
  }
  function syncDots() {
    var i = galleryIndex();
    dots.querySelectorAll('.dot-btn').forEach(function (d, n) { d.classList.toggle('on', n === i); });
    $('pm-prev').hidden = modalState.slides < 2 || i === 0;
    $('pm-next').hidden = modalState.slides < 2 || i === modalState.slides - 1;
  }
  function goSlide(i) {
    i = Math.max(0, Math.min(modalState.slides - 1, i));
    if (gallery.scrollTo) gallery.scrollTo({ left: i * gallery.clientWidth, behavior: 'smooth' });
    else gallery.scrollLeft = i * gallery.clientWidth;
  }
  gallery.addEventListener('scroll', function () { window.requestAnimationFrame(syncDots); });
  $('pm-prev').addEventListener('click', function () { goSlide(galleryIndex() - 1); });
  $('pm-next').addEventListener('click', function () { goSlide(galleryIndex() + 1); });

  function openModal(p, opener) {
    modalState.product = p; modalState.size = ''; modalState.color = ''; modalState.opener = opener || null;
    var catLabel = '';
    current.categories.forEach(function (c) { if (c.value === p.category) catLabel = c.label; });
    $('pm-category').textContent = catLabel;
    $('pm-category').hidden = !catLabel;
    $('pm-title').textContent = p.name;
    $('pm-price').textContent = p.price;
    $('pm-desc').textContent = p.description;
    $('pm-desc').hidden = !p.description;
    pmError.hidden = true;

    gallery.textContent = ''; dots.textContent = '';
    var photos = p.photos.length ? p.photos : [''];
    modalState.slides = photos.length;
    photos.forEach(function (src, i) {
      var slide = el('div', 'pm-slide');
      setSwatchPhoto(slide, src, p.name + (photos.length > 1 ? ' — photo ' + (i + 1) : ''), p.swatch, true);
      gallery.appendChild(slide);
      if (photos.length > 1) {
        var d = el('button', 'dot-btn');
        d.type = 'button';
        d.setAttribute('aria-label', 'Show photo ' + (i + 1));
        d.addEventListener('click', function () { goSlide(i); });
        dots.appendChild(d);
      }
    });
    gallery.scrollLeft = 0;

    fillChips('pm-sizes', 'pm-sizes-group', p.inStock ? p.sizes : [], 'size');
    fillChips('pm-colors', 'pm-colors-group', p.inStock ? p.colors : [], 'color');
    pmOrder.textContent = p.inStock ? 'Order on WhatsApp' : 'Ask about restock';
    pmOrder.className = 'btn btn-whatsapp pm-order' + (p.inStock ? '' : ' is-outline');

    modal.hidden = false;
    document.body.classList.add('modal-open');
    syncDots();
    $('pm-close').focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (modalState.opener && modalState.opener.focus) modalState.opener.focus();
  }

  $('pm-close').addEventListener('click', closeModal);
  $('pm-backdrop').addEventListener('click', closeModal);

  pmOrder.addEventListener('click', function () {
    var p = modalState.product;
    if (!p) return;
    if (!p.inStock) { openWa(restockMessage(p)); return; }
    if (p.sizes.length && !modalState.size) { needChoice('size', 'pm-sizes'); return; }
    if (p.colors.length && !modalState.color) { needChoice('colour', 'pm-colors'); return; }
    openWa(orderMessage(p, modalState.size, modalState.color));
  });
  function needChoice(word, wrapId) {
    pmError.textContent = 'Please choose a ' + word + ' first.';
    pmError.hidden = false;
    var first = $(wrapId).querySelector('.chip');
    if (first) first.focus();
  }

  // Keyboard: Esc closes, Tab stays inside the open dialog
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeModal(); closeDrawer(); return; }
    if (e.key !== 'Tab' || modal.hidden) return;
    var f = modal.querySelectorAll('button:not([hidden]), a[href]');
    f = Array.prototype.filter.call(f, function (n) { return n.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // ---------------------------------------------------------------------
  // Products source: config.js list, or an optional published Google Sheet
  // ---------------------------------------------------------------------
  function parseCSV(text) {
    text = text.replace(/^﻿/, '');
    var rows = [], row = [], field = '', inQ = false, i, c;
    for (i = 0; i < text.length; i++) {
      c = text.charAt(i);
      if (inQ) {
        if (c === '"') { if (text.charAt(i + 1) === '"') { field += '"'; i++; } else inQ = false; }
        else field += c;
      } else if (c === '"') inQ = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text.charAt(i + 1) === '\n') i++;
        row.push(field); field = '';
        if (row.length > 1 || row[0] !== '') rows.push(row);
        row = [];
      } else field += c;
    }
    row.push(field);
    if (row.length > 1 || row[0] !== '') rows.push(row);
    return rows;
  }

  function sheetRowsToProducts(rows) {
    if (rows.length < 2) return [];
    var head = rows[0].map(function (h) { return h.trim().toLowerCase().replace(/[^a-z]/g, ''); });
    function col(row, name) { var i = head.indexOf(name); return i < 0 ? '' : (row[i] || '').trim(); }
    var out = [];
    rows.slice(1).forEach(function (r) {
      var name = col(r, 'name');
      if (!name) return;
      var price = col(r, 'price');
      if (/^[\d][\d,.]*$/.test(price)) price = currency + Number(price.replace(/,/g, '')).toLocaleString('en-NG');
      var stock = col(r, 'instock') || col(r, 'stock');
      out.push({
        name: name, price: price, category: col(r, 'category'),
        image: col(r, 'image'), images: col(r, 'images'),
        description: col(r, 'description'),
        sizes: col(r, 'sizes'), colors: col(r, 'colors') || col(r, 'colours'),
        badge: col(r, 'badge'),
        inStock: !/^(no|n|false|0|sold|soldout|sold out|out)/i.test(stock)
      });
    });
    return out;
  }

  var CACHE_KEY = 'store-sheet-cache-v1';
  function readCache(url) {
    try {
      var c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (c && c.url === url && Array.isArray(c.products) && c.products.length) return c.products;
    } catch (e) { /* ignore */ }
    return null;
  }
  function writeCache(url, products) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ url: url, products: products })); } catch (e) { /* ignore */ }
  }

  function fetchSheet(url) {
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 8000);
    return fetch(url, ctl ? { signal: ctl.signal, cache: 'no-cache' } : { cache: 'no-cache' })
      .then(function (r) { clearTimeout(timer); if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (t) { return sheetRowsToProducts(parseCSV(t)); });
  }

  var sheetUrl = (cfg.productsSheetUrl || '').trim();
  if (!sheetUrl || !window.fetch) {
    renderCatalog(buildModel(cfg.products || []));
  } else {
    var cached = readCache(sheetUrl);
    if (cached) renderCatalog(buildModel(cached));
    else { setStatus('Loading products…'); }
    fetchSheet(sheetUrl).then(function (list) {
      if (!list.length) throw new Error('Sheet has no products');
      var changed = JSON.stringify(list) !== JSON.stringify(cached);
      writeCache(sheetUrl, list);
      if (changed) renderCatalog(buildModel(list));
    }).catch(function (err) {
      console.warn('Could not load products from the Google Sheet — using the last saved list.', err);
      if (!cached) renderCatalog(buildModel(cfg.products || []));
    });
  }

  // ---------------------------------------------------------------------
  // Theme toggle + mobile drawer
  // ---------------------------------------------------------------------
  $('theme-toggle').addEventListener('click', function () { if (boot) { boot.toggleMode(); syncLogo(); } });

  var hamburger = $('hamburger-btn');
  var drawer = $('drawer');
  var overlay = $('drawer-overlay');
  function openDrawer() {
    drawer.classList.add('open'); overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false'); hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('modal-open');
    $('drawer-close').focus();
  }
  function closeDrawer() {
    if (!drawer.classList.contains('open')) return;
    drawer.classList.remove('open'); overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true'); hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('modal-open');
    hamburger.focus();
  }
  hamburger.addEventListener('click', openDrawer);
  $('drawer-close').addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      drawer.classList.remove('open'); overlay.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true'); hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('modal-open');
    });
  });

  // ---------------------------------------------------------------------
  // SEO safety net: if build-seo.js was not run, add the basics at runtime.
  // (Google reads these; WhatsApp/Facebook link previews need build-seo.js.)
  // ---------------------------------------------------------------------
  (function () {
    var desc = cfg.seoDescription || cfg.heroSubtitle || '';
    if (desc && !document.querySelector('meta[name="description"]')) {
      var m = document.createElement('meta'); m.name = 'description'; m.content = desc; document.head.appendChild(m);
    }
    if (cfg.siteUrl && !document.querySelector('link[rel="canonical"]')) {
      var l = document.createElement('link'); l.rel = 'canonical'; l.href = cfg.siteUrl.replace(/\/+$/, '') + '/'; document.head.appendChild(l);
    }
    if (!$('ld-json')) {
      var base = cfg.siteUrl ? cfg.siteUrl.replace(/\/+$/, '') + '/' : location.href.split('#')[0];
      var data = {
        '@context': 'https://schema.org',
        '@type': cfg.businessType || 'Store',
        name: storeFullName,
        description: desc,
        url: base,
        telephone: cfg.phoneDisplay,
        address: { '@type': 'PostalAddress', streetAddress: cfg.address, addressCountry: 'NG' }
      };
      if (cfg.priceRange) data.priceRange = cfg.priceRange;
      if (cfg.openingHours && cfg.openingHours.length) data.openingHours = cfg.openingHours;
      var same = [cfg.socials && cfg.socials.instagram, cfg.socials && cfg.socials.facebook].filter(Boolean);
      if (same.length) data.sameAs = same;
      var s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'ld-json';
      s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
    }
  })();

})();
