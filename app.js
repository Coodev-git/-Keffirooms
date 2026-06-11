const API_URL = '/api';
const ADMIN_PHONE = '2347066068160'; // Setrapay Coordinator

let state = {
  user: null,
  listings: [],
  currentListing: null
};

async function fetchListings() {
  try {
    const res = await fetch(`${API_URL}/listings`);
    state.listings = await res.json();
    renderListings();
  } catch (err) {
    console.error('Failed to fetch listings', err);
  }
}

function renderListings() {
  const grid = document.getElementById('listings-grid');
  grid.innerHTML = state.listings.map(l => `
    <div class="card" onclick="showDetails('${l.id}')">
      <h3>${l.title}</h3>
      <p>${l.area} - N${l.price.toLocaleString()}</p>
    </div>
  `).join('');
}

function showDetails(id) {
  const l = state.listings.find(x => x.id === id);
  state.currentListing = l;
  document.getElementById('hero').style.display = 'none';
  document.getElementById('details').style.display = 'block';
  
  const content = document.getElementById('listing-content');
  content.innerHTML = `
    <div class="card">
      <h2 class="syne">${l.title}</h2>
      <p>${l.description}</p>
      <div class="price">N${l.price.toLocaleString()}/year</div>
      <p><strong>Agent:</strong> ${l.agent_name}</p>
      
      <button onclick="contactAgent()" class="btn-primary">Contact Agent</button>
    </div>
  `;
}

function contactAgent() {
  const l = state.currentListing;
  const seekerInfo = state.user ? `Phone: ${state.user.phone}` : 'Guest User';
  
  // 1. Message to Admin (Setrapay Coordinator)
  const adminMsg = encodeURIComponent(
    `KeffiRooms Inquiry Alert\n\n` +
    `Listing: ${l.title}\n` +
    `Area: ${l.area}\n` +
    `Price: N${l.price.toLocaleString()}/yr\n` +
    `Agent: ${l.agent_name} (${l.agent_phone})\n` +
    `Seeker: ${seekerInfo}\n\n` +
    `[Setrapay Manual Escrow — Create WhatsApp group: Seeker + Agent + You]`
  );
  
  // Open Admin WhatsApp notification in a hidden way if possible, or just redirect
  // For this flow, we'll redirect the seeker to the ADMIN (You) first as requested.
  
  const seekerToAdminMsg = encodeURIComponent(
    `Hello, I saw ${l.title} on KeffiRooms (${l.area}, N${l.price.toLocaleString()}/yr). I would like to inquire about this property and use Setrapay for a secure transaction.`
  );

  // Redirect to Admin
  window.open(`https://wa.me/${ADMIN_PHONE}?text=${seekerToAdminMsg}`, '_blank');
  
  // Log the lead to the server (optional but good for data)
  console.log('Lead generated for:', l.id);
}

function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  document.getElementById(screen).style.display = 'block';
}

// Init
fetchListings();
lucide.createIcons();
