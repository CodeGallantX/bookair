document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const passengerSection = document.getElementById('passenger-section');
    const addPassengerBtn = document.querySelector('.add-passenger');
    const continueBtn = document.getElementById('continue-btn');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const receiveOffersCheckbox = document.getElementById('receive-offers');
    const rememberContactsCheckbox = document.getElementById('remember-contacts');

    // Load saved data from localStorage
    loadSavedData();

    // Initialize with first passenger
    addPassenger(1);

    // Add Passenger Functionality
    addPassengerBtn.addEventListener('click', function() {
        const passengerCount = document.querySelectorAll('.passenger').length + 1;
        addPassenger(passengerCount);
        showToast(`Passenger ${passengerCount} added`, 'success');
    });

    // Remove Passenger Functionality
    passengerSection.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-passenger')) {
            const passenger = e.target.closest('.passenger');
            if (document.querySelectorAll('.passenger').length > 1) {
                passenger.remove();
                showToast('Passenger removed', 'success');
                // Update passenger numbers after removal
                updatePassengerNumbers();
            } else {
                showToast('At least one passenger is required', 'error');
            }
        }
    });

    // Continue Button Functionality
    continueBtn.addEventListener('click', function() {
        if (validateForm()) {
            showToast('Saving passenger details...');
            saveDataToLocalStorage();
            
            // Simulate processing delay
            setTimeout(() => {
                showToast('Details saved successfully!', 'success');
                // Navigate to payment page after a delay
                setTimeout(() => {
                    window.location.href = 'payment.html';
                }, 1500);
            }, 1000);
        }
    });

    // Function to add a new passenger
    function addPassenger(number) {
        const passengerDiv = document.createElement('div');
        passengerDiv.classList.add('passenger');
        passengerDiv.id = `passenger-${number}`;
        passengerDiv.innerHTML = `
            <h2>Passenger ${number}</h2>
            <p class="info-text">
                <span class="info-icon">i</span>
                The main booker must be at least 18 years of age. For travelers under the age of 16, guidance is usually required.
            </p>
            <div class="form-group">
                <div class="input-group">
                    <label for="first-name-${number}">First name</label>
                    <input type="text" id="first-name-${number}" placeholder="John" required>
                </div>
                <div class="input-group">
                    <label for="last-name-${number}">Last name</label>
                    <input type="text" id="last-name-${number}" placeholder="Smith" required>
                </div>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <label>Gender</label>
                    <div class="radio-group">
                        <label><input type="radio" name="gender-${number}" value="male" required> Male</label>
                        <label><input type="radio" name="gender-${number}" value="female"> Female</label>
                    </div>
                </div>
                <div class="input-group">
                    <label for="birth-date-${number}">Birth date</label>
                    <input type="date" id="birth-date-${number}" required>
                </div>
                <div class="input-group">
                    <label for="citizenship-${number}">Citizenship</label>
                    <select id="citizenship-${number}" required>
                        <option value="" disabled selected>Select your country</option>
                        <option value="USA">USA</option>
                        <option value="UK">United Kingdom</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Canada">Canada</option>
                    </select>
                </div>
            </div>
            <div class="checkbox-group">
                <label>
                    <input type="checkbox" id="frequent-flyer-${number}">
                    I'm a member of frequent flyer program
                </label>
            </div>
            <button type="button" class="remove-passenger">
                <i class="fas fa-user-minus"></i>
                Remove Passenger
            </button>
        `;
        passengerSection.appendChild(passengerDiv);
    }

    // Function to update passenger numbers after removal
    function updatePassengerNumbers() {
        const passengers = document.querySelectorAll('.passenger');
        passengers.forEach((passenger, index) => {
            const passengerNumber = index + 1;
            passenger.id = `passenger-${passengerNumber}`;
            passenger.querySelector('h2').textContent = `Passenger ${passengerNumber}`;
            
            // Update all IDs within the passenger div
            const inputs = passenger.querySelectorAll('input, select');
            inputs.forEach(input => {
                const oldId = input.id;
                if (oldId) {
                    const newId = oldId.replace(/-\d+$/, `-${passengerNumber}`);
                    input.id = newId;
                }
            });
        });
    }

    // Function to validate the form
    function validateForm() {
        // Validate contact information
        if (!phoneInput.value.trim()) {
            showToast('Please enter a phone number', 'error');
            phoneInput.focus();
            return false;
        }

        if (!emailInput.value.trim()) {
            showToast('Please enter an email address', 'error');
            emailInput.focus();
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showToast('Please enter a valid email address', 'error');
            emailInput.focus();
            return false;
        }

        // Validate each passenger
        const passengers = document.querySelectorAll('.passenger');
        for (const passenger of passengers) {
            const firstName = passenger.querySelector('input[type="text"]').value.trim();
            const lastName = passenger.querySelectorAll('input[type="text"]')[1].value.trim();
            const gender = passenger.querySelector('input[type="radio"]:checked');
            const birthDate = passenger.querySelector('input[type="date"]').value;
            const citizenship = passenger.querySelector('select').value;

            if (!firstName) {
                showToast('Please enter first name for all passengers', 'error');
                return false;
            }

            if (!lastName) {
                showToast('Please enter last name for all passengers', 'error');
                return false;
            }

            if (!gender) {
                showToast('Please select gender for all passengers', 'error');
                return false;
            }

            if (!birthDate) {
                showToast('Please enter birth date for all passengers', 'error');
                return false;
            }

            if (!citizenship) {
                showToast('Please select citizenship for all passengers', 'error');
                return false;
            }
        }

        return true;
    }

    // Function to save data to localStorage
    function saveDataToLocalStorage() {
        const bookingData = {
            contact: {
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                receiveOffers: receiveOffersCheckbox.checked,
                rememberContacts: rememberContactsCheckbox.checked
            },
            passengers: []
        };

        // Get data for each passenger
        document.querySelectorAll('.passenger').forEach(passenger => {
            const passengerData = {
                firstName: passenger.querySelector('input[type="text"]').value.trim(),
                lastName: passenger.querySelectorAll('input[type="text"]')[1].value.trim(),
                gender: passenger.querySelector('input[type="radio"]:checked').value,
                birthDate: passenger.querySelector('input[type="date"]').value,
                citizenship: passenger.querySelector('select').value,
                frequentFlyer: passenger.querySelector('input[type="checkbox"]').checked
            };
            bookingData.passengers.push(passengerData);
        });

        // Save to localStorage
        localStorage.setItem('skylink_booking_data', JSON.stringify(bookingData));

        // If "remember contacts" is checked, save just the contact info separately
        if (rememberContactsCheckbox.checked) {
            localStorage.setItem('skylink_contact_info', JSON.stringify({
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim()
            }));
        }
    }

    // Function to load saved data from localStorage
    function loadSavedData() {
        // Load contact info if available
        const savedContactInfo = localStorage.getItem('skylink_contact_info');
        if (savedContactInfo) {
            const contactInfo = JSON.parse(savedContactInfo);
            phoneInput.value = contactInfo.phone;
            emailInput.value = contactInfo.email;
            rememberContactsCheckbox.checked = true;
        }

        // Load full booking data if available
        const savedBookingData = localStorage.getItem('skylink_booking_data');
        if (savedBookingData) {
            const bookingData = JSON.parse(savedBookingData);
            
            // Set contact info
            phoneInput.value = bookingData.contact.phone;
            emailInput.value = bookingData.contact.email;
            receiveOffersCheckbox.checked = bookingData.contact.receiveOffers;
            rememberContactsCheckbox.checked = bookingData.contact.rememberContacts;

            // Clear existing passengers except the first one
            const existingPassengers = document.querySelectorAll('.passenger');
            for (let i = 1; i < existingPassengers.length; i++) {
                existingPassengers[i].remove();
            }

            // Set data for first passenger
            if (bookingData.passengers.length > 0) {
                const firstPassenger = bookingData.passengers[0];
                document.getElementById('first-name-1').value = firstPassenger.firstName;
                document.getElementById('last-name-1').value = firstPassenger.lastName;
                document.querySelector(`input[name="gender-1"][value="${firstPassenger.gender}"]`).checked = true;
                document.getElementById('birth-date-1').value = firstPassenger.birthDate;
                document.getElementById('citizenship-1').value = firstPassenger.citizenship;
                document.getElementById('frequent-flyer-1').checked = firstPassenger.frequentFlyer;
            }

            // Add additional passengers if any
            for (let i = 1; i < bookingData.passengers.length; i++) {
                const passengerData = bookingData.passengers[i];
                const passengerNumber = i + 1;
                addPassenger(passengerNumber);
                
                // Set values for the new passenger
                document.getElementById(`first-name-${passengerNumber}`).value = passengerData.firstName;
                document.getElementById(`last-name-${passengerNumber}`).value = passengerData.lastName;
                document.querySelector(`input[name="gender-${passengerNumber}"][value="${passengerData.gender}"]`).checked = true;
                document.getElementById(`birth-date-${passengerNumber}`).value = passengerData.birthDate;
                document.getElementById(`citizenship-${passengerNumber}`).value = passengerData.citizenship;
                document.getElementById(`frequent-flyer-${passengerNumber}`).checked = passengerData.frequentFlyer;
            }
        }
    }

    // Function to show toast messages
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <div class="message">${message}</div>
            </div>
            <button class="close-btn">&times;</button>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
        
        // Close button
        toast.querySelector('.close-btn').addEventListener('click', function() {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
    }
});