/* Small helpers used by every page */
export async function fetchHostels() {
  // merge remote JSON + any hostels added locally
  const res = await fetch('/data/hostels.json');
  const json = await res.json();
  const local = JSON.parse(localStorage.getItem('extraHostels') || '[]');
  return [...json, ...local];
}

export function $(sel, ctx = document){ return ctx.querySelector(sel); }
export function $all(sel, ctx = document){ return [...ctx.querySelectorAll(sel)]; }

export function getParam(name){
  return new URLSearchParams(location.search).get(name);
}

export function setTheme(dark){
  document.documentElement.setAttribute('data-theme', dark?'dark':'light');
  localStorage.setItem('theme', dark);
}

export function initThemeToggle(){
  const btn = document.createElement('button');
  btn.textContent='☾ / ☼'; btn.className='toggle';
  btn.addEventListener('click',()=> {
    const dark = document.documentElement.getAttribute('data-theme')!=='dark';
    setTheme(dark);
  });
  const saved = localStorage.getItem('theme')==='true';
  setTheme(saved);
  document.querySelector('header').appendChild(btn);
}

export function starHTML(r){
  return '★'.repeat(Math.round(r)) + '☆'.repeat(5-Math.round(r));
}
