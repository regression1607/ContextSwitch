// ContextSwitch Content Script for Gemini
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

    // Method 1: Look for user queries and model responses
    const userQueries = document.querySelectorAll('user-query, .user-query, [class*="query-content"], [class*="user-message"]');
    const modelResponses = document.querySelectorAll('model-response, .model-response, [class*="response-content"], [class*="model-message"]');

    // Interleave user queries and model responses
    const maxLen = Math.max(userQueries.length, modelResponses.length);
    for (let i = 0; i < maxLen; i++) {
      if (userQueries[i]) {
        const content = userQueries[i].innerText.trim();
        if (content) {
          messages.push({
            role: 'user',
            content: content
          });
        }
      }
      if (modelResponses[i]) {
        const content = modelResponses[i].innerText.trim();
        if (content) {
          messages.push({
            role: 'assistant',
            content: content
          });
        }
      }
    }

    if (messages.length > 0) return messages;

    // Method 2: Look for conversation turns
    const turns = document.querySelectorAll('[class*="conversation-turn"], [class*="chat-turn"], [class*="message-content"]');
    turns.forEach((turn, index) => {
      const isUser = turn.className.includes('user') || 
                     turn.querySelector('[class*="user"]') ||
                     index % 2 === 0;
      
      const contentEl = turn.querySelector('[class*="text"], [class*="content"], .markdown-main-panel') || turn;
      const content = contentEl.innerText.trim();
      
      if (content) {
        messages.push({
          role: isUser ? 'user' : 'assistant',
          content: content
        });
      }
    });

    if (messages.length > 0) return messages;

    // Method 3: Look for message bubbles
    const messageBubbles = document.querySelectorAll('[class*="message-bubble"], [class*="chat-message"]');
    messageBubbles.forEach((bubble, index) => {
      const content = bubble.innerText.trim();
      if (content) {
        messages.push({
          role: index % 2 === 0 ? 'user' : 'assistant',
          content: content
        });
      }
    });

    if (messages.length > 0) return messages;

    // Method 4: Fallback - look for any content in the main chat area
    const mainContent = document.querySelector('main, [role="main"], .chat-container');
    if (mainContent) {
      const textBlocks = mainContent.querySelectorAll('p, [class*="text-content"]');
      let currentRole = 'user';
      textBlocks.forEach(block => {
        const content = block.innerText.trim();
        if (content && content.length > 10) {
          messages.push({
            role: currentRole,
            content: content
          });
          currentRole = currentRole === 'user' ? 'assistant' : 'user';
        }
      });
    }

    return messages;
  }

  function pasteIntoInput(text) {
    // Gemini uses various input methods
    const selectors = [
      'rich-textarea [contenteditable="true"]',
      '.ql-editor',
      '[contenteditable="true"]',
      'textarea',
      '.text-input-field textarea',
      'input[type="text"]'
    ];

    let inputEl = null;
    for (const selector of selectors) {
      inputEl = document.querySelector(selector);
      if (inputEl) break;
    }

    if (!inputEl) {
      navigator.clipboard.writeText(text);
      return false;
    }

    if (inputEl.tagName === 'TEXTAREA' || inputEl.tagName === 'INPUT') {
      inputEl.value = text;
      
      // Trigger native setter for React
      const descriptor = Object.getOwnPropertyDescriptor(
        inputEl.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
        'value'
      );
      if (descriptor && descriptor.set) {
        descriptor.set.call(inputEl, text);
      }
      
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
      inputEl.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      // Contenteditable
      inputEl.focus();
      
      // Clear and insert
      inputEl.innerHTML = '';
      
      // Create text node to preserve formatting
      const textNode = document.createTextNode(text);
      inputEl.appendChild(textNode);
      
      // Dispatch events
      inputEl.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        inputType: 'insertText',
        data: text
      }));
    }

    inputEl.focus();
    return true;
  }

  // Notify that content script is loaded
  console.log('[ContextSwitch] Gemini content script loaded');
})();
