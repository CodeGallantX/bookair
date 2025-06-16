 document.addEventListener('DOMContentLoaded', function() {
        // Form submission
        const checkInForm = document.getElementById('checkInForm');
        const successModal = document.getElementById('successModal');
        const closeModal = document.getElementById('closeModal');
        
        checkInForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const bookingRef = document.getElementById('booking-reference').value;
          const lastName = document.getElementById('last-name').value;
          const flightNumber = document.getElementById('flight-number').value;
          
          // In a real app, you would validate and process the check-in here
          // For this demo, we'll just show the success modal
          
          // Update modal with flight details (simulated)
          document.querySelector('.flight-number').textContent = flightNumber;
          document.querySelector('.passenger-name').textContent = lastName;
          
          // Show success modal
          successModal.style.display = 'flex';
          
          // Reset form
          checkInForm.reset();
        });
        
        // Close modal
        closeModal.addEventListener('click', function() {
          successModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        successModal.addEventListener('click', function(e) {
          if (e.target === successModal) {
            successModal.style.display = 'none';
          }
        });
        
        // Download boarding pass
        document.getElementById('downloadBoardingPass').addEventListener('click', function() {
          alert('Boarding pass download would start here in a real application');
        });
        
        // Send to phone
        document.getElementById('sendToPhone').addEventListener('click', function() {
          alert('Boarding pass would be sent to your mobile device in a real application');
        });
        
        // Mobile menu toggle (if not already in your script.js)
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const closeSidebar = document.querySelector('.close-sidebar');
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        
        mobileMenuBtn.addEventListener('click', function() {
          mobileSidebar.style.transform = 'translateX(0)';
        });
        
        closeSidebar.addEventListener('click', function() {
          mobileSidebar.style.transform = 'translateX(-100%)';
        });
      });