// Replace BASE_URL with your Strapi backend URL (e.g., https://cms.yourdomain.com)
const BASE_URL = "https://cms.yourdomain.com";

// Helper: Show items in dropdown on button click/focus
document.querySelectorAll('.dropdown').forEach(drop => {
  const btn = drop.querySelector('.dropbtn');
  const content = drop.querySelector('.dropdown-content');
  btn.addEventListener('focus', () => {
    content.style.display = 'block';
  });
  btn.addEventListener('blur', () => {
    setTimeout(() => { content.style.display = 'none'; }, 200);
  });
  drop.addEventListener('mouseenter', () => {
    content.style.display = 'block';
  });
  drop.addEventListener('mouseleave', () => {
    content.style.display = 'none';
  });
});

// Populate Atoll dropdown
fetch(`${BASE_URL}/api/atolls`)
  .then(res => res.json())
  .then(data => {
    const el = document.getElementById('atoll-dropdown');
    el.innerHTML = '';
    data.data.forEach(atoll => {
      const a = document.createElement('a');
      a.href = `#atoll-${atoll.id}`;
      a.textContent = atoll.attributes.name;
      el.appendChild(a);
    });
    if (!data.data.length) el.innerHTML = '<span>No atolls found</span>';
  })
  .catch(() => {
    document.getElementById('atoll-dropdown').innerHTML = '<span>Error loading atolls</span>';
  });

// Populate Island dropdown (only those with guest houses)
fetch(`${BASE_URL}/api/islands?filters[has_guesthouses][$eq]=true`)
  .then(res => res.json())
  .then(data => {
    const el = document.getElementById('island-dropdown');
    el.innerHTML = '';
    data.data.forEach(island => {
      const a = document.createElement('a');
      a.href = `#island-${island.id}`;
      a.textContent = island.attributes.name;
      el.appendChild(a);
    });
    if (!data.data.length) el.innerHTML = '<span>No islands found</span>';
  })
  .catch(() => {
    document.getElementById('island-dropdown').innerHTML = '<span>Error loading islands</span>';
  });

// Populate Guest House dropdown
fetch(`${BASE_URL}/api/guesthouses`)
  .then(res => res.json())
  .then(data => {
    const el = document.getElementById('guesthouse-dropdown');
    el.innerHTML = '';
    data.data.forEach(house => {
      const a = document.createElement('a');
      a.href = `#guesthouse-${house.id}`;
      a.textContent = house.attributes.name;
      el.appendChild(a);
    });
    if (!data.data.length) el.innerHTML = '<span>No guest houses found</span>';
  })
  .catch(() => {
    document.getElementById('guesthouse-dropdown').innerHTML = '<span>Error loading guest houses</span>';
  });

// Populate Guest Houses cards
fetch(`${BASE_URL}/api/guesthouses?populate=*`)
  .then(res => res.json())
  .then(data => {
    const el = document.getElementById('guesthouses-cards');
    el.innerHTML = '';
    data.data.forEach(house => {
      const attr = house.attributes;
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${attr.image?.data?.attributes?.url || 'fallback.jpg'}" alt="${attr.name}" />
        <button onclick="updateImage('${attr.slug}')">Update Image</button>
        <div class="card-info">
          <h3>${attr.name}</h3>
          <p>${attr.summary || ''}</p>
          <button>Book Now</button>
        </div>
      `;
      el.appendChild(card);
    });
    if (!data.data.length) el.innerHTML = '<span>No guest houses found.</span>';
  })
  .catch(() => {
    document.getElementById('guesthouses-cards').innerHTML = '<span>Error loading guest houses.</span>';
  });

// Populate Tours cards (Packages section)
fetch(`${BASE_URL}/api/tours?populate=*`)
  .then(res => res.json())
  .then(data => {
    const el = document.getElementById('tours-cards');
    el.innerHTML = '';
    data.data.forEach(tour => {
      const attr = tour.attributes;
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${attr.image?.data?.attributes?.url || 'fallback.jpg'}" alt="${attr.name}" />
        <div class="card-info">
          <h3>${attr.name}</h3>
          <p>${attr.summary || ''}</p>
          <p>From $${attr.price}</p>
          <button>Book Tour</button>
        </div>
      `;
      el.appendChild(card);
    });
    if (!data.data.length) el.innerHTML = '<span>No tours found.</span>';
  })
  .catch(() => {
    document.getElementById('tours-cards').innerHTML = '<span>Error loading tours.</span>';
  });

// Modal open/close logic
document.getElementById('openContact').onclick = function(e) {
  e.preventDefault();
  document.getElementById('contactModal').style.display = 'block';
};
document.getElementById('closeModal').onclick = function() {
  document.getElementById('contactModal').style.display = 'none';
};
window.onclick = function(event) {
  var modal = document.getElementById('contactModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Placeholder for image update logic
function updateImage(imageType) {
  alert("This should open an upload dialog and send the file to your backend for updating " + imageType + ".");
}

// Example booking engine API call
function searchPackages() {
  // Implement your booking engine logic here using Strapi if needed
  document.getElementById('package-results').innerText = "Booking engine integration goes here.";
  return false;
}