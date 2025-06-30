// /js/hostels.js
import {fetchHostels, $, $all, initThemeToggle, starHTML, getParam} from './utils.js';
initThemeToggle();

const listEl = $('#list');
let hostels = [];

function render() {
  const maxPrice = +$('#fPrice').value || Infinity;
  const amens = $all('[type=checkbox]:checked').map(c=>c.value);
  listEl.innerHTML = '';

  hostels.filter(h=>{
    const okPrice = h.price <= maxPrice;
    const okAmen = amens.every(a=>h.amenities.includes(a));
    const search = (getParam('search')||'').toLowerCase();
    const okSearch = !search || h.city.toLowerCase().includes(search) || (h.college||'').toLowerCase().includes(search);
    return okPrice && okAmen && okSearch;
  })
  .forEach(h=>{
    listEl.insertAdjacentHTML('beforeend',`
      <a class="card" href="hostel.html?id=${h.id}">
        <img src="images/${h.images[0]}" alt="">
        <h3>${h.name}</h3>
        <p>${h.city} | ₹${h.price}</p>
        <p style="font-size:14px">${starHTML(h.rating)}</p>
      </a>`);
  });
}

fetchHostels().then(data=>{hostels=data; render();});
$('#fPrice').addEventListener('input', render);
$all('[type=checkbox]').forEach(cb=>cb.addEventListener('change',render));
