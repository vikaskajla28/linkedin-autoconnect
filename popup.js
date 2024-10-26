let invitationsCount = 0;
let isConnecting = false;

document.getElementById('toggle_connecting').addEventListener('click', () => {
    isConnecting = !isConnecting;

    if(isConnecting) {
        // invitationsCount = 0;
        document.getElementById('counter').innerText = invitationsCount;
        document.getElementById('toggle_connecting').textContent = "Stop Connecting";
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "startConnecting" });
        });
    } else {
        document.getElementById('counter').innerText = invitationsCount;
        document.getElementById('toggle_connecting').textContent = "Start Connecting";
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "stopConnecting" });
        });
    }
    
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateCounter") {
        invitationsCount++;
        document.getElementById('counter').innerText = invitationsCount;
    }
});


let isClicking = false;

document.getElementById('toggleButton').addEventListener('click', () => {
    isClicking = !isClicking;

    const buttonText = isClicking ? 'Stop Clicking' : 'Start Clicking';
    document.getElementById('toggleButton').textContent = buttonText;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: isClicking ? 'start' : 'stop' });
    });
});


