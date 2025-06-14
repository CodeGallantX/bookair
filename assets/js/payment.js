const cardholderName = document.getElementById('cardholderName')
const expiryDate = document.getElementById('expiryDate')

document.querySelector('input[placeholder="1111 2222 3333 4444"]').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\s+/g, '');
    if (value.length > 0) {
        value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    e.target.value = value;

    // Update card preview
    if (value) {
        const lastFour = value.slice(-4);
        const masked = '•••• •••• •••• ' + (lastFour.length === 4 ? lastFour : '••••');
        document.querySelector('.card-preview .card-number').textContent = masked;
    } else {
        document.querySelector('.card-preview .card-number').textContent = '•••• •••• •••• 4444';
    }
});

// Update cardholder name in preview
document.querySelector('input[placeholder="Aliko Dangote"]').addEventListener('input', function (e) {
    // const name = e.target.value.toUpperCase() || 'ALIKO DANGOTE ';
    const cardholderName = e.target.value.toUpperCase() || 'ALIKO DANGOTE ';
    document.querySelector('.card-preview .card-details div:first-child div:last-child').textContent = name;
});

// Update expiry date in preview
document.querySelector('input[placeholder="MM/YY"]').addEventListener('input', function (e) {
    const expiryDate = e.target.value || '11/22';
    document.querySelector('.card-preview .card-details div:last-child div:last-child').textContent = expiry;
});

function navigate(page) {
    console.log(`Navigating to ${page}`);
    window.location.href = "./check-in.html"
}