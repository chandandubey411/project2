// /js/post.js
import {initThemeToggle} from './utils.js'; initThemeToggle();
const form=document.getElementById('pForm');
form.addEventListener('submit',e=>{
  e.preventDefault();
  const d=Object.fromEntries(new FormData(form));
  const list=JSON.parse(localStorage.getItem('extraHostels')||'[]');
  const newId=Date.now();
  list.push({
    id:newId,
    name:d.name,
    city:d.city,
    price:+d.price,
    amenities:d.amenities.split(',').map(s=>s.trim()),
    images:['hostel1.jpg'], rating:0, description:'',
  });
  localStorage.setItem('extraHostels',JSON.stringify(list));
  alert('Hostel added! (Only you can see it from this browser)');
  location.href=`hostel.html?id=${newId}`;
});
