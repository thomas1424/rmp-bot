console.log("RMP-Bot content script loaded and searching for professors...");

// 1. Find where the professor names are. 
// (We will adjust '.instructor-name' later once we look at the actual portal code)
const professorElements = document.querySelectorAll('.instructor-name'); 

professorElements.forEach((element) => {
    let profName = element.innerText;

    // 2. Ask the background script for data
    chrome.runtime.sendMessage({ action: "getRating", name: profName }, (response) => {
        
        // 3. Build the visual badge
        let badge = document.createElement('span');
        badge.className = "rmp-badge";
        badge.innerText = ` ⭐️ ${response.rating}`;
        
        // 4. Attach the badge to the page
        element.appendChild(badge);
    });
});