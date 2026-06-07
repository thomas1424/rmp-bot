document.addEventListener("DOMContentLoaded", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let statusDiv = document.getElementById("status");

    // We inject a tiny script into the active page to look for Ellucian elements
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            // Check if the page has the elements we need to inject ratings into
            return document.querySelectorAll('.instructor-name').length > 0;
        }
    }, (results) => {
        // If the script found the elements, it returns true
        if (results && results[0] && results[0].result === true) {
            statusDiv.innerText = "✅ Extension is Active";
            statusDiv.className = "status-box active"; 
        } else {
            statusDiv.innerText = "❌ Inactive on this page";
            statusDiv.className = "status-box inactive"; 
        }
    });
});