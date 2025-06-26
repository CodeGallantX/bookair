document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const cardNumberInput = document.getElementById('cardNumberInput');
    const expiryDateInput = document.getElementById('expiryDateInput');
    const cvvInput = document.getElementById('cvvInput');
    const cardholderNameInput = document.getElementById('cardholderNameInput');
    const rememberCard = document.getElementById('rememberCard');
    const payNowBtn = document.getElementById('payNowBtn');
    const paymentMethodRadios = document.querySelectorAll('.payment-method-radio');
    const creditCardContainer = document.getElementById('credit-card-container');
    const paypalContainer = document.getElementById('paypal-container');
    const receiptModal = document.getElementById('receiptModal');
    const closeReceiptBtn = document.getElementById('closeReceiptBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const downloadImgBtn = document.getElementById('downloadImgBtn');
    const shareReceiptBtn = document.getElementById('shareReceiptBtn');
    const generateTicketBtn = document.getElementById('generateTicketBtn');
    const cardPreview = document.getElementById('cardPreview');

    // Initialize PayPal SDK (use your actual client ID in production)
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '210000',
                        currency_code: 'NGN'
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                showToast('Payment completed successfully!');
                generateReceipt('PayPal', details.id);
                savePaymentData({
                    method: 'paypal',
                    transactionId: details.id,
                    amount: 210000,
                    currency: 'NGN'
                });
            });
        },
        onError: function(err) {
            showToast('Payment failed: ' + err.message, true);
        }
    }).render('#paypal-button-container');

    // Load saved data from localStorage
    loadSavedData();

    // Payment method toggle
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'paypal') {
                creditCardContainer.style.display = 'none';
                paypalContainer.classList.add('active');
            } else {
                creditCardContainer.style.display = 'block';
                paypalContainer.classList.remove('active');
            }
        });
    });

    // Card number input formatting and card type detection
    cardNumberInput.addEventListener('input', function(e) {
        // Format with spaces every 4 digits
        let value = e.target.value.replace(/\s+/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        e.target.value = value;
        
        // Update card preview
        updateCardPreview();
        
        // Detect card type
        detectCardType(value.replace(/\s/g, ''));
    });

    // Expiry date formatting
    expiryDateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
        updateCardPreview();
    });

    // Cardholder name input
    cardholderNameInput.addEventListener('input', function() {
        updateCardPreview();
    });

    // CVV input
    cvvInput.addEventListener('input', function() {
        // Just validate length
        if (this.value.length > 4) {
            this.value = this.value.substring(0, 4);
        }
    });

    // Pay now button
    payNowBtn.addEventListener('click', function() {
        if (document.querySelector('input[name="payment-method"]:checked').value === 'card') {
            // Validate card payment
            if (validateCardPayment()) {
                processCardPayment();
            }
        }
        // PayPal payments are handled by their SDK
    });

    // Close receipt modal
    closeReceiptBtn.addEventListener('click', function() {
        receiptModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    receiptModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Download PDF button
    downloadPdfBtn.addEventListener('click', function() {
        generatePdf();
    });

    // Download Image button
    downloadImgBtn.addEventListener('click', function() {
        generateImage();
    });

    // Share receipt button
    shareReceiptBtn.addEventListener('click', function() {
        shareReceipt();
    });

    // Generate ticket button
    generateTicketBtn.addEventListener('click', function() {
        window.location.href = 'booking-success.html';
    });

    function updateCardPreview() {
        // Update card number preview
        const cardNumber = cardNumberInput.value;
        if (cardNumber) {
            const lastFour = cardNumber.slice(-4);
            const masked = cardNumber.length > 4 
                ? '•••• •••• •••• ' + (lastFour.length === 4 ? lastFour : '••••')
                : cardNumber + '•••• •••• ••••'.slice(cardNumber.length);
            document.getElementById('cardNumberPreview').textContent = masked;
        } else {
            document.getElementById('cardNumberPreview').textContent = '•••• •••• •••• ••••';
        }
        
        // Update expiry date preview
        const expiryDate = expiryDateInput.value;
        document.getElementById('expiryDatePreview').textContent = expiryDate || '••/••';
        
        // Update cardholder name preview
        const cardholderName = cardholderNameInput.value;
        document.getElementById('cardholderNamePreview').textContent = cardholderName 
            ? cardholderName.toUpperCase() 
            : 'CARDHOLDER NAME';
    }

    function detectCardType(cardNumber) {
        if (!cardNumber) {
            cardPreview.className = 'card-preview';
            document.getElementById('cardCompany').textContent = '';
            return;
        }
        
        // Visa
        if (/^4/.test(cardNumber)) {
            cardPreview.className = 'card-preview visa';
            document.getElementById('cardCompany').textContent = 'VISA';
        } 
        // Mastercard
        else if (/^5[1-5]/.test(cardNumber)) {
            cardPreview.className = 'card-preview mastercard';
            document.getElementById('cardCompany').textContent = 'MASTERCARD';
        }
        // Verve (Nigerian cards)
        else if (/^506[0-1]/.test(cardNumber) || /^650/.test(cardNumber)) {
            cardPreview.className = 'card-preview verve';
            document.getElementById('cardCompany').textContent = 'VERVE';
        }
        // American Express
        else if (/^3[47]/.test(cardNumber)) {
            cardPreview.className = 'card-preview amex';
            document.getElementById('cardCompany').textContent = 'AMEX';
        }
        // Discover
        else if (/^6(?:011|5)/.test(cardNumber)) {
            cardPreview.className = 'card-preview discover';
            document.getElementById('cardCompany').textContent = 'DISCOVER';
        }
        // Default
        else {
            cardPreview.className = 'card-preview';
            document.getElementById('cardCompany').textContent = '';
        }
    }

    function validateCardPayment() {
        // Validate card number (simple Luhn check)
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        if (!cardNumber || cardNumber.length < 13 || !luhnCheck(cardNumber)) {
            showToast('Please enter a valid card number', true);
            return false;
        }
        
        // Validate expiry date
        const expiryDate = expiryDateInput.value;
        if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
            showToast('Please enter a valid expiry date (MM/YY)', true);
            return false;
        }
        
        // Validate CVV
        const cvv = cvvInput.value;
        if (!cvv || cvv.length < 3) {
            showToast('Please enter a valid CVV code', true);
            return false;
        }
        
        // Validate cardholder name
        const cardholderName = cardholderNameInput.value;
        if (!cardholderName || cardholderName.length < 3) {
            showToast('Please enter cardholder name', true);
            return false;
        }
        
        return true;
    }

    function luhnCheck(cardNumber) {
        let sum = 0;
        let shouldDouble = false;
        
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));
            
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        
        return (sum % 10) === 0;
    }

    function processCardPayment() {
        // In a real app, you would send this to your payment processor
        showToast('Processing payment...');
        
        // Simulate payment processing
        setTimeout(() => {
            showToast('Payment completed successfully!');
            
            // Generate receipt
            generateReceipt('Credit Card', generateTransactionId());
            
            // Save payment data if "Remember card" is checked
            if (rememberCard.checked) {
                savePaymentData({
                    method: 'card',
                    cardNumber: cardNumberInput.value,
                    expiryDate: expiryDateInput.value,
                    cardholderName: cardholderNameInput.value,
                    amount: 210000,
                    currency: 'NGN'
                });
            }
        }, 2000);
    }

    function generateReceipt(paymentMethod, transactionId) {
        // Get current date and time
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const dateTimeStr = now.toLocaleDateString('en-US', options);
        
        // Update receipt content
        document.getElementById('receiptDateTime').textContent = dateTimeStr;
        document.getElementById('receiptTransactionId').textContent = transactionId;
        document.getElementById('receiptPaymentMethod').textContent = paymentMethod;
        document.getElementById('receiptTotalAmount').textContent = '₦210,000';
        
        // Show receipt modal
        receiptModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function generateTransactionId() {
        return 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    function savePaymentData(data) {
        localStorage.setItem('skylink_payment_data', JSON.stringify(data));
    }

    function loadSavedData() {
        const savedData = localStorage.getItem('skylink_payment_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            if (data.method === 'card') {
                cardNumberInput.value = data.cardNumber;
                expiryDateInput.value = data.expiryDate;
                cardholderNameInput.value = data.cardholderName;
                
                // Update preview
                updateCardPreview();
                detectCardType(data.cardNumber.replace(/\s/g, ''));
            }
        }
    }

    function generatePdf() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add logo and title
        doc.setFontSize(20);
        doc.setTextColor(39, 52, 105);
        doc.text('SkyLink', 105, 20, { align: 'center' });
        doc.setFontSize(16);
        doc.text('Payment Receipt', 105, 30, { align: 'center' });
        
        // Add receipt details
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        // Transaction details
        doc.text('Transaction Details:', 14, 45);
        doc.text(`Transaction ID: ${document.getElementById('receiptTransactionId').textContent}`, 20, 55);
        doc.text(`Payment Method: ${document.getElementById('receiptPaymentMethod').textContent}`, 20, 65);
        doc.setTextColor(16, 185, 129);
        doc.text('Status: Completed', 20, 75);
        doc.setTextColor(0, 0, 0);
        
        // Booking details
        doc.text('Booking Details:', 14, 90);
        doc.text('Flight: Lagos (LOS) to London (LHR)', 20, 100);
        doc.text('Departure: 31 Oct 2024 at 13:50', 20, 110);
        doc.text('Passengers: 2 Adults', 20, 120);
        doc.text('Class: Economy', 20, 130);
        
        // Total
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(`Total Paid: ${document.getElementById('receiptTotalAmount').textContent}`, 14, 150);
        
        // Footer
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text('Thank you for choosing SkyLink!', 105, 180, { align: 'center' });
        doc.text('Booking reference: BA37075', 105, 185, { align: 'center' });
        
        // Save the PDF
        doc.save('SkyLink_Receipt.pdf');
    }

    function generateImage() {
        const receiptContent = document.querySelector('.receipt-content');
        
        html2canvas(receiptContent, {
            scale: 2,
            backgroundColor: null
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'SkyLink_Receipt.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }

    function shareReceipt() {
        if (navigator.share) {
            navigator.share({
                title: 'SkyLink Payment Receipt',
                text: 'Here is my flight booking receipt from SkyLink',
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                showToast('Sharing failed', true);
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            showToast('Web Share not supported in your browser', true);
            
            // Alternative share options
            const receiptContent = document.querySelector('.receipt-content').innerText;
            const mailtoLink = `mailto:?subject=SkyLink Payment Receipt&body=${encodeURIComponent(receiptContent)}`;
            window.open(mailtoLink, '_blank');
        }
    }

    function showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'error' : ''}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
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