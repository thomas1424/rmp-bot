const TARGET_SELECTOR = 'span[id^="faculty-office-hours-"]'; 

function injectRatings() {
    chrome.storage.local.get(["rmpEnabled"], (res) => {
        if (res.rmpEnabled === false) return; 

        const professorElements = document.querySelectorAll(`${TARGET_SELECTOR}:not(.rmp-processed)`); 

        professorElements.forEach((element) => {
            element.classList.add('rmp-processed');

            let rawName = element.innerText.trim();
            if (!rawName || rawName.toLowerCase() === "staff" || rawName === "tba") return;

            // Name Parser: Converts "Zuick, Nhan H." to "Nhan Zuick"
            let searchName = rawName;
            if (rawName.includes(",")) {
                let parts = rawName.split(",");
                let lastName = parts[0].trim();
                let firstPart = parts[1].trim().split(" ")[0]; 
                searchName = `${firstPart} ${lastName}`;
            }

            chrome.runtime.sendMessage({ action: "getRating", name: searchName }, (response) => {
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

injectRatings();
setInterval(injectRatings, 2000);