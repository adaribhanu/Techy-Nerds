function bookSlot(button, seatsAvailable) {
        const slot = button.closest('.slot');
        const seatsElement = slot.querySelector('.seats');
        let seats = parseInt(seatsAvailable);
    
        const dateInput = slot.querySelector('input[type="date"]').value;
        const timeInput = slot.querySelector('input[type="time"]').value;
        const nameInput = document.getElementById('name').value;
        const errorMessage = document.getElementById('error-message');

        if (!dateInput || !timeInput || !nameInput) {
            errorMessage.textContent = 'Please enter date, time, and name to book a session.';
            errorMessage.style.display = 'block'; 
            return; 
        } else {
            errorMessage.textContent = ''; 
            errorMessage.style.display = 'none'; 
        }
        if (seats > 0) {
            seats--;
            seatsElement.textContent = `${seats} seat available`;
            if (seats === 0) {
                seatsElement.textContent = '0 seat available';
                button.disabled = true;
                button.style.backgroundColor = 'red'; 
            }
            showNotification('Slot successfully booked!');
        } else {
            alert('No seats available!');
        }
    }
    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
    function updateButtonColor() {
        const slots = document.querySelectorAll('.slot');
    
        slots.forEach(slot => {
            const seatsElement = slot.querySelector('.seats');
            const button = slot.querySelector('button');
            let seats = parseInt(seatsElement.textContent);
    
            if (seats === 0) {
                button.disabled = true;
                button.style.backgroundColor = 'red'; 
            } else if (seats <= 5) {
                button.style.backgroundColor = 'orange';
            } else {
                button.style.backgroundColor = 'green'; 
            }
        });
    }  
    document.addEventListener('DOMContentLoaded', updateButtonColor);
    document.querySelectorAll('.slot button').forEach(button => {
        button.addEventListener('click', function() {
            const seatsElement = this.closest('.slot').querySelector('.seats');
            const seatsAvailable = seatsElement.textContent.match(/\d+/)[0];
            bookSlot(this, seatsAvailable);
        });
    });