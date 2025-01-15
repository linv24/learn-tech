chrome.runtime.onInstalled.addListener(() => { // complete some task on installation of extension
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

const extensions = "https://developer.chrome.com/docs/extensions"
const webstore = "https://developer.chrome.com/docs/webstore"

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
        // Retrive the action badge to check if the extension is "ON" or "OFF"
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id});
        // Next state will always be the opposite
        const nextState = prevState === "ON" ? "OFF" : "ON";

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });

        if (nextState === "ON") {
            await chrome.scripting.insertCSS({
                files: ["focus-mode.css"],
                target: { tabId: tab.id },
            });
        } else if (nextState === "OFF") {
            await chrome.scripting.removeCSS({
                files: ["focus-mode.css"],
                target: { tabId: tab.id},
            });
        }
    }
});