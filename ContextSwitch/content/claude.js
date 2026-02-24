// ContextSwitch Content Script for Claude
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

    // Method 1: Look for human and assistant message containers
    const humanMessages = document.querySelectorAll('[data-testid="human-turn"], .human-turn, [class*="human-message"]');
    const assistantMessages = document.querySelectorAll('[data-testid="assistant-turn"], .assistant-turn, [class*="assistant-message"]');

    // Method 2: Combined approach - find all conversation turns
    const allTurns = document.querySelectorAll('[class*="Message"], [class*="Turn"], [class*="message-row"]');
    
    if (allTurns.length > 0) {
      allTurns.forEach(turn => {
        const isHuman = turn.className.toLowerCase().includes('human') ||
                        turn.querySelector('[class*="human"]') ||
                        turn.getAttribute('data-testid')?.includes('human');
        
        const contentEl = turn.querySelector('.prose, [class*="contents"], [class*="message-content"], [class*="markdown"]');
        
        if (contentEl) {
          const content = contentEl.innerText.trim();
          if (content) {
            messages.push({
              role: isHuman ? 'user' : 'assistant',
              content: content
            });
          }
        }
      });
      
      if (messages.length > 0) return messages;
    }

    // Method 3: Look for prose elements (Claude uses Prose for formatting)
    const proseElements = document.querySelectorAll('.prose');
    let currentRole = 'user';
    proseElements.forEach(el => {
      const content = el.innerText.trim();
      if (content) {
        // Check parent for role hints
        const parent = el.closest('[class*="human"], [class*="assistant"], [class*="Human"], [class*="Assistant"]');
        if (parent) {
          const isHuman = parent.className.toLowerCase().includes('human');
          messages.push({
            role: isHuman ? 'user' : 'assistant',
            content: content
          });
        } else {
          messages.push({
            role: currentRole,
            content: content
          });
          currentRole = currentRole === 'user' ? 'assistant' : 'user';
        }
      }
    });

    // Method 4: Fallback - look for contenteditable responses
    if (messages.length === 0) {
      const containers = document.querySelectorAll('[class*="ConversationItem"], [class*="chat-message"]');
      containers.forEach((container, index) => {
        const content = container.innerText.trim();
        if (content) {
          messages.push({
            role: index % 2 === 0 ? 'user' : 'assistant',
            content: content
          });
        }
      });
    }

    return messages;
  }

  function pasteIntoInput(text) {
    // Claude uses ProseMirror/contenteditable
    const selectors = [
      '[contenteditable="true"].ProseMirror',
      '.ProseMirror[contenteditable="true"]',
      '[contenteditable="true"]',
      'textarea',
      '[class*="input-field"]'
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

    if (inputEl.tagName === 'TEXTAREA') {
      inputEl.value = text;
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      // ProseMirror contenteditable
      inputEl.focus();
      
      // Clear existing content
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(inputEl);
      selection.removeAllRanges();
      selection.addRange(range);
      
      // Insert new text
      document.execCommand('insertText', false, text);
      
      // Dispatch input event
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
  console.log('[ContextSwitch] Claude content script loaded');
})();
