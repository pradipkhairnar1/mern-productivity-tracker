let activeTab = null;
let startTime = null;

// 🚨 Sites to block
const blockedSites = ["www.youtube.com", "www.facebook.com", "www.instagram.com"];

// Track tabs
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);

    if (!tab.url.startsWith("http")) return;

    handleTab(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === "complete") {

        if (!tab.url.startsWith("http")) return;

        handleTab(tab);
    }
});

function handleTab(tab){

    const hostname = new URL(tab.url).hostname;

    // 🚨 BLOCK WEBSITE
    if(blockedSites.includes(hostname)){
        chrome.tabs.update(tab.id, {
            url: "https://www.google.com"
        });

        alertUser(hostname);
        return;
    }

    trackTime(hostname);
}

function alertUser(site){
    chrome.notifications.create({
        type: "basic",
        iconUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
        title: "Blocked Site 🚫",
        message: `${site} is distracting you! Stay productive 💪`
    });
}

function trackTime(hostname){

    const now = Date.now();

    if (activeTab && startTime) {

        const timeSpent = now - startTime;

        chrome.storage.local.get(["timeData"], (result) => {

            const data = result.timeData || {};

            data[activeTab] = (data[activeTab] || 0) + timeSpent;

            chrome.storage.local.set({ timeData: data });
        });
    }

    activeTab = hostname;
    startTime = now;
}

// 🔥 SEND DATA TO BACKEND EVERY 60 SECONDS

setInterval(() => {

    chrome.storage.local.get(["timeData"], async (result) => {

        const data = result.timeData || {};

        const logs = Object.keys(data).map(site => ({
            website: site,
            timeSpent: data[site]
        }));

        if(logs.length === 0) return;

        try{

            await fetch("http://localhost:5000/api/time/save",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({logs})
            });

            console.log("Data sent to backend ✅");

        }catch(err){
            console.log("Backend error:", err);
        }

    });

}, 60000); // every 1 minute
