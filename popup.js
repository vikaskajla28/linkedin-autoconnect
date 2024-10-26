let invitationsCount = 0;

document.getElementById('start_connecting').addEventListener('click', () => {
    invitationsCount = 0;
    document.getElementById('counter').innerText = invitationsCount;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "startConnecting" });
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateCounter") {
        invitationsCount++;
        document.getElementById('counter').innerText = invitationsCount;
    }
});

