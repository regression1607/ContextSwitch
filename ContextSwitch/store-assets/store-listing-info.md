# Chrome Web Store Listing Information

## Required Images (Create these)

1. **Store Icon** - 128x128 PNG (already have: icons/icon128.png)

2. **Screenshots** (at least 1, max 5) - 1280x800 or 640x400 PNG
   - Screenshot 1: Extension popup showing saved projects
   - Screenshot 2: ChatGPT page with ContextSwitch active
   - Screenshot 3: Gemini page with ContextSwitch active
   - Screenshot 4: Claude page with ContextSwitch active
   - Screenshot 5: Compression results/stats

3. **Promotional Images** (optional but recommended)
   - Small Promo Tile: 440x280 PNG
   - Large Promo Tile: 920x680 PNG
   - Marquee Promo Tile: 1400x560 PNG

---

## Store Listing Details

### Name (max 45 characters)
ContextSwitch - AI Chat Context Manager

### Short Description (max 132 characters)
Save, compress & restore ChatGPT, Gemini, Claude conversations. Never lose AI context again. Save 70% on tokens.

### Detailed Description
🚀 **ContextSwitch - Never Lose Your AI Conversation Context Again**

Tired of losing your ChatGPT, Gemini, or Claude conversations when switching between projects? ContextSwitch is the ultimate AI productivity tool that saves, compresses, and restores your AI conversations with a single click.

**✨ KEY FEATURES:**

🔹 **Save Conversations Instantly**
   - One-click save for ChatGPT, Google Gemini, and Claude
   - Organize conversations by project
   - Access your saved context anytime

🔹 **Smart Compression**
   - Reduce context size by up to 70%
   - Save money on AI tokens
   - Keep the essential information intact

🔹 **Seamless Restore**
   - Restore conversations with one click
   - Continue exactly where you left off
   - Switch between projects effortlessly

🔹 **Multi-Platform Support**
   - ✅ ChatGPT (chat.openai.com & chatgpt.com)
   - ✅ Google Gemini (gemini.google.com)
   - ✅ Claude (claude.ai)

**💡 PERFECT FOR:**
- Developers managing multiple coding projects
- Writers working on different articles/books
- Researchers with various research threads
- Marketers handling multiple campaigns
- Anyone who uses AI assistants daily

**🔒 PRIVACY & SECURITY:**
- Your data stays on your device
- Secure cloud sync (optional)
- No conversation content shared with third parties

**🆓 FREE TO USE:**
Get started with our generous free tier. Premium plans available for power users.

**📧 SUPPORT:**
Visit https://www.context-switch.dev/contact for support

---

### Category
Productivity

### Language
English

### Privacy Policy URL
https://www.context-switch.dev/privacy (create this page)

### Website
https://www.context-switch.dev

---

## Justification for Permissions (Required)

### "storage" permission
Used to save user's conversation projects and preferences locally on their device.

### "activeTab" permission  
Required to read the current AI conversation from the active tab when user clicks save.

### "scripting" permission
Needed to inject content scripts into AI chat pages (ChatGPT, Gemini, Claude) to extract and restore conversations.

### Host Permissions
- chat.openai.com, chatgpt.com: To interact with ChatGPT conversations
- claude.ai: To interact with Claude conversations
- gemini.google.com: To interact with Gemini conversations
- api.context-switch.dev: Our backend API for user authentication and cloud sync
