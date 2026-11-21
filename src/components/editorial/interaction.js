const root = document.getElementById('pfl-look');
const header = root.querySelector('.pfl-chrome');
const languageLink = header.querySelector('.pfl-lang');
const navigation = [...header.querySelectorAll('nav a')];
const dialog = root.querySelector('.pfl-lightbox');
const enlarged = dialog.querySelector('img');
const isHome = root.dataset.editorialScreen === 'home';
const russian = root.lang === 'ru';
const home = russian ? '/ru/' : '/';
const labels = russian ? {
  copied: 'Скопировано',
  copyError: 'Не удалось скопировать адрес.',
  loading: 'Загрузка 3D-модели…',
  modelError: 'Не удалось загрузить 3D-модель.',
  modelFile: 'Скачать 3D-модель',
  videoFile: 'Открыть видео',
} : {
  copied: 'Copied',
  copyError: 'Could not copy the address.',
  loading: 'Loading 3D model…',
  modelError: 'Could not load the 3D model.',
  modelFile: 'Download the 3D model',
  videoFile: 'Open the video',
};

let previousScroll = Math.max(window.scrollY, 0);
let viewerModule;

function showHeader() {
  header.classList.remove('pfl-header-hidden');
}

window.addEventListener('scroll', () => {
  const y = Math.max(window.scrollY, 0);
  header.classList.toggle('pfl-header-scrolled', y > 24);
  if (y < header.offsetHeight) {
    showHeader();
    previousScroll = y;
    return;
  }
  if (Math.abs(y - previousScroll) < 8) return;
  header.classList.toggle('pfl-header-hidden', y > previousScroll && !header.contains(document.activeElement));
  previousScroll = y;
}, { passive: true });
window.addEventListener('pointermove', (event) => {
  if (event.pointerType === 'mouse' && event.clientY <= 24) showHeader();
}, { passive: true });
header.addEventListener('focusin', showHeader);
new ResizeObserver(() => {
  root.style.setProperty('--pfl-header-height', header.offsetHeight + 'px');
}).observe(header);

function setCurrentLink(path, state = 'page') {
  for (const link of navigation) {
    if (link.getAttribute('href') === path) link.setAttribute('aria-current', state);
    else link.removeAttribute('aria-current');
  }
}

function showHomeSection(moveFocus = false) {
  const hash = location.hash.slice(1).replace(/^pfl-/, '');
  const serviceName = hash.match(/^(?:services\/)?(m-[a-z-]+)$/)?.[1];
  const service = serviceName ? document.getElementById('service-' + serviceName) : null;
  const aboutBlock = ['m-team', 'm-about', 'm-how', 'm-reviews'].includes(hash)
    ? document.getElementById(hash) : null;
  const content = service || hash === 'services' ? 'services'
    : aboutBlock ? 'about' : ['about', 'contact'].includes(hash) ? hash : 'home';
  const main = root.querySelector('main');
  const intro = main.querySelector('.pfl-main');
  intro.hidden = content !== 'home';
  for (const page of main.querySelectorAll('section[data-screen]')) {
    page.hidden = page.dataset.screen !== content;
  }
  for (const video of main.querySelectorAll('section[data-screen][hidden] video')) {
    if (!video.paused) video.pause();
  }
  if (service) service.open = true;
  header.toggleAttribute('data-home', content === 'home');
  const destination = service ? serviceName : aboutBlock ? hash : content === 'home' ? '' : content;
  languageLink.href = root.dataset.alternateHome + (content === 'contact' ? 'contact/' : destination ? '#' + destination : '');
  setCurrentLink(home + (content === 'contact' ? 'contact/' : content === 'home' ? '' : '#' + content));
  showHeader();

  requestAnimationFrame(() => {
    const section = service?.closest('.pfl-service-card') ?? aboutBlock ??
      (content === 'home' ? intro : document.getElementById(content));
    const title = section?.querySelector(service ? 'h3' : aboutBlock ? 'h2' : 'h1');
    if (service || aboutBlock) section?.scrollIntoView({ block: 'start' });
    else if (moveFocus || content !== 'home') window.scrollTo(0, 0);
    previousScroll = Math.max(window.scrollY, 0);
    if (moveFocus && title) {
      title.tabIndex = -1;
      title.focus({ preventScroll: true });
    }
  });
}

if (isHome) {
  window.addEventListener('hashchange', () => showHomeSection(true));
  showHomeSection();
} else if (root.dataset.editorialScreen === 'contact') {
  setCurrentLink(home + 'contact/');
} else {
  setCurrentLink(home + 'portfolio/', root.dataset.editorialScreen === 'portfolio' ? 'page' : 'location');
}

function mediaLink(url, label) {
  const link = document.createElement('a');
  link.className = 'pfl-media-fallback';
  link.href = url;
  link.textContent = label;
  return link;
}

for (const video of root.querySelectorAll('video')) {
  const source = video.querySelector('source');
  if (!source) continue;
  function onError() {
    if (video.nextElementSibling?.classList.contains('pfl-media-fallback')) return;
    const link = mediaLink(source.src, labels.videoFile);
    link.target = '_blank';
    link.rel = 'noopener';
    video.after(link);
  }
  source.addEventListener('error', onError);
  video.addEventListener('error', onError);
  video.addEventListener('playing', () => {
    const link = video.nextElementSibling;
    if (link?.classList.contains('pfl-media-fallback')) link.remove();
  });
}

let emailToCopy;
document.addEventListener('copy', (event) => {
  if (emailToCopy && document.activeElement === emailToCopy) return;
  event.preventDefault();
});
document.addEventListener('cut', (event) => event.preventDefault());

async function copyEmail(button) {
  const status = button.closest('.pfl-email-row').querySelector('.pfl-copy-status');
  const address = button.dataset.copyEmail;
  try {
    await navigator.clipboard.writeText(address);
    status.textContent = labels.copied;
  } catch {
    const field = document.createElement('textarea');
    field.className = 'pfl-clipboard-input';
    field.value = address;
    field.readOnly = true;
    field.tabIndex = -1;
    emailToCopy = field;
    root.append(field);
    try {
      field.focus({ preventScroll: true });
      field.select();
      status.textContent = document.execCommand('copy') ? labels.copied : labels.copyError;
    } catch {
      status.textContent = labels.copyError;
    } finally {
      field.remove();
      emailToCopy = undefined;
      button.focus({ preventScroll: true });
    }
  }
}

async function openModel(button) {
  const frame = button.closest('.pfl-3d-frame');
  const status = frame.querySelector('.pfl-3d-status');
  const poster = frame.querySelector('img');
  let viewer;
  let timeout;
  button.disabled = true;
  status.textContent = labels.loading;
  try {
    viewerModule ??= import('@google/model-viewer').catch((error) => {
      viewerModule = undefined;
      throw error;
    });
    const timeoutPromise = new Promise((_, reject) => {
      timeout = setTimeout(() => reject(new Error('Timed out while loading a 3D model')), 35000);
    });
    await Promise.race([viewerModule, timeoutPromise]);
    viewer = document.createElement('model-viewer');
    const title = frame.dataset.modelTitle;
    viewer.setAttribute('camera-controls', '');
    viewer.setAttribute('touch-action', 'pan-y');
    viewer.setAttribute('loading', 'eager');
    viewer.setAttribute('alt', title);
    viewer.setAttribute('aria-label', title);
    viewer.setAttribute('exposure', frame.dataset.exposure);
    viewer.setAttribute('shadow-intensity', frame.dataset.shadow);
    viewer.setAttribute('poster', poster.currentSrc || poster.src);
    const modelLoaded = new Promise((resolve, reject) => {
      viewer.addEventListener('load', resolve, { once: true });
      viewer.addEventListener('error', reject, { once: true });
      viewer.setAttribute('src', frame.dataset.model);
      frame.prepend(viewer);
    });
    await Promise.race([modelLoaded, timeoutPromise]);
    frame.classList.add('pfl-model-ready');
    poster.hidden = true;
    button.hidden = true;
    status.textContent = '';
    viewer.focus({ preventScroll: true });
  } catch {
    viewer?.remove();
    button.disabled = false;
    status.textContent = labels.modelError;
    const link = mediaLink(frame.dataset.model, labels.modelFile);
    link.download = '';
    status.append(link);
  } finally {
    clearTimeout(timeout);
  }
}

root.addEventListener('click', (event) => {
  const control = event.target.closest('[data-compare-choice],[data-zoom],[data-copy-email],[data-rotate-model]');
  if (!control) return;
  if (control.hasAttribute('data-compare-choice')) {
    const comparison = control.closest('[data-comparison]');
    for (const button of comparison.querySelectorAll('[data-compare-choice]')) {
      button.setAttribute('aria-pressed', String(button === control));
    }
    for (const cell of comparison.querySelectorAll('[data-compare-col]')) {
      cell.toggleAttribute('data-current', cell.dataset.compareCol === control.dataset.compareChoice);
    }
  } else if (control.hasAttribute('data-copy-email')) {
    void copyEmail(control);
  } else if (control.hasAttribute('data-rotate-model')) {
    void openModel(control);
  } else {
    const image = control.querySelector('img');
    enlarged.src = image.dataset.full || image.currentSrc || image.src;
    enlarged.alt = image.alt;
    dialog.showModal();
  }
});
dialog.addEventListener('close', () => enlarged.removeAttribute('src'));
