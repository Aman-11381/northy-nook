// Form handling for contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return false;
            }
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to your server
            // For now, we'll simulate a successful submission
            
            // Show success message
            showFormMessage('success', 'Thank you! Your request has been submitted successfully. We will contact you shortly.');
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        
        // Validate Name (required)
        if (name.value.trim() === '') {
            showInputError(name, 'Please enter your name');
            isValid = false;
        } else {
            clearInputError(name);
        }
        
        // Validate Phone (required)
        if (phone.value.trim() === '') {
            showInputError(phone, 'Please enter your phone number');
            isValid = false;
        } else if (!/^\d{10}$/.test(phone.value.trim().replace(/\D/g, ''))) {
            // Simple validation for 10-digit Indian mobile numbers
            showInputError(phone, 'Please enter a valid 10-digit mobile number');
            isValid = false;
        } else {
            clearInputError(phone);
        }
        
        return isValid;
    }
    
    // Show error message for input
    function showInputError(input, message) {
        const formControl = input.parentElement.parentElement;
        const errorElement = document.createElement('div');
        errorElement.className = 'text-danger mt-1 small';
        errorElement.innerHTML = message;
        
        // Remove any existing error message
        const existingError = formControl.querySelector('.text-danger');
        if (existingError) {
            existingError.remove();
        }
        
        formControl.appendChild(errorElement);
        input.classList.add('is-invalid');
    }
    
    // Clear error message
    function clearInputError(input) {
        const formControl = input.parentElement.parentElement;
        const existingError = formControl.querySelector('.text-danger');
        
        if (existingError) {
            existingError.remove();
        }
        
        input.classList.remove('is-invalid');
    }
    
    // Show form message (success/error)
    function showFormMessage(type, message) {
        const formElement = document.getElementById('contactForm');
        const messageElement = document.createElement('div');
        
        messageElement.className = type === 'success' 
            ? 'alert alert-success mt-4' 
            : 'alert alert-danger mt-4';
        
        messageElement.innerHTML = message;
        
        // Remove any existing message
        const existingMessage = formElement.querySelector('.alert');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Insert message before the form
        formElement.prepend(messageElement);
        
        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-remove message after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
});
