import { fetchFlights, convertCurrency, getAirlineInfo } from './api.js';

// DOM Elements
const flightsList = document.getElementById('flights-list');
const loadMoreBtn = document.getElementById('load-more');
const sortTabs = document.querySelectorAll('.sort-tab');
const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
const priceSlider = document.getElementById('price-slider');
const minPriceDisplay = document.getElementById('min-price');
const maxPriceDisplay = document.getElementById('max-price');
const shownCount = document.getElementById('shown-count');
const totalCount = document.getElementById('total-count');
const currencyDropdown = document.querySelector('.currency-dropdown');
const currencyOptions = document.querySelectorAll('.dropdown-menu li[data-currency]');
const selectedCurrency = document.getElementById('selected-currency');
const timeOptions = document.querySelectorAll('.time-option');
const searchBtn = document.querySelector('.search-btn');
const toast = document.getElementById('toast');
const closeToastBtn = toast.querySelector('.close-btn');

// State
let currentFilters = {
  stops: ['0', '1'],
  airlines: ['delta', 'united', 'american', 'british'],
  priceRange: 5000,
  departureTime: null,
  baggage: 'free',
  sort: 'best'
};

let displayedFlights = 5;
let currentCurrency = 'USD';
let selectedFlights = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadFlights();
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  // Sort tabs
  sortTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sortTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilters.sort = tab.dataset.sort;
      loadFlights();
    });
  });
  
  // Stop filters
  document.querySelectorAll('.filter-options input[name="stops"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateStopFilters);
  });
  
  // Airline filters
  document.querySelectorAll('.filter-options input[name="airlines"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateAirlineFilters);
  });
  
  // Baggage filters
  document.querySelectorAll('.filter-options input[name="baggage"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateBaggageFilter);
  });
  
  // Price slider
  priceSlider.addEventListener('input', () => {
    currentFilters.priceRange = priceSlider.value;
    maxPriceDisplay.textContent = formatCurrency(priceSlider.value, currentCurrency);
    loadFlights();
  });
  
  // Time filters
  timeOptions.forEach(option => {
    option.addEventListener('click', () => {
      timeOptions.forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      currentFilters.departureTime = option.dataset.time;
      loadFlights();
    });
  });
  
  // Load more button
  loadMoreBtn.addEventListener('click', () => {
    displayedFlights += 5;
    loadFlights();
  });
  
  // Currency dropdown
  currencyDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    currencyDropdown.querySelector('.dropdown-menu').classList.toggle('show');
  });
  
  // Currency selection
  currencyOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      currentCurrency = option.dataset.currency;
      selectedCurrency.textContent = currentCurrency;
      currencyDropdown.querySelector('.dropdown-menu').classList.remove('show');
      loadFlights();
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    currencyDropdown.querySelector('.dropdown-menu').classList.remove('show');
  });
  
  // Search button
  searchBtn.addEventListener('click', () => {
    // In a real app, this would use the search form values to fetch new results
    displayedFlights = 5;
    loadFlights();
  });
  
  // Toast close button
  closeToastBtn.addEventListener('click', () => {
    hideToast();
  });
}

// Filter functions
function updateStopFilters() {
  currentFilters.stops = Array.from(document.querySelectorAll('.filter-options input[name="stops"]:checked')).map(cb => cb.value);
  loadFlights();
}

function updateAirlineFilters() {
  currentFilters.airlines = Array.from(document.querySelectorAll('.filter-options input[name="airlines"]:checked')).map(cb => cb.value);
  loadFlights();
}

function updateBaggageFilter() {
  const checked = document.querySelector('.filter-options input[name="baggage"]:checked');
  currentFilters.baggage = checked ? checked.value : null;
  loadFlights();
}

// Load and display flights
async function loadFlights() {
  try {
    const flights = await fetchFlights(currentFilters);
    displayFlights(flights);
  } catch (error) {
    console.error('Error loading flights:', error);
  }
}

function displayFlights(flights) {
  flightsList.innerHTML = '';
  const flightsToShow = flights.slice(0, displayedFlights);
  
  flightsToShow.forEach(flight => {
    const flightCard = createFlightCard(flight);
    flightsList.appendChild(flightCard);
  });
  
  shownCount.textContent = Math.min(displayedFlights, flights.length);
  totalCount.textContent = flights.length;
  
  loadMoreBtn.style.display = displayedFlights >= flights.length ? 'none' : 'block';
}

function createFlightCard(flight) {
  const airlineInfo = getAirlineInfo(flight.airline);
  const price = convertCurrency(flight.price, 'USD', currentCurrency);
  
  const card = document.createElement('div');
  card.className = 'flight-card';
  card.dataset.id = flight.id;
  
  card.innerHTML = `
    <div class="flight-header">
      <div class="airline-info">
        <img src="./assets/images/${airlineInfo.logo}" alt="${airlineInfo.name}" class="airline-logo-lg">
        <span class="airline-name">${airlineInfo.name} • ${flight.flightNumber}</span>
      </div>
      <div class="flight-price">${formatCurrency(price, currentCurrency)}</div>
    </div>
    
    <div class="flight-body">
      <div class="flight-time">
        <span>${flight.departure.time}</span>
        <span>${flight.departure.airport}</span>
      </div>
      
      <div class="flight-duration">
        <span>${flight.duration}</span>
        <div class="duration-line"></div>
        <span class="flight-stops">${getStopsText(flight.stops)}</span>
      </div>
      
      <div class="flight-time">
        <span>${flight.arrival.time}</span>
        <span>${flight.arrival.airport}</span>
      </div>
    </div>
    
    <div class="flight-footer">
      <div class="baggage-info">
        <i class="fas fa-suitcase"></i>
        <span>${flight.baggage.cabin} cabin bag${flight.baggage.checked > 0 ? ` + ${flight.baggage.checked} checked bag` : ''}</span>
      </div>
      <button class="select-btn">Select</button>
    </div>
  `;
  
  // Add event listener to select button
  const selectBtn = card.querySelector('.select-btn');
  selectBtn.addEventListener('click', () => {
    if (selectedFlights.length >= 3 && !selectedFlights.some(f => f.id === flight.id)) {
      alert('You can select a maximum of 3 flights. Please remove one before adding another.');
      return;
    }
    
    if (selectedFlights.some(f => f.id === flight.id)) {
      selectedFlights = selectedFlights.filter(f => f.id !== flight.id);
      selectBtn.textContent = 'Select';
      selectBtn.classList.remove('selected');
    } else {
      selectedFlights.push({...flight, currency: currentCurrency});
      selectBtn.textContent = 'Selected';
      selectBtn.classList.add('selected');
    }
    
    // Update UI to show selected count
    updateSelectedFlightsCount();
  });
  
  // Highlight if already selected
  if (selectedFlights.some(f => f.id === flight.id)) {
    selectBtn.textContent = 'Selected';
    selectBtn.classList.add('selected');
  }
  
  return card;
}

function updateSelectedFlightsCount() {
  const selectBtns = document.querySelectorAll('.select-btn');
  selectBtns.forEach(btn => {
    const flightId = btn.closest('.flight-card').dataset.id;
    if (selectedFlights.some(f => f.id === flightId)) {
      btn.textContent = 'Selected';
      btn.classList.add('selected');
    } else {
      btn.textContent = 'Select';
      btn.classList.remove('selected');
    }
  });
  
  // If we have selected flights, show proceed button
  if (selectedFlights.length > 0) {
    showProceedButton();
  } else {
    hideProceedButton();
  }
}

function showProceedButton() {
  let proceedBtn = document.getElementById('proceed-btn');
  if (!proceedBtn) {
    proceedBtn = document.createElement('button');
    proceedBtn.id = 'proceed-btn';
    proceedBtn.className = 'btn btn-primary proceed-btn';
    proceedBtn.textContent = `Proceed with ${selectedFlights.length} flight${selectedFlights.length > 1 ? 's' : ''}`;
    proceedBtn.addEventListener('click', proceedToBooking);
    document.querySelector('.search-results').appendChild(proceedBtn);
  } else {
    proceedBtn.textContent = `Proceed with ${selectedFlights.length} flight${selectedFlights.length > 1 ? 's' : ''}`;
  }
}

function hideProceedButton() {
  const proceedBtn = document.getElementById('proceed-btn');
  if (proceedBtn) {
    proceedBtn.remove();
  }
}

function proceedToBooking() {
  // Save selected flights to session storage
  sessionStorage.setItem('selectedFlights', JSON.stringify(selectedFlights));
  sessionStorage.setItem('currency', currentCurrency);
  
  // Show toast notification
  showToast();
  
  // Redirect after delay
  setTimeout(() => {
    window.location.href = 'booking.html';
  }, 3000);
}

// Toast functions
function showToast() {
  toast.classList.add('show');
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    hideToast();
  }, 3000);
}

function hideToast() {
  toast.classList.remove('show');
}

// Helper functions
function getStopsText(stops) {
  if (stops === 0) return 'Non-stop';
  if (stops === 1) return '1 Stop';
  return `${stops} Stops`;
}

function formatCurrency(amount, currency) {
  const formatter = new Intl.NumberFormat(getLocale(currency), {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(amount);
}

function getLocale(currency) {
  const locales = {
    USD: 'en-US',
    NGN: 'en-NG',
    GBP: 'en-GB',
    EUR: 'en-EU'
  };
  return locales[currency] || 'en-US';
}