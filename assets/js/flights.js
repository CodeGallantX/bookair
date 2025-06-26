import { fetchFlights, convertCurrency, getAirlineInfo, searchAirports } from './api.js';

// DOM Elements
const flightsList = document.getElementById('flights-list');
const loadMoreBtn = document.getElementById('load-more');
const sortTabs = document.querySelectorAll('.sort-tab');
const priceSlider = document.getElementById('price-slider');
const minPriceDisplay = document.getElementById('min-price');
const maxPriceDisplay = document.getElementById('max-price');
const shownCount = document.getElementById('shown-count');
const totalCount = document.getElementById('total-count');
const searchBtn = document.querySelector('.search-btn');
const toast = document.getElementById('toast');
const closeToastBtn = toast.querySelector('.close-btn');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const departureDate = document.getElementById('departure');
const returnDate = document.getElementById('return');
const passengerCount = document.getElementById('passenger-count');
const classSelect = document.getElementById('class');
const resultsTitle = document.getElementById('results-title');
const selectedCurrencyBtn = document.getElementById('selected-currency');
const currencyDropdown = document.querySelector('.currency-dropdown');
const currencyOptions = document.querySelectorAll('.currency-dropdown li');
const mobileCurrencySelect = document.querySelector('.mobile-currency-select');
const tabs = document.querySelectorAll('.tab');

// State
let currentFilters = {
  origin: 'Lagos (LOS)',
  destination: 'London (LHR)',
  stops: ['0', '1'],
  airlines: ['emirates', 'ethiopian', 'qatar', 'british', 'turkish'],
  priceRange: 1500000,
  departureTime: null,
  returnTime: null,
  baggage: ['free'],
  sort: 'best',
  limit: 6,
  tripType: 'roundtrip'
};

let currentCurrency = 'NGN';
let selectedFlights = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initSearchInputs();
  setupEventListeners();
  loadFlights();
  updatePriceDisplay();
});

// Initialize search inputs with datalist
function initSearchInputs() {
  const fromDatalist = document.createElement('datalist');
  fromDatalist.id = 'from-suggestions';
  document.body.appendChild(fromDatalist);

  const toDatalist = document.createElement('datalist');
  toDatalist.id = 'to-suggestions';
  document.body.appendChild(toDatalist);

  // Set initial airport suggestions
  updateAirportSuggestions('Lagos', 'from-suggestions');
  updateAirportSuggestions('London', 'to-suggestions');
}

// Update airport suggestions
function updateAirportSuggestions(query, datalistId) {
  const datalist = document.getElementById(datalistId);
  datalist.innerHTML = '';
  
  const suggestions = searchAirports(query);
  suggestions.forEach(airport => {
    const option = document.createElement('option');
    option.value = `${airport.city} (${airport.code})`;
    option.dataset.code = airport.code;
    datalist.appendChild(option);
  });
}

// Debounce flight loading
let debounceTimer;
function debouncedLoadFlights() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    loadFlights();
  }, 300);
}

// Update price display in current currency
function updatePriceDisplay() {
  const formatter = new Intl.NumberFormat(getLocale(currentCurrency), {
    style: 'currency',
    currency: currentCurrency,
    minimumFractionDigits: 0
  });
  
  maxPriceDisplay.textContent = formatter.format(currentFilters.priceRange);
  minPriceDisplay.textContent = formatter.format(0);
}

// Event Listeners
function setupEventListeners() {
  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilters.tripType = tab.dataset.tab;
      
      // Show/hide return date based on trip type
      if (currentFilters.tripType === 'oneway') {
        document.querySelector('.return-date').style.display = 'none';
      } else {
        document.querySelector('.return-date').style.display = 'block';
      }
      
      loadFlights();
    });
  });

  // Origin/destination input
  fromInput.addEventListener('input', (e) => {
    updateAirportSuggestions(e.target.value, 'from-suggestions');
    currentFilters.origin = e.target.value;
    debouncedLoadFlights();
  });

  toInput.addEventListener('input', (e) => {
    updateAirportSuggestions(e.target.value, 'to-suggestions');
    currentFilters.destination = e.target.value;
    debouncedLoadFlights();
  });

  // Date changes
  departureDate.addEventListener('change', () => {
    currentFilters.departureDate = departureDate.value;
    loadFlights();
  });

  returnDate.addEventListener('change', () => {
    currentFilters.returnDate = returnDate.value;
    loadFlights();
  });

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
    checkbox.addEventListener('change', () => {
      currentFilters.stops = Array.from(
        document.querySelectorAll('.filter-options input[name="stops"]:checked')
      ).map(cb => cb.value);
      loadFlights();
    });
  });
  
  // Airline filters
  document.querySelectorAll('.filter-options input[name="airlines"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      currentFilters.airlines = Array.from(
        document.querySelectorAll('.filter-options input[name="airlines"]:checked')
      ).map(cb => cb.value);
      loadFlights();
    });
  });
  
  // Baggage filters
  document.querySelectorAll('.filter-options input[name="baggage"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      currentFilters.baggage = Array.from(
        document.querySelectorAll('.filter-options input[name="baggage"]:checked')
      ).map(cb => cb.value);
      loadFlights();
    });
  });
  
  // Price slider
  priceSlider.addEventListener('input', () => {
    currentFilters.priceRange = priceSlider.value;
    updatePriceDisplay();
    loadFlights();
  });
  
  // Time filters
  document.querySelectorAll('.time-option').forEach(option => {
    option.addEventListener('click', (e) => {
      const parentDiv = e.target.closest('.time-options');
      parentDiv.querySelectorAll('.time-option').forEach(o => o.classList.remove('active'));
      e.target.classList.add('active');
      
      const timeFilterType = e.target.closest('.time-filter').querySelector('h4').textContent.includes('Origin') 
        ? 'departureTime' 
        : 'returnTime';
      
      currentFilters[timeFilterType] = e.target.dataset.time;
      loadFlights();
    });
  });
  
  // Load more button
  loadMoreBtn.addEventListener('click', () => {
    currentFilters.limit += 5;
    loadFlights();
  });
  
  // Passenger counter
  document.querySelectorAll('.counter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const counter = e.target.closest('.counter');
      const countElement = counter.querySelector('.count');
      let count = parseInt(countElement.textContent);
      
      if (e.target.classList.contains('plus')) {
        count++;
      } else if (count > 0) {
        count--;
      }
      
      countElement.textContent = count;
      updatePassengerCount();
    });
  });
  
  // Class selection
  classSelect.addEventListener('change', () => {
    currentFilters.class = classSelect.value;
    loadFlights();
  });
  
  // Search button
  searchBtn.addEventListener('click', () => {
    currentFilters.limit = 6;
    loadFlights();
  });
  
  // Currency selection
  selectedCurrencyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currencyDropdown.classList.toggle('show');
  });
  
  currencyOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      currentCurrency = option.dataset.currency;
      selectedCurrencyBtn.textContent = currentCurrency;
      currencyDropdown.classList.remove('show');
      updatePriceDisplay();
      loadFlights();
    });
  });
  
  // Mobile currency selection
  mobileCurrencySelect.addEventListener('change', () => {
    currentCurrency = mobileCurrencySelect.value;
    updatePriceDisplay();
    loadFlights();
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    currencyDropdown.classList.remove('show');
  });
  
  // Toast close button
  closeToastBtn.addEventListener('click', () => {
    hideToast();
  });
}

// Update passenger count display
function updatePassengerCount() {
  const adults = parseInt(document.querySelector('.passenger-type:nth-child(1) .count').textContent);
  const children = parseInt(document.querySelector('.passenger-type:nth-child(2) .count').textContent);
  const infants = parseInt(document.querySelector('.passenger-type:nth-child(3) .count').textContent);
  
  let countText = '';
  if (adults > 0) countText += `${adults} Adult${adults > 1 ? 's' : ''}`;
  if (children > 0) countText += `${countText ? ', ' : ''}${children} Child${children > 1 ? 'ren' : ''}`;
  if (infants > 0) countText += `${countText ? ', ' : ''}${infants} Infant${infants > 1 ? 's' : ''}`;
  
  passengerCount.textContent = countText || '1 Adult';
}

// Load and display flights
async function loadFlights() {
  try {
    // Update results title
    const originCity = currentFilters.origin.split('(')[0].trim();
    const destCity = currentFilters.destination.split('(')[0].trim();
    resultsTitle.textContent = `Flights from ${originCity} to ${destCity}`;
    
    const flights = await fetchFlights(currentFilters);
    displayFlights(flights);
  } catch (error) {
    console.error('Error loading flights:', error);
    showError();
  }
}

function showError() {
  flightsList.innerHTML = `
    <div class="error-message">
      <i class="fas fa-exclamation-circle"></i>
      <p>Unable to load flights. Please try again later.</p>
    </div>
  `;
  loadMoreBtn.style.display = 'none';
}

function displayFlights(flights) {
  flightsList.innerHTML = '';
  
  if (flights.length === 0) {
    flightsList.innerHTML = `
      <div class="no-flights">
        <i class="fas fa-plane-slash"></i>
        <p>No flights match your search criteria. Try adjusting your filters.</p>
      </div>
    `;
    loadMoreBtn.style.display = 'none';
    return;
  }
  
  const flightsToShow = flights.slice(0, currentFilters.limit);
  
  flightsToShow.forEach(flight => {
    const flightCard = createFlightCard(flight);
    flightsList.appendChild(flightCard);
  });
  
  shownCount.textContent = Math.min(currentFilters.limit, flights.length);
  totalCount.textContent = flights.length;
  
  loadMoreBtn.style.display = currentFilters.limit >= flights.length ? 'none' : 'block';
}

function createFlightCard(flight) {
  const airlineInfo = getAirlineInfo(flight.airline);
  const price = convertCurrency(flight.price, 'NGN', currentCurrency);
  const formatter = new Intl.NumberFormat(getLocale(currentCurrency), {
    style: 'currency',
    currency: currentCurrency,
    minimumFractionDigits: 0
  });
  
  const card = document.createElement('div');
  card.className = 'flight-card';
  card.dataset.id = flight.id;
  
  card.innerHTML = `
    <div class="flight-header">
      <div class="airline-info">
        <img src="./assets/images/${airlineInfo.logo}" alt="${airlineInfo.name}" class="airline-logo-lg">
        <span class="airline-name">${airlineInfo.name} • ${flight.flightNumber}</span>
      </div>
      <div class="flight-price">${formatter.format(price)}</div>
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
        <span>${flight.stops > 0 ? flight.arrival2.time : flight.arrival.time}</span>
        <span>${flight.stops > 0 ? flight.arrival2.airport : flight.arrival.airport}</span>
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
  
  // Add select button functionality
  const selectBtn = card.querySelector('.select-btn');
  selectBtn.addEventListener('click', () => {
    if (selectedFlights.length >= 3 && !selectedFlights.some(f => f.id === flight.id)) {
      showToast('You can select a maximum of 3 flights. Remove one before adding another.', 'error');
      return;
    }
    
    if (selectedFlights.some(f => f.id === flight.id)) {
      selectedFlights = selectedFlights.filter(f => f.id !== flight.id);
      selectBtn.textContent = 'Select';
      selectBtn.classList.remove('selected');
    } else {
      selectedFlights.push({
        ...flight,
        currency: currentCurrency,
        convertedPrice: price
      });
      selectBtn.textContent = 'Selected';
      selectBtn.classList.add('selected');
    }
    
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
    document.querySelector('.results').appendChild(proceedBtn);
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
  showToast('Redirecting to booking page...', 'success');
  
  // Redirect after delay
  setTimeout(() => {
    window.location.href = 'booking.html';
  }, 3000);
}

// Toast functions
function showToast(message, type = 'success') {
  const toastContent = toast.querySelector('.message');
  toastContent.textContent = message;
  
  // Set icon based on type
  const icon = toast.querySelector('i');
  if (type === 'error') {
    icon.className = 'fas fa-exclamation-circle';
    toast.classList.add('error');
  } else {
    icon.className = 'fas fa-plane';
    toast.classList.remove('error');
  }
  
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

function getLocale(currency) {
  const locales = {
    NGN: 'en-NG',
    USD: 'en-US',
    GBP: 'en-GB',
    EUR: 'en-EU',
    AED: 'en-AE'
  };
  return locales[currency] || 'en-NG';
}