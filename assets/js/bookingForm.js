// Add Passenger Functionality
document.querySelector('.add-passenger').addEventListener('click', function () {
    const passengerSection = document.querySelector('.passenger-section');
    const passengerCount = document.querySelectorAll('.passenger').length + 1;

    const newPassenger = document.createElement('div');
    newPassenger.classList.add('passenger');
    newPassenger.id = `passenger-${passengerCount}`;
    newPassenger.innerHTML = `
        <h2>Passenger ${passengerCount}</h2>
        <div class="form-group">
            <div class="input-group">
                <label>First name</label>
                <input type="text" placeholder="John">
            </div>
            <div class="input-group">
                <label>Last name</label>
                <input type="text" placeholder="Smith">
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <label>Gender</label>
                <div class="radio-group">
                    <label><input type="radio" name="gender-${passengerCount}" value="male"> Male</label>
                    <label><input type="radio" name="gender-${passengerCount}" value="female"> Female</label>
                </div>
            </div>
            <div class="input-group">
                <label>Birth date</label>
                <input type="text" placeholder="DD.MM.YYYY">
            </div>
            <div class="input-group">
                <label>Citizenship</label>
                <select>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Ukraine">Ukraine</option>
                </select>
            </div>
        </div>
        <div class="checkbox-group">
            <label>
                <input type="checkbox">
                I'm a member of frequent flyer program
            </label>
        </div>
        <button class="remove-passenger">Remove Passenger</button>
    `;
    passengerSection.appendChild(newPassenger);
});

// Remove Passenger Functionality
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-passenger')) {
        const passenger = e.target.closest('.passenger');
        if (document.querySelectorAll('.passenger').length > 1) {
            passenger.remove();
        }
    }
});