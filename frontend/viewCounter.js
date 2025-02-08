// viewerCounter.js

// Function to update the view count
function updateViewCount() {
    // Retrieve the current count from localStorage, or initialize it to 0
    let viewCount = localStorage.getItem('viewCount');

    if (!viewCount) {
        viewCount = 0; // Initialize if not set
    } else {
        viewCount = parseInt(viewCount); // Parse the stored value
    }

    // Increment the count
    viewCount++;

    // Store the updated count back in localStorage
    localStorage.setItem('viewCount', viewCount);

    // Display the count on the page
    const viewCountElement = document.getElementById('viewCountDisplay');
    if (viewCountElement) {
        viewCountElement.textContent = `This page has been visited ${viewCount} times by you.`;
    }
}

// Call the function to update and display the view count
updateViewCount();