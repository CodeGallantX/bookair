document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const passengerSection = document.getElementById('passenger-section');
    const addPassengerBtn = document.querySelector('.add-passenger');
    const continueBtn = document.getElementById('continue-btn');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const zipInput = document.getElementById('zip');
    const countryInput = document.getElementById('country');
    const emergencyContactInput = document.getElementById('emergency-contact');
    const receiveOffersCheckbox = document.getElementById('receive-offers');
    const rememberContactsCheckbox = document.getElementById('remember-contacts');
    const termsAgreementCheckbox = document.getElementById('terms-agreement');
    const mealPreferenceInput = document.getElementById('meal-preference');
    const seatPreferenceInput = document.getElementById('seat-preference');
    const specialRequestsInput = document.getElementById('special-requests');
    const savePaymentCheckbox = document.getElementById('save-payment');
    
    // Luggage Form Elements
    const luggageForm = document.getElementById('luggageForm');
    const luggageTagSection = document.getElementById('luggageTag');

    // Load saved data from localStorage
    loadSavedData();

    // Initialize with first passenger
    addPassenger(1, 'Adult');

    // Add Passenger Functionality
    addPassengerBtn.addEventListener('click', function() {
        const passengerCount = document.querySelectorAll('.passenger').length + 1;
        // In a real app, you might have a modal to select passenger type
        addPassenger(passengerCount, 'Adult');
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
            showToast('Saving booking details...');
            saveDataToLocalStorage();
            
            // Simulate processing delay
            setTimeout(() => {
                showToast('Booking details saved successfully!', 'success');
                // Navigate to payment page after a delay
                setTimeout(() => {
                    window.location.href = 'payment.html';
                }, 1500);
            }, 1000);
        }
    });

    // Luggage Form Submission
    luggageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('passengerName').value;
        const ref = document.getElementById('bookingRef').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const dimensions = document.getElementById('dimensions').value;
        const flightTime = document.getElementById('flightTime').value;
        const from = document.getElementById('origin').value;
        const to = document.getElementById('destination').value;
        const travelMode = document.getElementById('travelMode').value;
        
        // Validate luggage weight
        if (weight > 32) {
            showToast("Luggage exceeds 32kg limit. Please split or use cargo.", 'error');
            return;
        } else if (weight > 23 && travelMode === "withPassenger") {
            showToast("Overweight! Extra charges may apply.", 'warning');
        }
        
        // Format flight time for display
        const formattedTime = new Date(flightTime).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Generate and display luggage tag
        document.getElementById('tagId').textContent = 'TAG-' + Math.floor(Math.random() * 1000000);
        document.getElementById('tagName').textContent = name;
        document.getElementById('tagRef').textContent = ref;
        document.getElementById('tagTime').textContent = formattedTime;
        document.getElementById('tagFrom').textContent = from;
        document.getElementById('tagTo').textContent = to;
        document.getElementById('tagWeight').textContent = weight;
        document.getElementById('tagDimensions').textContent = dimensions;
        
        luggageTagSection.style.display = 'block';
        luggageTagSection.scrollIntoView({ behavior: 'smooth' });
        
        showToast('Luggage registered and tagged successfully!', 'success');
    });

    // Function to add a new passenger
    function addPassenger(number, type = 'Adult') {
        const passengerDiv = document.createElement('div');
        passengerDiv.classList.add('passenger');
        passengerDiv.id = `passenger-${number}`;
        passengerDiv.innerHTML = `
            <span class="passenger-type-badge">${type}</span>
            <h2>Passenger ${number}</h2>
            <p class="info-text">
                <span class="info-icon">i</span>
                Please provide accurate information as it appears on travel documents.
            </p>
            <div class="form-group">
                <div class="input-group">
                    <label for="first-name-${number}" class="required">First name</label>
                    <input type="text" id="first-name-${number}" placeholder="John" required>
                </div>
                <div class="input-group">
                    <label for="last-name-${number}" class="required">Last name</label>
                    <input type="text" id="last-name-${number}" placeholder="Smith" required>
                </div>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <label for="middle-name-${number}">Middle name</label>
                    <input type="text" id="middle-name-${number}" placeholder="(Optional)">
                </div>
                <div class="input-group">
                    <label class="required">Gender</label>
                    <div class="radio-group">
                        <label><input type="radio" name="gender-${number}" value="male" required> Male</label>
                        <label><input type="radio" name="gender-${number}" value="female"> Female</label>
                        <label><input type="radio" name="gender-${number}" value="other"> Other</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <label for="birth-date-${number}" class="required">Date of Birth</label>
                    <input type="date" id="birth-date-${number}" required>
                </div>
                <div class="input-group">
                    <label for="nationality-${number}" class="required">Nationality</label>
                    <select id="nationality-${number}" required>
                        <option value="" disabled selected>Select nationality</option>
                        <option value="NG">Nigeria</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="GH">Ghana</option>
                        <option value="SA">South Africa</option>
                        <option value="KE">Kenya</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <label for="passport-${number}">Passport Number</label>
                    <input type="text" id="passport-${number}" placeholder="A12345678">
                </div>
                <div class="input-group">
                    <label for="passport-expiry-${number}">Passport Expiry</label>
                    <input type="date" id="passport-expiry-${number}">
                </div>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <label for="frequent-flyer-${number}">Frequent Flyer Program</label>
                    <select id="frequent-flyer-program-${number}">
                        <option value="" selected>None</option>
                        <option value="skyLink-elite">SkyLink Elite</option>
                        <option value="skyLink-plus">SkyLink Plus</option>
                        <option value="other">Other Program</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="frequent-flyer-number-${number}">Membership Number</label>
                    <input type="text" id="frequent-flyer-number-${number}" placeholder="FF12345678">
                </div>
            </div>
            <div class="checkbox-group">
                <label>
                    <input type="checkbox" id="needs-assistance-${number}">
                    This passenger requires special assistance
                </label>
            </div>
            <button type="button" class="remove-passenger">
                <i class="fas fa-user-minus"></i>
                Remove Passenger
            </button>
        `;
        passengerSection.appendChild(passengerDiv);
        
        // Scroll to the new passenger
        setTimeout(() => {
            passengerDiv.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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

            // Update radio button names
            const radios = passenger.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                const oldName = radio.name;
                if (oldName) {
                    const newName = oldName.replace(/-\d+$/, `-${passengerNumber}`);
                    radio.name = newName;
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

        // Validate terms agreement
        if (!termsAgreementCheckbox.checked) {
            showToast('You must agree to the Terms & Conditions to continue', 'error');
            termsAgreementCheckbox.focus();
            return false;
        }

        // Validate each passenger
        const passengers = document.querySelectorAll('.passenger');
        for (const passenger of passengers) {
            const firstName = passenger.querySelector('input[type="text"]').value.trim();
            const lastName = passenger.querySelectorAll('input[type="text"]')[1].value.trim();
            const gender = passenger.querySelector('input[type="radio"]:checked');
            const birthDate = passenger.querySelector('input[type="date"]').value;
            const nationality = passenger.querySelector('select').value;

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

            if (!nationality) {
                showToast('Please select nationality for all passengers', 'error');
                return false;
            }

            // Validate age if this is an adult passenger
            const passengerType = passenger.querySelector('.passenger-type-badge').textContent;
            if (passengerType === 'Adult') {
                const birthDateObj = new Date(birthDate);
                const today = new Date();
                let age = today.getFullYear() - birthDateObj.getFullYear();
                const monthDiff = today.getMonth() - birthDateObj.getMonth();
                
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
                    age--;
                }
                
                if (age < 18) {
                    showToast('Adult passengers must be at least 18 years old', 'error');
                    return false;
                }
            }
        }

        return true;
    }

    // Function to save data to localStorage
    function saveDataToLocalStorage() {
        const bookingData = {
            bookingReference: document.getElementById('booking-reference').textContent,
            contact: {
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                address: addressInput.value.trim(),
                city: cityInput.value.trim(),
                state: stateInput.value.trim(),
                zip: zipInput.value.trim(),
                country: countryInput.value,
                emergencyContact: emergencyContactInput.value.trim(),
                receiveOffers: receiveOffersCheckbox.checked,
                rememberContacts: rememberContactsCheckbox.checked
            },
            preferences: {
                mealPreference: mealPreferenceInput.value,
                seatPreference: seatPreferenceInput.value,
                specialRequests: specialRequestsInput.value.trim(),
                savePayment: savePaymentCheckbox.checked
            },
            passengers: [],
            termsAgreed: termsAgreementCheckbox.checked,
            timestamp: new Date().toISOString()
        };

        // Get data for each passenger
        document.querySelectorAll('.passenger').forEach(passenger => {
            const passengerData = {
                type: passenger.querySelector('.passenger-type-badge').textContent,
                firstName: passenger.querySelector('input[type="text"]').value.trim(),
                lastName: passenger.querySelectorAll('input[type="text"]')[1].value.trim(),
                middleName: passenger.querySelectorAll('input[type="text"]')[2].value.trim(),
                gender: passenger.querySelector('input[type="radio"]:checked').value,
                birthDate: passenger.querySelector('input[type="date"]').value,
                nationality: passenger.querySelector('select').value,
                passportNumber: passenger.querySelectorAll('input[type="text"]')[3].value.trim(),
                passportExpiry: passenger.querySelectorAll('input[type="date"]')[1].value,
                frequentFlyerProgram: passenger.querySelectorAll('select')[1].value,
                frequentFlyerNumber: passenger.querySelectorAll('input[type="text"]')[4].value.trim(),
                needsAssistance: passenger.querySelector('input[type="checkbox"]').checked
            };
            bookingData.passengers.push(passengerData);
        });

        // Save to localStorage
        localStorage.setItem('skylink_booking_data', JSON.stringify(bookingData));

        // If "remember contacts" is checked, save just the contact info separately
        if (rememberContactsCheckbox.checked) {
            localStorage.setItem('skylink_contact_info', JSON.stringify({
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                address: addressInput.value.trim(),
                city: cityInput.value.trim(),
                state: stateInput.value.trim(),
                zip: zipInput.value.trim(),
                country: countryInput.value
            }));
        }
    }

    // Function to load saved data from localStorage
    function loadSavedData() {
        // Load contact info if available
        const savedContactInfo = localStorage.getItem('skylink_contact_info');
        if (savedContactInfo) {
            const contactInfo = JSON.parse(savedContactInfo);
            phoneInput.value = contactInfo.phone || '';
            emailInput.value = contactInfo.email || '';
            addressInput.value = contactInfo.address || '';
            cityInput.value = contactInfo.city || '';
            stateInput.value = contactInfo.state || '';
            zipInput.value = contactInfo.zip || '';
            countryInput.value = contactInfo.country || 'NG';
            rememberContactsCheckbox.checked = true;
        }

        // Load full booking data if available
        const savedBookingData = localStorage.getItem('skylink_booking_data');
        if (savedBookingData) {
            const bookingData = JSON.parse(savedBookingData);
            
            // Set contact info
            phoneInput.value = bookingData.contact.phone || '';
            emailInput.value = bookingData.contact.email || '';
            addressInput.value = bookingData.contact.address || '';
            cityInput.value = bookingData.contact.city || '';
            stateInput.value = bookingData.contact.state || '';
            zipInput.value = bookingData.contact.zip || '';
            countryInput.value = bookingData.contact.country || 'NG';
            emergencyContactInput.value = bookingData.contact.emergencyContact || '';
            receiveOffersCheckbox.checked = bookingData.contact.receiveOffers || false;
            rememberContactsCheckbox.checked = bookingData.contact.rememberContacts || false;
            
            // Set preferences
            mealPreferenceInput.value = bookingData.preferences.mealPreference || '';
            seatPreferenceInput.value = bookingData.preferences.seatPreference || '';
            specialRequestsInput.value = bookingData.preferences.specialRequests || '';
            savePaymentCheckbox.checked = bookingData.preferences.savePayment || false;
            
            // Set terms agreement
            termsAgreementCheckbox.checked = bookingData.termsAgreed || false;
            
            // Clear existing passengers and add saved ones
            passengerSection.innerHTML = '';
            bookingData.passengers.forEach((passenger, index) => {
                addPassenger(index + 1, passenger.type);
                
                // Fill passenger data
                const passengerDiv = document.getElementById(`passenger-${index + 1}`);
                passengerDiv.querySelector(`#first-name-${index + 1}`).value = passenger.firstName;
                passengerDiv.querySelector(`#last-name-${index + 1}`).value = passenger.lastName;
                passengerDiv.querySelector(`#middle-name-${index + 1}`).value = passenger.middleName;
                
                // Set gender radio button
                const genderRadio = passengerDiv.querySelector(`input[name="gender-${index + 1}"][value="${passenger.gender}"]`);
                if (genderRadio) genderRadio.checked = true;
                
                passengerDiv.querySelector(`#birth-date-${index + 1}`).value = passenger.birthDate;
                passengerDiv.querySelector(`#nationality-${index + 1}`).value = passenger.nationality;
                passengerDiv.querySelector(`#passport-${index + 1}`).value = passenger.passportNumber;
                passengerDiv.querySelector(`#passport-expiry-${index + 1}`).value = passenger.passportExpiry;
                passengerDiv.querySelector(`#frequent-flyer-program-${index + 1}`).value = passenger.frequentFlyerProgram;
                passengerDiv.querySelector(`#frequent-flyer-number-${index + 1}`).value = passenger.frequentFlyerNumber;
                passengerDiv.querySelector(`#needs-assistance-${index + 1}`).checked = passenger.needsAssistance;
            });
        }
    }

    // Function to show toast notifications
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Show the toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            
            // Remove after animation completes
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
});