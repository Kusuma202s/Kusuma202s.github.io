document.addEventListener('DOMContentLoaded', () => {
    const birthday = new Date('2024-08-02T00:10:05'); // Replace with your birthday (e.g., '2024-08-15T00:00:00')
    
    function updateCountdown() {
        const now = new Date();
        const diff = birthday - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
        
        if (diff < 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown').innerHTML = '<h2>Happy Birthday!</h2>';
        }
    }
    
    const timerInterval = setInterval(updateCountdown, 1000);
});
