const RMP_URL = "https://www.ratemyprofessors.com/graphql";
const AUTH_TOKEN = "Basic dGVzdDp0ZXN0"; // RMP's public authorization token

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getRating") {
        let profName = request.name;

        // 1. Check local cache first
        chrome.storage.local.get([profName], (result) => {
            if (result[profName]) {
                console.log("Loaded from cache:", profName);
                sendResponse(result[profName]);
                return;
            }

            // 2. Not in cache? Fetch from RMP
            fetchRMPData(profName).then(data => {
                let cacheObj = {};
                cacheObj[profName] = data;
                chrome.storage.local.set(cacheObj);
                sendResponse(data);
            }).catch(err => {
                console.error("API Error:", err);
                sendResponse({ error: true, rating: "N/A" });
            });
        });
        
        return true; 
    }
});

async function fetchRMPData(name) {
    const query = `
        query ($query: TeacherSearchQuery!) {
            newSearch {
                teachers(query: $query) {
                    edges {
                        node {
                            legacyId
                            avgRating
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        query: { text: name }
    };

    let response = await fetch(RMP_URL, {
        method: "POST",
        headers: {
            "Authorization": AUTH_TOKEN,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query, variables })
    });

    let json = await response.json();
    let edges = json.data?.newSearch?.teachers?.edges;

    if (edges && edges.length > 0) {
        let prof = edges[0].node;
        return {
            rating: prof.avgRating.toFixed(1),
            url: `https://www.ratemyprofessors.com/professor/${prof.legacyId}`
        };
    } else {
        return { error: true, rating: "N/A" };
    }
}