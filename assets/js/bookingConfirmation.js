document.addEventListener('DOMContentLoaded', function () {
    // Generate barcode
    JsBarcode("#barcode", "MX567Y9-BOOKAIR-2023", {
        format: "CODE128",
        lineColor: "#2c3e50",
        width: 2,
        height: 60,
        displayValue: true,
        fontSize: 14,
        margin: 10
    });

    // Download ticket as image
    document.getElementById('downloadTicket').addEventListener('click', function () {
        const ticketElement = document.getElementById('ticketToDownload');

        html2canvas(ticketElement).then(canvas => {
            const link = document.createElement('a');
            link.download = 'BookAir-Ticket-MX567Y9.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    // Share modal functionality
    const shareModal = document.getElementById('shareModal');
    const shareBtn = document.getElementById('shareBooking');
    const closeModalBtn = document.querySelector('.close-modal');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const shareUrlInput = document.getElementById('shareUrl');

    shareBtn.addEventListener('click', function () {
        shareModal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', function () {
        shareModal.style.display = 'none';
    });

    // Close modal when clicking outside
    shareModal.addEventListener('click', function (e) {
        if (e.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });

    // Copy link functionality
    copyLinkBtn.addEventListener('click', function () {
        shareUrlInput.select();
        document.execCommand('copy');

        // Show copied feedback
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<i class="fas fa-check"></i>';

        setTimeout(() => {
            copyLinkBtn.innerHTML = originalText;
        }, 2000);
    });

    // Share options functionality
    document.querySelectorAll('.share-option').forEach(option => {
        option.addEventListener('click', function () {
            const service = this.getAttribute('data-service');
            const url = encodeURIComponent(shareUrlInput.value);
            const text = encodeURIComponent("Check out my BookAir flight booking!");

            switch (service) {
                case 'copy':
                    shareUrlInput.select();
                    document.execCommand('copy');
                    break;
                case 'gmail':
                    window.open(`https://mail.google.com/mail/?view=cm&su=My%20BookAir%20Booking&body=${text}%0A%0A${url}`);
                    break;
                case 'whatsapp':
                    window.open(`https://wa.me/?text=${text}%20${url}`);
                    break;
                case 'facebook':
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
                    break;
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
                    break;
            }
        });
    });

    // Check-in button functionality
    document.getElementById('checkInBtn').addEventListener('click', function () {
        // Store booking reference in session storage
        sessionStorage.setItem('currentBooking', 'MX567Y9');

        // Redirect to check-in page
        window.location.href = './check-in.html';
    });

    // Close alert functionality
    document.querySelector('.close-alert').addEventListener('click', function () {
        document.getElementById('successAlert').style.display = 'none';
    });
});