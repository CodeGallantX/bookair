// Mock flight data with Nigerian and international airlines
const flightsData = {
  flights: [
    {
      id: "DL123",
      airline: "delta",
      flightNumber: "DL123",
      departure: {
        airport: "LOS",
        time: "08:45",
        date: "2023-12-15"
      },
      arrival: {
        airport: "JFK",
        time: "20:15",
        date: "2023-12-15"
      },
      duration: "11h 30m",
      stops: 0,
      price: 1200,
      baggage: {
        cabin: 1,
        checked: 0
      },
      aircraft: "Boeing 787",
      seatsLeft: 12
    },
    {
      id: "EK761",
      airline: "emirates",
      flightNumber: "EK761",
      departure: {
        airport: "LOS",
        time: "22:30",
        date: "2023-12-15"
      },
      arrival: {
        airport: "DXB",
        time: "06:15",
        date: "2023-12-16"
      },
      departure2: {
        airport: "DXB",
        time: "08:45",
        date: "2023-12-16"
      },
      arrival2: {
        airport: "LHR",
        time: "12:30",
        date: "2023-12-16"
      },
      duration: "14h 00m",
      stops: 1,
      price: 950,
      baggage: {
        cabin: 1,
        checked: 2
      },
      aircraft: "Airbus A380",
      seatsLeft: 8
    },
    {
      id: "ET509",
      airline: "ethiopian",
      flightNumber: "ET509",
      departure: {
        airport: "ABV",
        time: "10:15",
        date: "2023-12-15"
      },
      arrival: {
        airport: "ADD",
        time: "14:30",
        date: "2023-12-15"
      },
      departure2: {
        airport: "ADD",
        time: "16:15",
        date: "2023-12-15"
      },
      arrival2: {
        airport: "JFK",
        time: "06:30",
        date: "2023-12-16"
      },
      duration: "16h 15m",
      stops: 1,
      price: 850,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Boeing 787",
      seatsLeft: 5
    },
    {
      id: "QR1432",
      airline: "qatar",
      flightNumber: "QR1432",
      departure: {
        airport: "ABV",
        time: "01:30",
        date: "2023-12-15"
      },
      arrival: {
        airport: "DOH",
        time: "08:45",
        date: "2023-12-15"
      },
      departure2: {
        airport: "DOH",
        time: "10:15",
        date: "2023-12-15"
      },
      arrival2: {
        airport: "CDG",
        time: "15:30",
        date: "2023-12-15"
      },
      duration: "14h 00m",
      stops: 1,
      price: 920,
      baggage: {
        cabin: 1,
        checked: 2
      },
      aircraft: "Boeing 777",
      seatsLeft: 15
    },
    {
      id: "BA75",
      airline: "british",
      flightNumber: "BA75",
      departure: {
        airport: "LOS",
        time: "23:15",
        date: "2023-12-15"
      },
      arrival: {
        airport: "LHR",
        time: "06:30",
        date: "2023-12-16"
      },
      duration: "7h 15m",
      stops: 0,
      price: 1100,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Boeing 787",
      seatsLeft: 6
    },
    {
      id: "TK623",
      airline: "turkish",
      flightNumber: "TK623",
      departure: {
        airport: "ABV",
        time: "13:45",
        date: "2023-12-15"
      },
      arrival: {
        airport: "IST",
        time: "20:30",
        date: "2023-12-15"
      },
      departure2: {
        airport: "IST",
        time: "22:15",
        date: "2023-12-15"
      },
      arrival2: {
        airport: "JFK",
        time: "03:30",
        date: "2023-12-16"
      },
      duration: "15h 45m",
      stops: 1,
      price: 880,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Boeing 777",
      seatsLeft: 10
    },
    {
      id: "AF443",
      airline: "airfrance",
      flightNumber: "AF443",
      departure: {
        airport: "LOS",
        time: "21:30",
        date: "2023-12-15"
      },
      arrival: {
        airport: "CDG",
        time: "05:15",
        date: "2023-12-16"
      },
      duration: "7h 45m",
      stops: 0,
      price: 1050,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Airbus A350",
      seatsLeft: 8
    },
    {
      id: "VS411",
      airline: "virgin",
      flightNumber: "VS411",
      departure: {
        airport: "LOS",
        time: "11:15",
        date: "2023-12-15"
      },
      arrival: {
        airport: "LHR",
        time: "18:30",
        date: "2023-12-15"
      },
      duration: "7h 15m",
      stops: 0,
      price: 1150,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Boeing 787",
      seatsLeft: 4
    },
    {
      id: "LH569",
      airline: "lufthansa",
      flightNumber: "LH569",
      departure: {
        airport: "ABV",
        time: "16:30",
        date: "2023-12-15"
      },
      arrival: {
        airport: "FRA",
        time: "23:15",
        date: "2023-12-15"
      },
      departure2: {
        airport: "FRA",
        time: "01:30",
        date: "2023-12-16"
      },
      arrival2: {
        airport: "JFK",
        time: "06:45",
        date: "2023-12-16"
      },
      duration: "15h 15m",
      stops: 1,
      price: 950,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Airbus A340",
      seatsLeft: 12
    },
    {
      id: "KQ532",
      airline: "kenya",
      flightNumber: "KQ532",
      departure: {
        airport: "LOS",
        time: "09:15",
        date: "2023-12-15"
      },
      arrival: {
        airport: "NBO",
        time: "14:30",
        date: "2023-12-15"
      },
      departure2: {
        airport: "NBO",
        time: "16:15",
        date: "2023-12-15"
      },
      arrival2: {
        airport: "JFK",
        time: "06:30",
        date: "2023-12-16"
      },
      duration: "16h 15m",
      stops: 1,
      price: 820,
      baggage: {
        cabin: 1,
        checked: 1
      },
      aircraft: "Boeing 787",
      seatsLeft: 7
    },
    {
      id: "QR577",
      airline: "qatar",
      flightNumber: "QR577",
      departure: {
        airport: "LOS",
        time: "02:15",
        date: "2023-12-15"
      },
      arrival: {
        airport: "DOH",
        time: "09:30",
        date: "2023-12-15"
      },
      departure2: {
        airport: "DOH",
        time: "11:15",
        date: "2023-12-15"
      },
      arrival2: {
        airport: "JFK",
        time: "18:30",
        date: "2023-12-15"
      },
      duration: "16h 15m",
      stops: 1,
      price: 920,
      baggage: {
        cabin: 1,
        checked: 2
      },
      aircraft: "Boeing 777",
      seatsLeft: 9
    },
    {
      id: "EK783",
      airline: "emirates",
      flightNumber: "EK783",
      departure: {
        airport: "ABV",
        time: "03:30",
        date: "2023-12-15"
      },
      arrival: {
        airport: "DXB",
        time: "11:15",
        date: "2023-12-15"
      },
      departure2: {
        airport: "DXB",
        time: "13:45",
        date: "2023-12-15"
      },
      arrival2: {
        airport: "LHR",
        time: "17:30",
        date: "2023-12-15"
      },
      duration: "14h 00m",
      stops: 1,
      price: 950,
      baggage: {
        cabin: 1,
        checked: 2
      },
      aircraft: "Airbus A380",
      seatsLeft: 6
    }
  ],
  airports: [
    { code: "LOS", name: "Murtala Muhammed International Airport", city: "Lagos" },
    { code: "ABV", name: "Nnamdi Azikiwe International Airport", city: "Abuja" },
    { code: "JFK", name: "John F. Kennedy International Airport", city: "New York" },
    { code: "LHR", name: "Heathrow Airport", city: "London" },
    { code: "DXB", name: "Dubai International Airport", city: "Dubai" },
    { code: "ADD", name: "Addis Ababa Bole International Airport", city: "Addis Ababa" },
    { code: "DOH", name: "Hamad International Airport", city: "Doha" },
    { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris" },
    { code: "IST", name: "Istanbul Airport", city: "Istanbul" },
    { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt" },
    { code: "NBO", name: "Jomo Kenyatta International Airport", city: "Nairobi" },
    { code: "ACC", name: "Kotoka International Airport", city: "Accra" },
    { code: "DSS", name: "Blaise Diagne International Airport", city: "Dakar" },
    { code: "JNB", name: "O.R. Tambo International Airport", city: "Johannesburg" },
    { code: "CAI", name: "Cairo International Airport", city: "Cairo" },
    { code: "RUH", name: "King Khalid International Airport", city: "Riyadh" }
  ]
};

// Currency conversion rates (with NGN as base)
const currencyRates = {
  NGN: 1,
  USD: 0.0013,
  GBP: 0.0010,
  EUR: 0.0012,
  AED: 0.0047,
  ZAR: 0.023,
  KES: 0.17,
  GHS: 0.015,
  XOF: 0.79,
  XAF: 0.79
};

// Search airports with regex
export const searchAirports = (query) => {
  if (!query || query.length < 2) return [];
  const regex = new RegExp(query, 'i');
  return flightsData.airports.filter(airport => 
    regex.test(airport.code) || 
    regex.test(airport.name) || 
    regex.test(airport.city)
    .slice(0, 5)); // Limit to 5 suggestions
};

// Enhanced fetchFlights with more filter options
export const fetchFlights = async (filters = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  let results = [...flightsData.flights];
  
  // Apply origin/destination filters if provided
  if (filters.origin) {
    const originRegex = new RegExp(filters.origin.replace(/\(.*\)/, '').trim(), 'i');
    results = results.filter(flight => 
      originRegex.test(flight.departure.airport) || 
      originRegex.test(flight.departure.airport));
  }
  
  if (filters.destination) {
    const destRegex = new RegExp(filters.destination.replace(/\(.*\)/, '').trim(), 'i');
    results = results.filter(flight => 
      destRegex.test(flight.arrival.airport) || 
      destRegex.test(flight.arrival.airport));
  }
  
  // Apply stop filters
  if (filters.stops && filters.stops.length > 0) {
    results = results.filter(flight => {
      if (filters.stops.includes('0') && flight.stops === 0) return true;
      if (filters.stops.includes('1') && flight.stops === 1) return true;
      if (filters.stops.includes('2') && flight.stops >= 2) return true;
      return false;
    });
  }
  
  // Apply airline filters
  if (filters.airlines && filters.airlines.length > 0) {
    results = results.filter(flight => filters.airlines.includes(flight.airline));
  }
  
  // Apply price filter
  if (filters.priceRange) {
    results = results.filter(flight => flight.price <= filters.priceRange);
  }
  
  // Apply departure time filter
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
  
  // Apply baggage filters
  if (filters.baggage && filters.baggage.length > 0) {
    results = results.filter(flight => {
      if (filters.baggage.includes('free') && flight.baggage.cabin > 0) return true;
      if (filters.baggage.includes('paid') && flight.baggage.checked > 0) return true;
      return false;
    });
  }
  
  // Apply class filter
  if (filters.class) {
    // In a real app, this would filter by actual cabin class availability
    // For demo, we'll just adjust prices
    results = results.map(flight => {
      const newFlight = {...flight};
      if (filters.class === 'premium') {
        newFlight.price = Math.round(flight.price * 1.3);
      } else if (filters.class === 'business') {
        newFlight.price = Math.round(flight.price * 2);
      } else if (filters.class === 'first') {
        newFlight.price = Math.round(flight.price * 3);
      }
      return newFlight;
    });
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
      const aDuration = convertDurationToMinutes(a.duration);
      const bDuration = convertDurationToMinutes(b.duration);
      const aScore = a.price * 0.7 + aDuration * 0.3;
      const bScore = b.price * 0.7 + bDuration * 0.3;
      return aScore - bScore;
    });
  }
  
  return results.slice(0, filters.limit || 6); // Default to 6 flights
};

const convertDurationToMinutes = (duration) => {
  const [hours, minutes] = duration.split('h ');
  return parseInt(hours) * 60 + parseInt(minutes.replace('m', ''));
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  const baseAmount = amount / currencyRates[fromCurrency];
  return baseAmount * currencyRates[toCurrency];
};

export const getAirlineInfo = (airlineCode) => {
  const airlines = {
    delta: {
      name: "Delta Airlines",
      logo: "delta.png",
      rating: 4.2
    },
    emirates: {
      name: "Emirates",
      logo: "emirates.png",
      rating: 4.5
    },
    ethiopian: {
      name: "Ethiopian Airlines",
      logo: "ethiopian.png",
      rating: 4.1
    },
    qatar: {
      name: "Qatar Airways",
      logo: "qatar.png",
      rating: 4.6
    },
    british: {
      name: "British Airways",
      logo: "british.png",
      rating: 4.3
    },
    turkish: {
      name: "Turkish Airlines",
      logo: "turkish.png",
      rating: 4.4
    },
    airfrance: {
      name: "Air France",
      logo: "airfrance.png",
      rating: 4.0
    },
    virgin: {
      name: "Virgin Atlantic",
      logo: "virgin.png",
      rating: 4.2
    },
    lufthansa: {
      name: "Lufthansa",
      logo: "lufthansa.png",
      rating: 4.1
    },
    kenya: {
      name: "Kenya Airways",
      logo: "kenya.png",
      rating: 3.9
    },
    rwandair: {
      name: "RwandAir",
      logo: "rwandair.png",
      rating: 3.8
    },
    arik: {
      name: "Arik Air",
      logo: "arik.png",
      rating: 3.5
    },
    airpeace: {
      name: "Air Peace",
      logo: "airpeace.png",
      rating: 3.7
    }
  };
  return airlines[airlineCode] || { name: airlineCode, logo: "airline.png", rating: 4.0 };
};