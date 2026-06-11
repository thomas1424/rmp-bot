// This tells the script to find any span whose ID starts with "faculty-office-hours-"
const TARGET_SELECTOR = 'span[id^="faculty-office-hours-"]'; 

function injectRatings() {
    chrome.storage.local.get(["rmpEnabled"], (res) => {
        if (res.rmpEnabled === false) return; 

        // Find all professors that we HAVEN'T processed yet
        const professorElements = document.querySelectorAll(`${TARGET_SELECTOR}:not(.rmp-processed)`); 

        professorElements.forEach((element) => {
            // Mark this element so we don't inject 50 badges if the page reloads
            element.classList.add('rmp-processed');

            let profName = element.innerText.trim();
            if (!profName || profName.toLowerCase() === "staff" || profName === "TBA") return;

            chrome.runtime.sendMessage({ action: "getRating", name: profName }, (response) => {
                let badge = document.createElement('a'); 
                badge.className = "rmp-badge";
                
                if (response.error || response.rating === "N/A" || response.rating == 0) {
                    badge.innerText = ` ❔ N/A`;
                    badge.classList.add("rating-na");
                } else {
                    badge.innerText = ` ⭐️ ${response.rating}`;
                    badge.href = response.url; 
                    badge.target = "_blank"; 

                    let score = parseFloat(response.rating);
                    if (score >= 4.0) badge.classList.add("rating-green");
                    else if (score >= 3.0) badge.classList.add("rating-yellow");
                    else badge.classList.add("rating-red");
                }
                
                element.appendChild(badge);
            });
        });
    });
}

// Run the function immediately, and then every 2 seconds to catch late-loading elements
injectRatings();
setInterval(injectRatings, 2000);