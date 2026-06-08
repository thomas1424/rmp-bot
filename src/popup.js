document.addEventListener("DOMContentLoaded", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    let statusDiv = document.getElementById("status");
    let toggleInput = document.getElementById("extensionToggle");
    let toggleLabel = document.getElementById("toggleLabel");

    // 1. Check if the page is a registration portal (DOM Detection)
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.querySelectorAll('.instructor-name').length > 0
    }, (results) => {
        if (results && results[0] && results[0].result === true) {
            statusDiv.innerText = "✅ Active on this page";
            statusDiv.className = "status-box active"; 
        } else {
            statusDiv.innerText = "❌ Inactive on this page";
            statusDiv.className = "status-box inactive"; 
        }
    });

    // 2. Handle the On/Off Toggle State
    // Load initial state from storage (default to true if it doesn't exist yet)
    chrome.storage.local.get(["rmpEnabled"], (res) => {
        let isEnabled = res.rmpEnabled !== false; 
        toggleInput.checked = isEnabled;
        toggleLabel.innerText = isEnabled ? "Extension Enabled" : "Extension Disabled";
    });

    // Listen for the user clicking the switch
    toggleInput.addEventListener("change", (e) => {
        let isEnabled = e.target.checked;
        
        // Update text
        toggleLabel.innerText = isEnabled ? "Extension Enabled" : "Extension Disabled";
        
        // Save the new state to Chrome storage
        chrome.storage.local.set({ rmpEnabled: isEnabled });
        
        // Reload the current tab so the changes take effect immediately
        chrome.tabs.reload(tab.id);
    });
});