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
        // random wait time between 5 and 10 seconds
        const waitTime = (Math.floor(Math.random() * 5) + 5)*1000;
        console.log("waitTime: ", waitTime);
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }
}

