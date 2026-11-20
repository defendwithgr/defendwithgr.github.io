// Desktop-style home page: open/close/minimize windows, drag by title bar,
// taskbar buttons, and a menu-bar clock. Degrades to plain links-free content
// if JavaScript is disabled (windows stay hidden, so the About page is still linked).
(function () {
  'use strict';

  var MENUBAR_H = 30;
  var zTop = 100;
  var cascade = 0;
  var mobile = window.matchMedia('(max-width: 700px)');
  var taskbar = document.getElementById('taskbar-items');
  var windows = Array.prototype.slice.call(document.querySelectorAll('.window'));
  var taskButtons = {};

  function safe(fn) {
    try { return fn(); } catch (e) { return undefined; }
  }

  function taskFor(win) {
    var id = win.id;
    if (!taskButtons[id]) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'task';
      btn.textContent = win.querySelector('.title').textContent;
      btn.addEventListener('click', function () {
        if (win.hidden) { openWindow(win); }
        else if (win.classList.contains('is-active')) { minimize(win); }
        else { focusWindow(win); }
      });
      taskbar.appendChild(btn);
      taskButtons[id] = btn;
    }
    return taskButtons[id];
  }

  function focusWindow(win) {
    windows.forEach(function (w) { w.classList.remove('is-active'); });
    win.classList.add('is-active');
    win.style.zIndex = ++zTop;
    Object.keys(taskButtons).forEach(function (id) {
      taskButtons[id].classList.toggle('is-active', id === win.id && !win.hidden);
    });
  }

  function openWindow(win) {
    if (!mobile.matches && !win.dataset.placed) {
      var offset = (cascade++ % 6) * 26;
      win.style.top = (70 + offset) + 'px';
      win.style.left = (170 + offset) + 'px';
      win.dataset.placed = '1';
    }
    win.hidden = false;
    taskFor(win);
    focusWindow(win);
    safe(function () { win.querySelector('.window-body').scrollTop = 0; });
  }

  function minimize(win) {
    win.hidden = true;
    win.classList.remove('is-active');
    if (taskButtons[win.id]) { taskButtons[win.id].classList.remove('is-active'); }
  }

  function closeWindow(win) {
    minimize(win);
    if (taskButtons[win.id]) {
      taskButtons[win.id].remove();
      delete taskButtons[win.id];
    }
  }

  // Icons open their window.
  document.querySelectorAll('[data-open]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var win = document.getElementById(btn.getAttribute('data-open'));
      if (win) { openWindow(win); }
    });
  });

  windows.forEach(function (win) {
    win.addEventListener('pointerdown', function () {
      if (!win.hidden) { focusWindow(win); }
    });
    win.querySelector('.ctl.min').addEventListener('click', function () { minimize(win); });
    win.querySelector('.ctl.close').addEventListener('click', function () { closeWindow(win); });

    // Drag by title bar (desktop widths only).
    var titlebar = win.querySelector('.titlebar');
    var drag = null;
    titlebar.addEventListener('pointerdown', function (e) {
      if (mobile.matches || e.target.closest('.ctl')) { return; }
      var rect = win.getBoundingClientRect();
      drag = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
      titlebar.setPointerCapture(e.pointerId);
    });
    titlebar.addEventListener('pointermove', function (e) {
      if (!drag) { return; }
      var maxLeft = window.innerWidth - 80;
      var maxTop = window.innerHeight - 60;
      var left = Math.min(Math.max(e.clientX - drag.dx, -win.offsetWidth + 80), maxLeft);
      var top = Math.min(Math.max(e.clientY - drag.dy, MENUBAR_H), maxTop);
      win.style.left = left + 'px';
      win.style.top = top + 'px';
    });
    var endDrag = function () { drag = null; };
    titlebar.addEventListener('pointerup', endDrag);
    titlebar.addEventListener('pointercancel', endDrag);
  });

  // Keyboard: Escape closes the active window.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') { return; }
    var active = windows.filter(function (w) { return w.classList.contains('is-active') && !w.hidden; })[0];
    if (active) { minimize(active); }
  });

  // Menu-bar clock.
  var clock = document.getElementById('clock');
  function tick() {
    var now = new Date();
    clock.textContent = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
  tick();
  setInterval(tick, 30000);

  // Open About by default on desktop so the page is not empty.
  if (!mobile.matches) {
    var about = document.getElementById('win-about');
    if (about) { openWindow(about); }
  }
})();
