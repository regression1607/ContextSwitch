# ContextSwitch v2

A Chrome extension that saves and restores AI conversation context across ChatGPT, Claude, and Gemini sessions.

## Problem

When you hit rate limits on free AI platforms, you lose all your project context when switching to a new account. ContextSwitch solves this by saving your conversation history and letting you reload it in a new session.

## Features

- **Save Full Context**: Capture ALL messages from your current AI chat session (no truncation!)
- **Compress First**: Inject a prompt that asks the AI to compress the conversation into a portable artifact before saving
- **Load Full Context**: Paste the entire conversation history into the new session
- **Load Compressed**: Paste an AI-optimized format with structured tags for better parsing
- **Multi-Platform Support**: Works with ChatGPT, Claude, and Gemini
- **Local Storage**: All data is stored locally in your browser
- **Clean UI**: Modern, dark-themed popup interface

## What Makes This Unique

Unlike other export tools that only save static files, ContextSwitch:
1. **AI-to-AI Transfer**: Uses formats optimized for AI understanding, not human reading
2. **One-Click Reload**: Auto-pastes context into new sessions
3. **Compression Option**: Ask the current AI to create a lossless compressed artifact
4. **Free & Local**: No subscriptions, no cloud, no data leaves your browser

## Supported Platforms

- [ChatGPT](https://chat.openai.com) / [chatgpt.com](https://chatgpt.com)
- [Claude](https://claude.ai)
- [Gemini](https://gemini.google.com)

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the `ContextSwitch` folder
6. The extension icon should appear in your toolbar

### Converting Icons (Optional)

The extension includes SVG icons. To convert them to PNG for better compatibility:

1. Open each SVG file in a browser
2. Take a screenshot or use an online converter
3. Save as PNG with the corresponding filename (icon16.png, icon48.png, icon128.png)

Or use ImageMagick:
```bash
convert icons/icon16.svg icons/icon16.png
convert icons/icon48.svg icons/icon48.png
convert icons/icon128.svg icons/icon128.png
```

## Usage

### Method 1: Quick Save & Load (Basic)

1. Open an AI chat with your conversation
2. Click the ContextSwitch extension icon
3. Click **Save Full Context** → Enter project name → Save
4. In new session: Click **Load Full Context** or **Load Compressed**
5. Send the pasted message

### Method 2: AI-Compressed Save (Recommended for long chats)

1. Before hitting rate limit, click **Compress First**
2. The extension pastes a compression prompt into the chat
3. Send it → AI generates a compressed artifact
4. Click **Save Full Context** (this saves everything including the compressed version)
5. In new session: **Load Compressed** → The AI gets the optimized format

### Load Options

| Option | Best For |
|--------|----------|
| **Load Full Context** | Short conversations, when you need every detail |
| **Load Compressed** | Long conversations, AI parses structured tags better |

### Deleting Projects

1. Click the trash icon on any project card
2. Confirm deletion

## Folder Structure

```
ContextSwitch/
├── manifest.json           # Extension configuration
├── README.md               # This file
├── background/
│   └── background.js       # Service worker for background tasks
├── content/
│   ├── chatgpt.js          # Content script for ChatGPT
│   ├── claude.js           # Content script for Claude
│   ├── gemini.js           # Content script for Gemini
│   └── content.css         # Shared styles for content scripts
├── icons/
│   ├── icon16.svg          # 16x16 icon
│   ├── icon48.svg          # 48x48 icon
│   └── icon128.svg         # 128x128 icon
└── popup/
    ├── popup.html          # Popup UI structure
    ├── popup.css           # Popup styles
    └── popup.js            # Popup logic
```

## How It Works

1. **Content Scripts**: Each AI platform has a dedicated content script that knows how to scrape messages from that specific site's DOM structure.

2. **Message Scraping**: When you save context, the extension extracts all user and assistant messages from the current chat.

3. **Smart Summary**: When loading context, the extension generates a summary that includes:
   - Project name and original platform
   - Key user requests (first 5 messages)
   - Last assistant response
   - Instructions for the new AI to continue

4. **Auto-Paste**: The summary is automatically inserted into the chat input, ready for you to send.

## Privacy

- All data is stored locally using Chrome's `chrome.storage.local`
- No data is sent to any external servers
- You can delete saved projects at any time

## Troubleshooting

### Extension not detecting the platform
- Make sure you're on a supported URL (chat.openai.com, chatgpt.com, claude.ai, or gemini.google.com)
- Try refreshing the page

### No messages found
- Ensure the chat has loaded completely
- The AI platforms may have updated their DOM structure; the extension uses multiple fallback methods

### Context not pasting
- If auto-paste fails, the text is copied to your clipboard
- You can manually paste (Ctrl/Cmd + V) into the chat input

## License

MIT License - Feel free to modify and distribute.
