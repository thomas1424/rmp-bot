# RMP-Bot

A lightweight, local-first Chrome Extension that pulls RateMyProfessor scores and injects them directly into Ellucian college registration portals. Built for the Hack Club Stardance project.

Choosing classes is usually a massive headache. You have to copy a professor's name, open a new tab, search them on RateMyProfessor, read the rating, and tab back. Multiply that by 15 different class options, and it takes hours. 

I built RMP-Bot to completely automate that loop. It scrapes the DOM of your college portal, talks to the RMP GraphQL API in the background, parses the data, and injects a color-coded, clickable rating badge right next to the professor's name.

## Features

* **Live GraphQL API Integration:** Fetches real, up-to-date data directly from RateMyProfessor's database.
* **Smart Name Parsing:** College portals usually list names as "Last, First" (e.g., "Doe, John C."). The extension automatically intercepts, cleans, and flips the string to "John Doe" before querying the API so it actually gets a hit.
* **Aggressive Local Caching:** To prevent hitting rate limits, RMP-Bot uses `chrome.storage.local`. Once a professor's rating is pulled, it's saved. If you refresh the page, the badges load instantly from memory instead of pinging the server again.
* **Dynamic DOM Injection:** Uses a MutationObserver loop to handle dynamically loaded content.
* **Visual Triage:** Badges are color-coded (Green for 4.0+, Yellow for 3.0+, Red for avoid) to let you scan a page of 20 classes in seconds.

## How to Install & Test

Because this isn't on the Chrome Web Store yet, you'll need to load it manually via Developer Mode.

1. Download this repository as a ZIP file and extract it.
2. Open Chrome and go to `chrome://extensions/`.
3. Toggle on **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the folder you just extracted.

### Testing Instructions (Important!)
To see the extension work, you need to be on an Ellucian-based college registration portal. 

1. Go to the course search page and search for any subject.
2. **Note on Ellucian Portals:** Ellucian hides the professor's name inside a dropdown menu by default. **The extension will only show "Active" and inject the ratings AFTER you click the dropdown to reveal the instructor's name.** 3. Once the professor's name is visible on the screen, wait 1-2 seconds. RMP-Bot will detect the change in the DOM and inject the badge.
4. Click the badge to be taken straight to their full RMP review page.
5. Click the extension puzzle piece icon to open the custom Dark Mode popup UI. You can use the master switch to instantly kill the extension if you need to turn it off.

## Tech Stack
* **Manifest V3** for modern Chrome Extension architecture.
* Vanilla JavaScript, HTML, and CSS. No heavy frameworks, no bloating.
* `chrome.storage` API for the caching layer.
* `chrome.scripting` API for secure DOM manipulation.