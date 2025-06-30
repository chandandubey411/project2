// /js/booking.js
import {fetchHostels, getParam, initThemeToggle} from './utils.js';
initThemeToggle();

const id = +getParam('id');
const hName=$('#hName'), hPrice=$('#hPrice'), form=$('#form');

fetchHostels().then(list=>{
  const h=list.find(x=>x.id===id);
  if(!h){ location.href='hostels.html'; return; }
  hName.textContent=h.name; hPrice.textContent=h.price;
});

form.addEventListener('submit',e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(form));
  const bookings=JSON.parse(localStorage.getItem('bookings')||'[]');
  bookings.push({...data, hostelId:id, date:Date.now()});
  localStorage.setItem('bookings',JSON.stringify(bookings));
  alert('Booking confirmed! We will contact you soon.');
  location.href='index.html';
});

function $(s,ctx=document){return ctx.querySelector(s);}
