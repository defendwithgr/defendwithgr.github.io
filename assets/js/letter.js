// Letter-style home: boot intro (skippable, once per session), ⌘K / Ctrl+K page
// search palette with filtering and keyboard navigation. Works without JS too:
// all content is in the HTML and the top nav still links to every section.
(function () {
  'use strict';

  // ---------- Boot intro ----------
  var boot = document.getElementById('boot');
  var seen = false;
  try { seen = sessionStorage.getItem('booted') === '1'; } catch (e) { seen = false; }
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function endBoot() {
    if (!boot || boot.classList.contains('is-done')) { return; }
    boot.classList.add('is-done');
    try { sessionStorage.setItem('booted', '1'); } catch (e) { /* storage unavailable */ }
    setTimeout(function () { boot.hidden = true; }, 320);
  }

  if (boot) {
    if (seen || reduce) {
      boot.hidden = true;
    } else {
      setTimeout(endBoot, 1600);
      var skip = document.getElementById('boot-skip');
      if (skip) { skip.addEventListener('click', endBoot); }
    }
  }

  // ---------- Search palette ----------
  var palette = document.getElementById('palette');
  var input = document.getElementById('palette-input');
  var list = document.getElementById('palette-list');
  var openBtn = document.getElementById('search-open');
  var items = Array.prototype.slice.call(list.querySelectorAll('li'));
  var lastFocus = null;

  function visibleLinks() {
    return items.filter(function (li) { return !li.hidden; }).map(function (li) { return li.querySelector('a'); });
  }

  function highlight(index) {
    var links = visibleLinks();
    links.forEach(function (a) { a.classList.remove('is-highlighted'); });
    if (links[index]) { links[index].classList.add('is-highlighted'); }
    palette.dataset.index = String(index);
  }

  function filter(q) {
    var query = q.trim().toLowerCase();
    items.forEach(function (li) {
      var a = li.querySelector('a');
      var hay = ((a.getAttribute('data-search') || '') + ' ' + a.textContent).toLowerCase();
      li.hidden = query !== '' && hay.indexOf(query) === -1;
    });
    highlight(0);
  }

  function openPalette() {
    lastFocus = document.activeElement;
    palette.hidden = false;
    input.value = '';
    filter('');
    input.focus();
  }

  function closePalette() {
    palette.hidden = true;
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
  }

  if (openBtn) { openBtn.addEventListener('click', openPalette); }

  input.addEventListener('input', function () { filter(input.value); });

  input.addEventListener('keydown', function (e) {
    var links = visibleLinks();
    var current = parseInt(palette.dataset.index || '0', 10);
    if (e.key === 'ArrowDown') { e.preventDefault(); highlight(Math.min(current + 1, links.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); highlight(Math.max(current - 1, 0)); }
    if (e.key === 'Enter') {
      e.preventDefault();
      var target = links[current] || links[0];
      if (target) { window.location.href = target.getAttribute('href'); }
    }
  });

  palette.addEventListener('click', function (e) {
    if (e.target === palette) { closePalette(); }
  });

  // Keyboard shortcuts: ⌘K / Ctrl+K opens search; Esc closes it or skips the intro.
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette.hidden) { openPalette(); } else { closePalette(); }
      return;
    }
    if (e.key === 'Escape') {
      if (!palette.hidden) { closePalette(); return; }
      if (boot && !boot.hidden && !boot.classList.contains('is-done')) { endBoot(); }
    }
  });
})();
