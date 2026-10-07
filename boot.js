/**
 * Runs in <head> before the page paints: applies the chosen theme (colors, fonts, corner shapes)
 * and the light/dark mode, so there is no flash of the wrong look. No need to edit this file.
 */
(function () {
  "use strict";
  var cfg = window.STORE_CONFIG;
  if (!cfg) { console.error("config.js did not load — STORE_CONFIG is missing."); return; }

  var themes = window.STORE_THEMES || {};
  var theme = themes[cfg.theme] || themes.classic || {};
  var root = document.documentElement;

  function palette(mode) {
    var base = (theme.colors && theme.colors[mode]) || {};
    var over = (cfg.colors && cfg.colors[mode]) || {};
    var out = {}, k;
    for (k in base) out[k] = base[k];
    for (k in over) if (over[k]) out[k] = over[k];
    return out;
  }

  function applyMode(mode) {
    var p = palette(mode);
    root.setAttribute('data-mode', mode);
    root.style.colorScheme = mode;
    var map = {
      '--bg': p.bg, '--bg-raised': p.bgRaised, '--bg-sunken': p.bgSunken,
      '--text': p.text, '--text-dim': p.textDim, '--border': p.border,
      '--ochre': p.ochre, '--rust': p.rust, '--on-primary': p.onPrimary || '#FFFFFF',
      '--leaf': p.leaf, '--focus': p.focus
    };
    for (var v in map) if (map[v]) root.style.setProperty(v, map[v]);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta && p.bg) meta.setAttribute('content', p.bg);
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

  root.setAttribute('data-theme', cfg.theme && themes[cfg.theme] ? cfg.theme : 'classic');
  var r = theme.radius || {};
  if (r.s) root.style.setProperty('--radius-s', r.s);
  if (r.m) root.style.setProperty('--radius-m', r.m);
  if (r.l) root.style.setProperty('--radius-l', r.l);
  if (r.btn) root.style.setProperty('--btn-radius', r.btn);
  root.style.setProperty('--font-display', cfg.fontDisplay || theme.fontDisplay || 'Georgia, serif');
  root.style.setProperty('--font-body', cfg.fontBody || theme.fontBody || 'system-ui, sans-serif');

  var fontsUrl = cfg.fontsUrl || (cfg.fontDisplay || cfg.fontBody ? '' : theme.fontsUrl);
  if (fontsUrl) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontsUrl;
    document.head.appendChild(link);
  }

  var mode = currentMode();
  applyMode(mode);

  window.STORE_BOOT = {
    getMode: function () { return mode; },
    toggleMode: function () {
      mode = mode === 'light' ? 'dark' : 'light';
      applyMode(mode);
      try { localStorage.setItem('store-theme', mode); } catch (e) { /* ignore */ }
      return mode;
    }
  };
})();
