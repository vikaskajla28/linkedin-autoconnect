let clicking = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startConnecting") {
        clicking = true;
        clickButtons();
    }
});

async function clickButtons() {
    const buttons = document.querySelectorAll('.testing');
    for (const button of buttons) {
        if (!clicking) break;
        button.click();
        chrome.runtime.sendMessage({ action: "updateCounter" });
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

