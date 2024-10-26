let clicking = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startConnecting") {
        clicking = true;
        sendInvitations();
    } else clicking = false;
});

async function sendInvitations() {
    const buttons = document.querySelectorAll('button.artdeco-button');
	// Filter only connect buttons
	const connectButtons = Array.from(buttons).filter(button => {
		const span = button.querySelector('span.artdeco-button__text');
		return span && span.textContent.trim() === 'Connect';
	});
    // send invitations by clicking each connect button
    for (const button of connectButtons) {
        if (!clicking) break;
        button.scrollIntoView({ behavior: 'smooth', block: 'center' });
        button.click();
        chrome.runtime.sendMessage({ action: "updateCounter" });
        // random wait time between 5 and 10 seconds
        const waitTime = (Math.floor(Math.random() * 5) + 5)*1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }
}





