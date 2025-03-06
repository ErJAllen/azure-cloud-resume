async function fetchAndDisplayViewCount() {
    try {
        // Use local API in development, Azure API in production
        const functionApiUrl = "https://azureresumecounter.azurewebsites.net/api/GetResumeCounter?code=fASQh3UnnA--8yJ0iwiWbZxHtrVUxCcyXnxyqUKs9dnXAzFuweomiQ==";
        const localFunctionApi = "http://localhost:7071/api/GetResumeCounter";
        const apiUrl = window.location.hostname === "localhost" ? localFunctionApi : functionApiUrl;

        // Make a GET request to the Azure Function API
        const response = await fetch(functionApiUrl);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        console.log("API Response:", data); // Debugging

        // Handle different possible response formats
        const count = data.Count || data.count || data.value;

        // Update the displayed counter with the value from Cosmos DB
        const viewDisplayElement = document.getElementById('viewCountDisplay');
        if (viewDisplayElement) {
            viewDisplayElement.textContent = `This page has been viewed ${count} times.`;
        }
    } catch (error) {
        console.error("Error fetching view count:", error);
        const viewDisplayElement = document.getElementById('viewCountDisplay');
        if (viewDisplayElement) {
            viewDisplayElement.textContent = "Unable to fetch view count.";
        }
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayViewCount);