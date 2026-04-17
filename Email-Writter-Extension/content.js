console.log("Content script loaded");


// ✅ Create Button
function createAIButton() {
    const button = document.createElement('button'); // ✅ changed from div
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button';
    button.style.marginRight = '8px';
    button.innerText = 'AI Reply';

    button.setAttribute('type', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');

    return button;
}


// ✅ Get Email Content
function getEmailContent() {
    const selectors = [
        '.a3s.aiL',
        '.h7',
        '.gmail_quote',   // ✅ fixed
        '[role="presentation"]'
    ];

    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }

    return '';
}


// ✅ Find Toolbar
function findComposeToolbar() {
    const selectors = [
        '.aDh',
        '.btc',
        '[role="toolbar"]',
        '.gU.Up'
    ];

    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) return toolbar;
    }

    return null;
}


// ✅ Insert text into compose box
function insertReply(text) {
    const composeBox =
        document.querySelector('[role="textbox"][g_editable="true"]') ||
        document.querySelector('[contenteditable="true"]');

    if (composeBox) {
        composeBox.focus();

        // ✅ safer than execCommand
        composeBox.innerText += "\n\n" + text;
    } else {
        console.error('Compose box not found');
    }
}


// ✅ Inject Button
function injectButton() {

    // remove existing button
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) return;

    const button = createAIButton();

    button.addEventListener('click', async () => {
        try {
            button.innerText = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();

            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const generatedReply = await response.text();

            insertReply(generatedReply);

        } catch (error) {
            console.error(error);
            alert('Failed to generate AI reply');
        } finally {
            button.innerText = 'AI Reply';
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}


// ✅ Observe Gmail DOM changes
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {

        const addedNodes = Array.from(mutation.addedNodes);

        const hasComposeElement = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (
                node.matches('.aDH,.btc,[role="dialog"]') ||
                node.querySelector('.aDH,.btc,[role="dialog"]')
            )
        );

        if (hasComposeElement) {
            console.log("Compose element detected");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });