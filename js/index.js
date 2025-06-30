// /js/index.js
import {fetchHostels, initThemeToggle} from './utils.js';
initThemeToggle();

const wrap = document.getElementById('featuredWrap');
fetchHostels().then(list=>{
  list.slice(0,3).forEach(h=>{
    wrap.insertAdjacentHTML('beforeend',`
      <a class="card" href="hostel.html?id=${h.id}">
        <img src="images/${h.images[0]}" alt="">
        <h3>${h.name}</h3>
        <p>${h.city} | ₹${h.price}/month</p>
      </a>`);
  });
});

document.getElementById('go')
  .addEventListener('click',()=> {
    const q = document.getElementById('search').value.trim();
    if(q) location.href = `hostels.html?search=${encodeURIComponent(q)}`;
  });
