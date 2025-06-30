// /js/hostel.js
import {fetchHostels, getParam, initThemeToggle, starHTML} from './utils.js';
initThemeToggle();

const id = +getParam('id');
const mount = document.getElementById('content');

fetchHostels().then(list=>{
  const h = list.find(x=>x.id===id);
  if(!h){ mount.textContent='Hostel not found'; return; }

  mount.innerHTML = `
    <h1>${h.name}</h1>
    <p>${h.city} • ₹${h.price}/month • ${starHTML(h.rating)}</p>
    <div class="gallery">${h.images.map(src=>`<img src="images/${src}">`).join('')}</div>
    <h3>Description</h3><p>${h.description}</p>

    <h3>Amenities</h3>
    <ul>${h.amenities.map(a=>`<li>${a}</li>`).join('')}</ul>

    <h3>Location</h3>
    <iframe width="100%" height="240" style="border:0"
      loading="lazy" allowfullscreen
      src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(h.name+' '+h.city)}"></iframe>

    <button id="book" style="margin-top:1rem;padding:10px 20px">Book Now</button>
  `;

  document.getElementById('book')
    .addEventListener('click',()=> location.href=`booking.html?id=${h.id}`);
});
