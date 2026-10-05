// Page behavior: emails, copy button, windows (dialogs), lightbox, section close, Get in touch.
export function initUi() {
  // --- Emails: assembled on load so spam bots reading raw HTML don't find them
  document.querySelectorAll('.email').forEach(function (a) {
    var addr = a.dataset.u + '@' + a.dataset.d;
    a.textContent = addr;
    a.href = 'mailto:' + addr;
  });

  // --- Copy email button
  document.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var addr = b.parentElement.querySelector('.email').textContent;
      var label = b.querySelector('.copy-txt');
      var done = function () {
        label.textContent = b.dataset.copied; b.classList.add('done');
        setTimeout(function () { label.textContent = b.dataset.copy; b.classList.remove('done'); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(done, function () { fallback(addr); done(); });
      } else { fallback(addr); done(); }
    });
  });
  function fallback(text) {
    try {
      var t = document.createElement('textarea');
      t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
    } catch (e) {}
  }

  // --- Copy protection: no right-click menu except on email addresses
  document.addEventListener('contextmenu', function (e) {
    if (!e.target.closest('.email')) e.preventDefault();
  });

  // --- Modals
  var lastTrigger = null;
  function openModal(id, trigger) {
    var d = document.getElementById(id);
    if (!d) return;
    lastTrigger = trigger || null;
    d.showModal();
    d.querySelector('.m-scroll').scrollTop = 0;
    // videos are plain files: the address is attached only when the window opens
    d.querySelectorAll('video[data-src]').forEach(function (v) {
      if (!v.getAttribute('src')) v.src = v.dataset.src;
    });
    document.body.classList.add('locked');
  }
  document.querySelectorAll('[data-open]').forEach(function (b) {
    b.addEventListener('click', function () { openModal(b.dataset.open, b); });
  });
  document.querySelectorAll('dialog.modal').forEach(function (d) {
    d.querySelector('.close').addEventListener('click', function () { d.close(); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    d.addEventListener('close', function () {
      d.querySelectorAll('video').forEach(function (v) { v.pause(); });
      if (!document.querySelector('dialog.modal[open]')) document.body.classList.remove('locked');
      if (lastTrigger) lastTrigger.focus({ preventScroll: true });
    });
  });

  // --- Lightbox: click a case image to see it large
  var lb = document.getElementById('lightbox'), lbImg = lb.querySelector('img');
  document.querySelectorAll('img.shot').forEach(function (im) {
    im.setAttribute('tabindex', '0');
    im.setAttribute('role', 'button');
    var open = function () { lbImg.src = im.src; lbImg.alt = im.alt; lb.showModal(); lb.scrollTop = 0; };
    im.addEventListener('click', open);
    im.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  lb.addEventListener('click', function () { lb.close(); });

  // --- "Close ↑" at the bottom of an open section folds it and brings its title back into view
  document.querySelectorAll('[data-collapse]').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = b.closest('details'), sum = d.querySelector('summary');
      d.open = false;
      if (sum.getBoundingClientRect().top < 0) sum.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      sum.focus({ preventScroll: true });
    });
  });

  // --- "Get in touch" opens Contact and scrolls to it
  document.querySelectorAll('[data-goto]').forEach(function (b) {
    b.addEventListener('click', function () {
      var inWindow = !!b.closest('dialog');
      lastTrigger = null;                                   // don't jump back to the card after closing
      document.querySelectorAll('dialog[open]').forEach(function (d) { d.close(); });
      document.body.classList.remove('locked');             // let the page scroll again
      var t = document.getElementById(b.dataset.goto);
      t.open = true;
      var go = function () {
        t.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        t.querySelector('summary').focus({ preventScroll: true });
      };
      if (inWindow) setTimeout(go, 60); else go();
    });
  });
}
