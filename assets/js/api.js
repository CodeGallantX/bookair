// Mock flight data
const flightsData = {
  flights: [
    {
      id: "DL123",
      airline: "delta",
      flightNumber: "DL123",
      departure: {
        airport: "JFK",
        time: "08:45",
        date: "2023-12-15"
      },
      arrival: {
        airport: "LHR",
        time: "20:15",
        date: "2023-12-15"
      },
      duration: "7h 30m",
      stops: 0,
      price: 650,
      baggage: {
        cabin: 1,
        checked: 0
      },
      aircraft: "Boeing 767",
      seatsLeft: 12
    },
    {
      id: "UA456",
      airline: "united",
      flightNumber: "UA456",
      departure: {
        airport: "JFK",
        time: "11:30",
        date: "2023-12-15"
      },
      arrival: {
        airport: "LHR",
        time: "23:00",
        date: "2023-12-15"
      },
      duration: "7h 30m",
      stops: 0,
      price: 720,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Boeing 777",
      seatsLeft: 5
    },
    {
      id: "BA789",
      airline: "british",
      flightNumber: "BA789",
      departure: {
        airport: "JFK",
        time: "18:15",
        date: "2023-12-15"
      },
      arrival: {
        airport: "LHR",
        time: "06:30",
        date: "2023-12-16"
      },
      duration: "8h 15m",
      stops: 0,
      price: 850,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Airbus A380",
      seatsLeft: 20
    },
    {
      id: "AA101",
      airline: "american",
      flightNumber: "AA101",
      departure: {
        airport: "JFK",
        time: "14:20",
        date: "2023-12-15"
      },
      arrival: {
        airport: "LHR",
        time: "02:35",
        date: "2023-12-16"
      },
      duration: "8h 15m",
      stops: 0,
      price: 690,
      baggage: {
        cabin: 1,
        checked: 0
      },
      aircraft: "Boeing 787",
      seatsLeft: 8
    },
    {
      id: "DL202",
      airline: "delta",
      flightNumber: "DL202",
      departure: {
        airport: "JFK",
        time: "09:30",
        date: "2023-12-15"
      },
      arrival: {
        airport: "ORD",
        time: "11:45",
        date: "2023-12-15"
      },
      departure2: {
        airport: "ORD",
        time: "13:15",
        date: "2023-12-15"
      },
      arrival2: {
        airport: "LHR",
        time: "04:30",
        date: "2023-12-16"
      },
      duration: "10h 15m",
      stops: 1,
      price: 550,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Boeing 737 / Boeing 767",
      seatsLeft: 15
    },
    {
      id: "UA303",
      airline: "united",
      flightNumber: "UA303",
      departure: {
        airport: "JFK",
        time: "07:15",
        date: "2023-12-15"
      },
      arrival: {
        airport: "IAD",
        time: "08:30",
        date: "2023-12-15"
      },
      departure2: {
        airport: "IAD",
        time: "10:45",
        date: "2023-12-15"
      },
      arrival2: {
        airport: "LHR",
        time: "22:30",
        date: "2023-12-15"
      },
      duration: "11h 15m",
      stops: 1,
      price: 480,
      baggage: {
        cabin: 1,
        checked: 0
      },
      aircraft: "Boeing 737 / Boeing 777",
      seatsLeft: 3
    },
    {
      id: "BA404",
      airline: "british",
      flightNumber: "BA404",
      departure: {
        airport: "JFK",
        time: "16:45",
        date: "2023-12-15"
      },
      arrival: {
        airport: "LHR",
        time: "04:30",
        date: "2023-12-16"
      },
      duration: "7h 45m",
      stops: 0,
      price: 920,
      baggage: {
        cabin: 1,
        checked: 2
      },
      aircraft: "Boeing 747",
      seatsLeft: 10
    },
    {
      id: "AA505",
      airline: "american",
      flightNumber: "AA505",
      departure: {
        airport: "JFK",
        time: "12:10",
        date: "2023-12-15"
      },
      arrival: {
        airport: "LHR",
        time: "23:55",
        date: "2023-12-15"
      },
      duration: "7h 45m",
      stops: 0,
      price: 750,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Boeing 777",
      seatsLeft: 6
    },
    {
      id: "DL606",
      airline: "delta",
      flightNumber: "DL606",
      departure: {
        airport: "JFK",
        time: "20:30",
        date: "2023-12-15"
      },
      arrival: {
        airport: "ATL",
        time: "23:00",
        date: "2023-12-15"
      },
      departure2: {
        airport: "ATL",
        time: "01:15",
        date: "2023-12-16"
      },
      arrival2: {
        airport: "LHR",
        time: "14:30",
        date: "2023-12-16"
      },
      duration: "13h 00m",
      stops: 1,
      price: 420,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Boeing 737 / Airbus A330",
      seatsLeft: 18
    },
    {
      id: "UA707",
      airline: "united",
      flightNumber: "UA707",
      departure: {
        airport: "JFK",
        time: "10:15",
        date: "2023-12-15"
      },
      arrival: {
        airport: "LHR",
        time: "21:45",
        date: "2023-12-15"
      },
      duration: "7h 30m",
      stops: 0,
      price: 780,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Boeing 787",
      seatsLeft: 4
    }
  ]
};

// Currency conversion rates (mock)
const currencyRates = {
  USD: 1,
  NGN: 780,
  GBP: 0.79,
  EUR: 0.92
};

// Mock API functions
export const fetchFlights = async (filters = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let results = [...flightsData.flights];
  
  // Apply filters
  if (filters.stops !== undefined) {
    results = results.filter(flight => {
      if (filters.stops === '0') return flight.stops === 0;
      if (filters.stops === '1') return flight.stops === 1;
      if (filters.stops === '2') return flight.stops >= 2;
      return true;
    });
  }
  
  if (filters.airlines && filters.airlines.length > 0) {
    results = results.filter(flight => filters.airlines.includes(flight.airline));
  }
  
  if (filters.priceRange) {
    results = results.filter(flight => flight.price <= filters.priceRange);
  }
  
  if (filters.departureTime) {
    results = results.filter(flight => {
      const hour = parseInt(flight.departure.time.split(':')[0]);
      if (filters.departureTime === 'morning') return hour >= 5 && hour < 12;
      if (filters.departureTime === 'afternoon') return hour >= 12 && hour < 17;
      if (filters.departureTime === 'evening') return hour >= 17 && hour < 21;
      if (filters.departureTime === 'night') return hour >= 21 || hour < 5;
      return true;
    });
  }
  
  if (filters.baggage === 'free') {
    results = results.filter(flight => flight.baggage.cabin > 0);
  } else if (filters.baggage === 'paid') {
    results = results.filter(flight => flight.baggage.checked > 0);
  }
  
  // Apply sorting
  if (filters.sort === 'cheapest') {
    results.sort((a, b) => a.price - b.price);
  } else if (filters.sort === 'fastest') {
    results.sort((a, b) => {
      const aDuration = convertDurationToMinutes(a.duration);
      const bDuration = convertDurationToMinutes(b.duration);
      return aDuration - bDuration;
    });
  } else {
    // Default sort (best) - combination of price and duration
    results.sort((a, b) => {
      const aScore = a.price * 0.7 + convertDurationToMinutes(a.duration) * 0.3;
      const bScore = b.price * 0.7 + convertDurationToMinutes(b.duration) * 0.3;
      return aScore - bScore;
    });
  }
  
  return results;
};

const convertDurationToMinutes = (duration) => {
  const [hours, minutes] = duration.split('h ');
  return parseInt(hours) * 60 + parseInt(minutes.replace('m', ''));
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  const usdAmount = amount / currencyRates[fromCurrency];
  return usdAmount * currencyRates[toCurrency];
};

export const getAirlineInfo = (airlineCode) => {
  const airlines = {
    delta: {
      name: "Delta Airlines",
      logo: "delta.png",
      rating: 4.2
    },
    united: {
      name: "United Airlines",
      logo: "united.png",
      rating: 3.9
    },
    american: {
      name: "American Airlines",
      logo: "american.png",
      rating: 4.0
    },
    british: {
      name: "British Airways",
      logo: "british.png",
      rating: 4.3
    }
  };
  return airlines[airlineCode] || {};
};