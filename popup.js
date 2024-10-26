let invitationsCount = 0;
let isConnecting = false;
let toggleButton = document.getElementById('toggle_connecting');

toggleButton.addEventListener('click', () => {
    isConnecting = !isConnecting;
    let action = "startConnecting";
    document.getElementById('counter').innerText = invitationsCount;
    if(isConnecting) {
        toggleButton.textContent = "Stop Connecting";
        toggleButton.classList.add("stop");
    } else {
        toggleButton.textContent = "Start Connecting";
        toggleButton.classList.remove("stop");
        action = "stopConnecting";
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: action });
    });
    
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateCounter") {
        invitationsCount++;
        document.getElementById('counter').innerText = invitationsCount;
    }
});




