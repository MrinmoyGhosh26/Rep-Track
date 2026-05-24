// Wait for the DOM to be fully loaded before running our script
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Theme Toggle Logic
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn.addEventListener('click', () => {
        // Toggle the 'light-theme' class on the body
        document.body.classList.toggle('light-theme');

        // Dynamically update the button text to guide the user
        if (document.body.classList.contains('light-theme')) {
            themeToggleBtn.textContent = 'Dark Mode';
        } else {
            themeToggleBtn.textContent = 'Light Mode';
        }
    });

    // ==========================================
    // 2. Fetch Latest Workout Updates (API)
    // ==========================================
    fetchWorkoutUpdates();
});

// Fetch and display latest entries from JSONPlaceholder API
async function fetchWorkoutUpdates() {
    const container = document.getElementById('updates-container');
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=3';

    try {
        const response = await fetch(apiUrl);
        
        // If the request fails, throw an error
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const posts = await response.json();

        // Clear existing static placeholder text/content
        container.innerHTML = '';

        // Array of realistic workout updates to replace the default Latin placeholder text
        const workoutDescriptions = [
            'Smashed a high-intensity chest/tricep workout focusing on progressive overload with incline bench press and weighted dips. Felt strong and hit a new PR!',
            'Completed a deep back/biceps session focusing on mind-muscle connection. Finished up with heavy barbell rows and strict hammer curls.',
            'Surmounted a demanding leg day training session today. Pushed through squat working sets and finished with high-rep leg presses for maximum hypertrophy.',
            'Dedicated today to a recovery/stretching day with active mobility work and light foam rolling to accelerate muscle repair and maintain joint health.'
        ];

        // Dynamically create and append styled card elements for each fetched post
        posts.forEach((post, index) => {
            // Create the main card div
            const card = document.createElement('div');
            card.className = 'update-card';

            // Create the custom card title (e.g. "Workout Session #1")
            const title = document.createElement('h3');
            title.className = 'update-title';
            title.textContent = `Workout Session #${index + 1}`;

            // Create the custom fitness-themed card body paragraph
            const body = document.createElement('p');
            body.className = 'update-body';
            
            // Map index to the workout descriptions list using modulo
            const descriptionIndex = index % workoutDescriptions.length;
            body.textContent = workoutDescriptions[descriptionIndex];

            // Append title and body to the card
            card.appendChild(title);
            card.appendChild(body);

            // Append the card to the updates container
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching updates from API:', error);
        
        // Display a clean, simple user-friendly error message in the DOM
        container.innerHTML = `<p style="color: #ef4444; font-weight: 600; margin: 0;">Could not load updates. Please check your internet connection and try again.</p>`;
    }
}
