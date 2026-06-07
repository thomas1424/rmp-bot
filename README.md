# 🎓 RMP-Bot 

**RMP-Bot** is a lightweight, powerful Chrome Extension that brings RateMyProfessor (RMP) ratings directly to your college's class registration portal. 

Say goodbye to the endless cycle of copying a professor's name, opening a new tab, searching RMP, and clicking through results. When you browse for classes on Ellucian, RMP-Bot automatically fetches and injects the professor's rating right next to their name. 

Right now, the extension will only be developed for Ellucian but support for more platforms liek Workday Student will be coming soon!

## ✨ Features

* **Instant Inline Ratings:** Automatically displays the professor's overall score, difficulty rating, and "Would Take Again" percentage directly on the course search page.
* **Color-Coded Indicators:** Quickly scan your options with visual cues.
  * 🟢 **Green:** Excellent (4.0 - 5.0)
  * 🟡 **Yellow:** Average (3.0 - 3.9)
  * 🔴 **Red:** Proceed with caution (< 3.0)
* **Hover Previews (Quick Look):** Hover over the injected rating badge to see the professor's top tags (e.g., "Caring", "Tough Grader") and a snippet of their most recent review without ever leaving the page.
* **Direct Links:** Click the rating badge to instantly open the professor's full RMP profile in a new tab if you want to dive deeper into the reviews.
* **Smart Caching:** Uses `chrome.storage.local` to remember previously fetched professors. This prevents unnecessary API calls, ensures lightning-fast load times on page refresh, and respects rate limits.
* **Seamless UI Integration:** Injected elements are styled to match the native registration system, making it look like a built-in feature rather than a clunky add-on.

## 🛠️ How It Works

RMP-Bot utilizes a **Content Script** that listens for changes on the class search page. It uses regex and DOM manipulation to identify professor names, queries the RateMyProfessor GraphQL API in the background, and dynamically injects custom HTML/CSS badges next to the text nodes.

## 🚀 Installation (Developer Mode)

Since this extension is currently in development, you can install it directly from the source files using Chrome's Developer Mode:

1. **Download the project:** Click the green **Code** button at the top of this GitHub repository and select **Download ZIP**.
2. **Extract the files:** Locate the downloaded ZIP file on your computer and extract/unzip it into a new folder.
3. **Open Chrome Extensions:** Open Google Chrome and type `chrome://extensions/` into your address bar, then hit Enter.
4. **Enable Developer Mode:** Turn on the **Developer mode** toggle switch located in the top right corner of the page.
5. **Load the extension:** Click the **Load unpacked** button that appears in the top left.
6. **Select the folder:** Navigate to and select the `rmp-bot` folder you extracted in Step 2. 
7. **Try it out!** Navigate to your college's class registration portal and start searching for classes to see the ratings appear.

## 📁 Extension Structure

This repo is already laid out as a barebones Manifest V3 Chrome extension.

