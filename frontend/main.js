// Function to fetch and display page views from the API
async function fetchAndDisplayViewCount() {
    
    try {
         // Update with your live API URL if deployed
        const functionApiUrl = "https://get-azureresumecounter.azurewebsites.net/api/GetResumeCounter?code=iI2HPclIcdp5r7EyGmqpORY3fi19P3IsEmbCwdSsHBPIAzFuTnroAg%3D%3D";
        const localFunctionApi = "";
        // Make a GET request to the Azure Function API
        const response = await fetch(localFunctionApi);
    
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        console.log("API Response:", data.count)

        // Update the displayed counter with the value from Cosmos DB
        const count = data.Count || data.count || data.value;
        const viewDisplayElement = document.getElementById('viewCountDisplay');
        if (viewDisplayElement) {
            viewDisplayElement.textContent = `This page has been viewed ${data.count} times.`;
            
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