// Listen for messages from content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if (request.action === "getRating") {
        console.log("Brain received request to look up: ", request.name);
        
        // Faking a rating for testing purposes
        let fakeRating = (Math.random() * 5).toFixed(1); 
        
        // Send it back to the page
        sendResponse({ rating: fakeRating });
    }
    
    // Keeps the message channel open for the response
    return true; 
});