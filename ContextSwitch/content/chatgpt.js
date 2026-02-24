// ContextSwitch Content Script for ChatGPT
(function() {
  'use strict';

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapeMessages') {
      const messages = scrapeMessages();
      sendResponse({ messages });
    } else if (request.action === 'pasteText') {
      const success = pasteIntoInput(request.text);
      sendResponse({ success });
    }
    return true;
  });

  function scrapeMessages() {
    const messages = [];

    // Method 1: Using data-message-author-role attribute (most common)
    const messageElements = document.querySelectorAll('[data-message-author-role]');
    if (messageElements.length > 0) {
      messageElements.forEach(el => {
        const role = el.getAttribute('data-message-author-role');
        const contentEl = el.querySelector('.markdown, .whitespace-pre-wrap, [class*="message-content"]');
        if (contentEl) {
          const content = contentEl.innerText.trim();
          if (content) {
            messages.push({
              role: role === 'user' ? 'user' : 'assistant',
              content: content
            });
          }
        }
      });
      return messages;
    }

    // Method 2: Using turn-based class names
    const turns = document.querySelectorAll('[class*="ConversationItem"], [class*="group\\/conversation"]');
    if (turns.length > 0) {
      turns.forEach(turn => {
        const isUser = turn.querySelector('[data-message-author-role="user"]') || 
                       turn.className.includes('user');
        const contentEl = turn.querySelector('.markdown, .whitespace-pre-wrap');
        if (contentEl) {
          const content = contentEl.innerText.trim();
          if (content) {
            messages.push({
              role: isUser ? 'user' : 'assistant',
              content: content
            });
          }
        }
      });
      return messages;
    }

    // Method 3: Fallback - look for any message containers
    const containers = document.querySelectorAll('main [class*="text-base"]');
    let currentRole = 'user';
    containers.forEach(container => {
      const content = container.innerText.trim();
      if (content && content.length > 0) {
        messages.push({
          role: currentRole,
          content: content
        });
        currentRole = currentRole === 'user' ? 'assistant' : 'user';
      }
    });

    return messages;
  }

  function pasteIntoInput(text) {
    // Try multiple selectors for ChatGPT input
    const selectors = [
      '#prompt-textarea',
      'textarea[data-id="root"]',
      'textarea[placeholder*="Message"]',
      'textarea[placeholder*="Send a message"]',
      'form textarea',
      '[contenteditable="true"]'
    ];

    let inputEl = null;
    for (const selector of selectors) {
      inputEl = document.querySelector(selector);
      if (inputEl) break;
    }

    if (!inputEl) {
      // Copy to clipboard as fallback
      navigator.clipboard.writeText(text);
      return false;
    }

    if (inputEl.tagName === 'TEXTAREA') {
      inputEl.value = text;
      inputEl.style.height = 'auto';
      inputEl.style.height = inputEl.scrollHeight + 'px';
      
      // Trigger React's synthetic event system
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      ).set;
      nativeInputValueSetter.call(inputEl, text);
      
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
      inputEl.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      inputEl.innerText = text;
      inputEl.dispatchEvent(new InputEvent('input', { bubbles: true }));
    }

    inputEl.focus();
    return true;
  }

  // Notify that content script is loaded
  console.log('[ContextSwitch] ChatGPT content script loaded');
})();
