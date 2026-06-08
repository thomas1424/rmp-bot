// Check Chrome storage before doing anything
chrome.storage.local.get(["rmpEnabled"], (res) => {
    // If the user explicitly disabled the extension, stop execution
    if (res.rmpEnabled === false) {
        console.log("RMP-Bot is currently disabled by the user.");
        return; 
    }

    // Otherwise, proceed with injecting ratings
    console.log("RMP-Bot content script loaded and searching for professors...");

    const professorElements = document.querySelectorAll('.instructor-name'); 

    professorElements.forEach((element) => {
        let profName = element.innerText;

        chrome.runtime.sendMessage({ action: "getRating", name: profName }, (response) => {
            let badge = document.createElement('span');
            badge.className = "rmp-badge";
            badge.innerText = ` ⭐️ ${response.rating}`;
            
            element.appendChild(badge);
        });
    });
});