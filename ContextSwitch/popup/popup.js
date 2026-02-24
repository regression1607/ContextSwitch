document.addEventListener('DOMContentLoaded', init);

let currentPlatform = null;
let currentTabId = null;
let selectedProjectId = null;
let selectedCompressProjectId = null;
let authToken = null;
let currentUser = null;

async function init() {
  // Check if user is logged in
  const authData = await chrome.storage.local.get(['authToken', 'user']);
  if (authData.authToken && authData.user) {
    authToken = authData.authToken;
    currentUser = authData.user;
    showAppView();
    updateUserStatsBar();
    await detectPlatform();
    await loadProjects();
    // Fetch fresh user stats from server
    fetchUserStats();
  } else {
    showAuthView();
  }
  setupEventListeners();
}

function showAuthView() {
  document.getElementById('authView').style.display = 'flex';
  document.getElementById('appView').style.display = 'none';
}

function showAppView() {
  document.getElementById('authView').style.display = 'none';
  document.getElementById('appView').style.display = 'block';
}

async function detectPlatform() {
  const badge = document.getElementById('platformBadge');
  const saveBtn = document.getElementById('saveBtn');
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    currentTabId = tab.id;
    const url = tab.url || '';
    
    if (url.includes('chat.openai.com') || url.includes('chatgpt.com')) {
      currentPlatform = 'chatgpt';
      badge.textContent = 'ChatGPT';
      badge.className = 'platform-badge chatgpt';
    } else if (url.includes('claude.ai')) {
      currentPlatform = 'claude';
      badge.textContent = 'Claude';
      badge.className = 'platform-badge claude';
    } else if (url.includes('gemini.google.com')) {
      currentPlatform = 'gemini';
      badge.textContent = 'Gemini';
      badge.className = 'platform-badge gemini';
    } else {
      currentPlatform = null;
      badge.textContent = 'Unsupported';
      badge.className = 'platform-badge unsupported';
      saveBtn.disabled = true;
    }
  } catch (error) {
    console.error('Error detecting platform:', error);
    badge.textContent = 'Error';
    badge.className = 'platform-badge unsupported';
    saveBtn.disabled = true;
  }
}

async function loadProjects() {
  const projectList = document.getElementById('projectList');
  const emptyState = document.getElementById('emptyState');
  
  try {
    const result = await chrome.storage.local.get('projects');
    const projects = result.projects || [];
    
    if (projects.length === 0) {
      emptyState.style.display = 'flex';
      return;
    }
    
    emptyState.style.display = 'none';
    projectList.innerHTML = '';
    
    projects.sort((a, b) => b.savedAt - a.savedAt);
    
    projects.forEach(project => {
      const card = createProjectCard(project);
      projectList.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    showToast('Failed to load projects', 'error');
  }
}

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card' + (project.compressedContext ? ' has-compressed' : '');
  card.dataset.projectId = project.id;
  
  const date = new Date(project.savedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const messageCount = project.messages ? project.messages.length : 0;
  const compressedBadge = project.compressedContext 
    ? '<span class="compressed-badge">✓ Compressed</span>' 
    : '';
  
  card.innerHTML = `
    <div class="project-card-header">
      <span class="project-name">${escapeHtml(project.name)}</span>
      <span class="project-platform ${project.platform}">${project.platform}</span>
    </div>
    <div class="project-meta">
      <span>${messageCount} messages</span>
      ${compressedBadge}
      <span>${date}</span>
    </div>
    <div class="project-actions">
      <button class="project-btn project-btn-load" data-action="load">Load Context</button>
      <button class="project-btn project-btn-delete" data-action="delete">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `;
  
  return card;
}

function setupEventListeners() {
  // Auth tabs
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
  });
  
  // Auth forms
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('signupForm').addEventListener('submit', handleSignup);
  
  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
  
  // Profile button
  document.getElementById('profileBtn').addEventListener('click', openProfileModal);
  document.getElementById('closeProfileBtn').addEventListener('click', closeProfileModal);
  
  // Save button
  document.getElementById('saveBtn').addEventListener('click', openSaveModal);
  
  // Compress button - opens modal to select project
  document.getElementById('compressBtn').addEventListener('click', openCompressModal);
  
  // Compress modal
  document.getElementById('cancelCompressBtn').addEventListener('click', closeCompressModal);
  document.getElementById('confirmCompressBtn').addEventListener('click', compressSelectedProject);
  
  // Info box dismiss
  document.getElementById('dismissInfo').addEventListener('click', () => {
    document.getElementById('infoBox').style.display = 'none';
  });
  
  // Save modal
  document.getElementById('cancelSaveBtn').addEventListener('click', closeSaveModal);
  document.getElementById('confirmSaveBtn').addEventListener('click', saveContext);
  document.getElementById('projectNameInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') saveContext();
  });
  
  // Load modal
  document.getElementById('cancelLoadBtn').addEventListener('click', closeLoadModal);
  document.getElementById('loadFullBtn').addEventListener('click', () => loadContext('full'));
  document.getElementById('loadCompressedBtn').addEventListener('click', () => loadContext('compressed'));
  
  // Delete modal
  document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);
  document.getElementById('confirmDeleteBtn').addEventListener('click', deleteProject);
  
  // Project list actions
  document.getElementById('projectList').addEventListener('click', handleProjectAction);
  
  // Close modals on backdrop click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}

// Auth functions
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('signupForm').style.display = tab === 'signup' ? 'block' : 'none';
  
  // Clear errors
  document.getElementById('loginError').textContent = '';
  document.getElementById('signupError').textContent = '';
}

async function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errorEl = document.getElementById('loginError');
  const btn = document.getElementById('loginBtn');
  
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;
  errorEl.textContent = '';
  
  try {
    const apiUrl = typeof CONFIG !== 'undefined' ? CONFIG.API_URL : 'http://localhost:5000/api';
    console.log('Login API URL:', apiUrl);
    
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Login failed');
    }
    
    // Save auth data
    authToken = data.token;
    currentUser = data.user;
    await chrome.storage.local.set({ authToken: data.token, user: data.user });
    
    showAppView();
    await detectPlatform();
    await loadProjects();
    
  } catch (error) {
    console.error('Login error:', error);
    errorEl.textContent = error.message || 'Connection failed. Check if server is running.';
  } finally {
    btn.innerHTML = 'Login';
    btn.disabled = false;
  }
}

async function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const errorEl = document.getElementById('signupError');
  const btn = document.getElementById('signupBtn');
  
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;
  errorEl.textContent = '';
  
  try {
    const apiUrl = typeof CONFIG !== 'undefined' ? CONFIG.API_URL : 'http://localhost:5000/api';
    console.log('Signup API URL:', apiUrl);
    
    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, password, app: 'contextswitch' })
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Registration failed');
    }
    
    // Auto-login after signup
    authToken = data.token;
    currentUser = data.user;
    await chrome.storage.local.set({ authToken: data.token, user: data.user });
    
    showAppView();
    await detectPlatform();
    await loadProjects();
    
  } catch (error) {
    console.error('Signup error:', error);
    errorEl.textContent = error.message || 'Connection failed. Check if server is running.';
  } finally {
    btn.innerHTML = 'Create Account';
    btn.disabled = false;
  }
}

async function handleLogout() {
  authToken = null;
  currentUser = null;
  await chrome.storage.local.remove(['authToken', 'user']);
  showAuthView();
}

// Update user stats bar with current user data
function updateUserStatsBar() {
  if (!currentUser) return;
  
  document.getElementById('userName').textContent = currentUser.name || 'User';
  
  const planEl = document.getElementById('userPlan');
  const plan = currentUser.subscription?.plan || 'free';
  planEl.textContent = plan.charAt(0).toUpperCase() + plan.slice(1);
  planEl.className = 'user-plan ' + plan;
  
  const usage = currentUser.usage || {};
  document.getElementById('statCompressions').textContent = usage.totalCompressions || 0;
  document.getElementById('statTokens').textContent = formatNumber(usage.totalTokensSaved || 0);
}

// Format large numbers (e.g., 1500 -> 1.5K)
function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

// Fetch fresh user stats from server
async function fetchUserStats() {
  try {
    const apiUrl = typeof CONFIG !== 'undefined' ? CONFIG.API_URL : 'http://localhost:5000/api';
    const response = await fetch(`${apiUrl}/user/stats`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Update currentUser with fresh data
      currentUser.usage = data.data.usage;
      currentUser.subscription = data.data.subscription;
      currentUser.limits = data.data.limits;
      
      // Save updated user data
      await chrome.storage.local.set({ user: currentUser });
      
      // Update UI
      updateUserStatsBar();
    }
  } catch (error) {
    console.error('Failed to fetch user stats:', error);
  }
}

// Profile Modal functions
async function openProfileModal() {
  // Fetch fresh profile data
  try {
    const apiUrl = typeof CONFIG !== 'undefined' ? CONFIG.API_URL : 'http://localhost:5000/api';
    const response = await fetch(`${apiUrl}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      const { user, subscription, usage, limits } = data.data;
      
      // Update profile modal UI
      document.getElementById('profileAvatar').textContent = (user.name || 'U').charAt(0).toUpperCase();
      document.getElementById('profileName').textContent = user.name || 'User';
      document.getElementById('profileEmail').textContent = user.email || '';
      
      const planBadge = document.getElementById('profilePlanBadge');
      const plan = subscription?.plan || 'free';
      planBadge.textContent = plan.charAt(0).toUpperCase() + plan.slice(1);
      planBadge.className = 'plan-badge ' + plan;
      
      document.getElementById('profileTotalCompressions').textContent = usage?.totalCompressions || 0;
      document.getElementById('profileMonthlyCompressions').textContent = usage?.monthlyCompressions || 0;
      document.getElementById('profileTokensSaved').textContent = formatNumber(usage?.totalTokensSaved || 0);
      document.getElementById('profileContextsSaved').textContent = usage?.totalContextsSaved || 0;
      
      document.getElementById('profileUsedCompressions').textContent = usage?.monthlyCompressions || 0;
      document.getElementById('profileMaxCompressions').textContent = limits?.maxCompressionsPerMonth || 50;
      
      // Update local user data
      currentUser.usage = usage;
      currentUser.subscription = subscription;
      currentUser.limits = limits;
      await chrome.storage.local.set({ user: currentUser });
      updateUserStatsBar();
    }
  } catch (error) {
    console.error('Failed to fetch profile:', error);
  }
  
  document.getElementById('profileModal').classList.add('active');
}

function closeProfileModal() {
  document.getElementById('profileModal').classList.remove('active');
}

function handleProjectAction(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  
  const card = btn.closest('.project-card');
  const projectId = card.dataset.projectId;
  
  if (btn.dataset.action === 'load') {
    openLoadModal(projectId);
  } else if (btn.dataset.action === 'delete') {
    openDeleteModal(projectId);
  }
}

function openSaveModal() {
  document.getElementById('saveModal').classList.add('active');
  document.getElementById('projectNameInput').value = '';
  document.getElementById('projectNameInput').focus();
}

function closeSaveModal() {
  document.getElementById('saveModal').classList.remove('active');
}

// Open compress modal with project list
async function openCompressModal() {
  const result = await chrome.storage.local.get('projects');
  const projects = result.projects || [];
  
  if (projects.length === 0) {
    showToast('No saved projects to compress', 'error');
    return;
  }
  
  const listEl = document.getElementById('compressProjectList');
  listEl.innerHTML = '';
  selectedCompressProjectId = null;
  document.getElementById('confirmCompressBtn').disabled = true;
  
  projects.forEach(project => {
    const item = document.createElement('div');
    item.className = 'compress-project-item' + (project.compressedContext ? ' compressed' : '');
    item.dataset.projectId = project.id;
    item.style.cssText = 'display: grid; grid-template-columns: 24px 1fr; align-items: center; gap: 10px;';
    
    const messageCount = project.messages ? project.messages.length : 0;
    const date = new Date(project.savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const compressedBadge = project.compressedContext ? '<span class="compressed-badge">✓ Compressed</span>' : '';
    
    item.innerHTML = `
      <input type="radio" name="compressProject" class="compress-project-radio" ${project.compressedContext ? 'disabled' : ''}>
      <div class="compress-project-info">
        <div class="compress-project-name">${escapeHtml(project.name)} ${compressedBadge}</div>
        <div class="compress-project-meta">${messageCount} messages • ${project.platform} • ${date}</div>
      </div>
    `;
    
    if (!project.compressedContext) {
      item.addEventListener('click', () => selectCompressProject(project.id));
    }
    
    listEl.appendChild(item);
  });
  
  document.getElementById('compressModal').classList.add('active');
}

function selectCompressProject(projectId) {
  selectedCompressProjectId = projectId;
  
  document.querySelectorAll('.compress-project-item').forEach(item => {
    const isSelected = item.dataset.projectId === projectId;
    item.classList.toggle('selected', isSelected);
    const radio = item.querySelector('.compress-project-radio');
    if (radio && !radio.disabled) radio.checked = isSelected;
  });
  
  document.getElementById('confirmCompressBtn').disabled = false;
}

function closeCompressModal() {
  document.getElementById('compressModal').classList.remove('active');
  selectedCompressProjectId = null;
}

async function compressSelectedProject() {
  if (!selectedCompressProjectId) return;
  
  const confirmBtn = document.getElementById('confirmCompressBtn');
  confirmBtn.innerHTML = '<span class="spinner"></span> Compressing...';
  confirmBtn.disabled = true;
  
  try {
    const result = await chrome.storage.local.get('projects');
    let projects = result.projects || [];
    const projectIndex = projects.findIndex(p => p.id === selectedCompressProjectId);
    
    if (projectIndex === -1) {
      showToast('Project not found', 'error');
      return;
    }
    
    const project = projects[projectIndex];
    
    // Call backend API to compress
    const response = await fetch(`${CONFIG.API_URL}/compress`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        messages: project.messages,
        projectName: project.name,
        platform: project.platform || 'other'
      })
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Compression failed');
    }
    
    // Update project with compressed context
    projects[projectIndex].compressedContext = data.data.compressedContext;
    projects[projectIndex].compressionStats = data.data.stats;
    projects[projectIndex].compressedAt = Date.now();
    
    await chrome.storage.local.set({ projects });
    
    closeCompressModal();
    await loadProjects();
    
    // Refresh user stats after compression
    await fetchUserStats();
    
    const stats = data.data.stats;
    showToast(`Compressed! ${stats.compressionRatio}% smaller`, 'success');
    
    // Show info
    const infoBox = document.getElementById('infoBox');
    const infoText = document.getElementById('infoText');
    infoText.innerHTML = `<strong>✓ Compressed!</strong> Original: ${stats.originalLength} chars → Compressed: ${stats.compressedLength} chars (${stats.compressionRatio}% reduction). Use "Load Compressed" when loading.`;
    infoBox.style.display = 'block';
    
  } catch (error) {
    console.error('Compression error:', error);
    showToast('Compression failed: ' + error.message, 'error');
  } finally {
    confirmBtn.innerHTML = 'Compress Selected';
    confirmBtn.disabled = false;
  }
}

async function saveContext() {
  const nameInput = document.getElementById('projectNameInput');
  const name = nameInput.value.trim();
  
  if (!name) {
    showToast('Please enter a project name', 'error');
    nameInput.focus();
    return;
  }
  
  const confirmBtn = document.getElementById('confirmSaveBtn');
  confirmBtn.innerHTML = '<span class="spinner"></span>';
  confirmBtn.disabled = true;
  
  try {
    // Inject and execute scraping script
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: currentTabId },
      func: scrapeMessages,
      args: [currentPlatform]
    });
    
    const messages = result.result;
    
    if (!messages || messages.length === 0) {
      showToast('No messages found to save', 'error');
      return;
    }
    
    // Create project object
    const project = {
      id: generateId(),
      name: name,
      platform: currentPlatform,
      messages: messages,
      savedAt: Date.now()
    };
    
    // Save to storage
    const storageResult = await chrome.storage.local.get('projects');
    const projects = storageResult.projects || [];
    projects.push(project);
    await chrome.storage.local.set({ projects });
    
    closeSaveModal();
    await loadProjects();
    showToast(`Saved "${name}" with ${messages.length} messages`, 'success');
  } catch (error) {
    console.error('Error saving context:', error);
    showToast('Failed to save context: ' + error.message, 'error');
  } finally {
    confirmBtn.innerHTML = 'Save';
    confirmBtn.disabled = false;
  }
}

function scrapeMessages(platform) {
  const messages = [];
  
  if (platform === 'chatgpt') {
    // ChatGPT message structure
    const messageGroups = document.querySelectorAll('[data-message-author-role]');
    messageGroups.forEach(group => {
      const role = group.getAttribute('data-message-author-role');
      const contentEl = group.querySelector('.markdown, .whitespace-pre-wrap');
      if (contentEl) {
        messages.push({
          role: role === 'user' ? 'user' : 'assistant',
          content: contentEl.innerText.trim()
        });
      }
    });
    
    // Fallback for different ChatGPT layouts
    if (messages.length === 0) {
      const turns = document.querySelectorAll('[class*="agent-turn"], [class*="user-turn"]');
      turns.forEach(turn => {
        const isUser = turn.className.includes('user');
        const content = turn.querySelector('.markdown, .whitespace-pre-wrap, [class*="message-content"]');
        if (content) {
          messages.push({
            role: isUser ? 'user' : 'assistant',
            content: content.innerText.trim()
          });
        }
      });
    }
  } else if (platform === 'claude') {
    // Claude message structure
    const humanMessages = document.querySelectorAll('[class*="human-turn"], [data-testid*="human"], .font-user-message');
    const assistantMessages = document.querySelectorAll('[class*="assistant-turn"], [data-testid*="assistant"], .font-claude-message');
    
    // Try to get interleaved messages
    const allMessages = document.querySelectorAll('[class*="Message"], [class*="message-row"]');
    allMessages.forEach(msg => {
      const isHuman = msg.className.includes('human') || msg.querySelector('[class*="human"]');
      const contentEl = msg.querySelector('[class*="contents"], [class*="message-content"], .prose');
      if (contentEl) {
        messages.push({
          role: isHuman ? 'user' : 'assistant',
          content: contentEl.innerText.trim()
        });
      }
    });
    
    // Fallback approach for Claude
    if (messages.length === 0) {
      const containers = document.querySelectorAll('.prose, [class*="ConversationItem"]');
      let lastRole = null;
      containers.forEach(container => {
        const text = container.innerText.trim();
        if (text) {
          const role = lastRole === 'user' ? 'assistant' : 'user';
          lastRole = role;
          messages.push({ role, content: text });
        }
      });
    }
  } else if (platform === 'gemini') {
    // Gemini message structure
    const userMessages = document.querySelectorAll('[class*="user-message"], [class*="query-content"], .query-text');
    const modelMessages = document.querySelectorAll('[class*="model-response"], [class*="response-content"], .response-text');
    
    // Try combined approach
    const turns = document.querySelectorAll('[class*="conversation-turn"], [class*="chat-turn"]');
    turns.forEach(turn => {
      const isUser = turn.className.includes('user') || turn.querySelector('[class*="user"]');
      const content = turn.querySelector('[class*="content"], [class*="text"], .markdown-main-panel');
      if (content) {
        messages.push({
          role: isUser ? 'user' : 'assistant',
          content: content.innerText.trim()
        });
      }
    });
    
    // Alternative Gemini selectors
    if (messages.length === 0) {
      const queryBubbles = document.querySelectorAll('user-query, .user-query');
      const responseBubbles = document.querySelectorAll('model-response, .model-response');
      
      const maxLen = Math.max(queryBubbles.length, responseBubbles.length);
      for (let i = 0; i < maxLen; i++) {
        if (queryBubbles[i]) {
          messages.push({
            role: 'user',
            content: queryBubbles[i].innerText.trim()
          });
        }
        if (responseBubbles[i]) {
          messages.push({
            role: 'assistant',
            content: responseBubbles[i].innerText.trim()
          });
        }
      }
    }
  }
  
  return messages;
}

function openLoadModal(projectId) {
  selectedProjectId = projectId;
  document.getElementById('loadModal').classList.add('active');
}

function closeLoadModal() {
  document.getElementById('loadModal').classList.remove('active');
  selectedProjectId = null;
}

async function loadContext(mode) {
  if (!selectedProjectId) return;
  
  const loadFullBtn = document.getElementById('loadFullBtn');
  const loadCompressedBtn = document.getElementById('loadCompressedBtn');
  const targetBtn = mode === 'full' ? loadFullBtn : loadCompressedBtn;
  
  targetBtn.innerHTML = '<span class="spinner"></span>';
  loadFullBtn.disabled = true;
  loadCompressedBtn.disabled = true;
  
  try {
    const result = await chrome.storage.local.get('projects');
    const projects = result.projects || [];
    const project = projects.find(p => p.id === selectedProjectId);
    
    if (!project) {
      showToast('Project not found', 'error');
      return;
    }
    
    let contextText;
    
    if (mode === 'compressed') {
      // Use AI-compressed version if available, otherwise generate structured format
      if (project.compressedContext) {
        contextText = `[CONTEXT SWITCH - AI Compressed Context]

The following is an AI-compressed summary of a previous conversation. Please parse it and continue helping me from where we left off.

${project.compressedContext}

---
Please acknowledge that you understand this context and are ready to continue.`;
      } else {
        showToast('Project not compressed yet. Use Compress button first.', 'error');
        return;
      }
    } else {
      contextText = generateFullContext(project);
    }
    
    // Inject into chat input
    await chrome.scripting.executeScript({
      target: { tabId: currentTabId },
      func: pasteIntoChat,
      args: [contextText, currentPlatform]
    });
    
    closeLoadModal();
    showToast('Context loaded and pasted!', 'success');
  } catch (error) {
    console.error('Error loading context:', error);
    showToast('Failed to load context: ' + error.message, 'error');
  } finally {
    loadFullBtn.innerHTML = '<span class="option-title">Load Full Context</span><span class="option-desc">Paste entire conversation history</span>';
    loadCompressedBtn.innerHTML = '<span class="option-title">Load Compressed</span><span class="option-desc">AI-optimized compact format</span>';
    loadFullBtn.disabled = false;
    loadCompressedBtn.disabled = false;
  }
}

// Generate FULL conversation context (no truncation)
function generateFullContext(project) {
  const messages = project.messages;
  const userMessages = messages.filter(m => m.role === 'user');
  const assistantMessages = messages.filter(m => m.role === 'assistant');
  
  let context = `[CONTEXT SWITCH - Full Conversation History]

Project: ${project.name}
Original Platform: ${project.platform.toUpperCase()}
Total Messages: ${messages.length} (${userMessages.length} user, ${assistantMessages.length} assistant)
Saved: ${new Date(project.savedAt).toLocaleString()}

${'='.repeat(50)}
FULL CONVERSATION TRANSCRIPT
${'='.repeat(50)}

`;

  // Include ALL messages with full content
  messages.forEach((msg, i) => {
    const role = msg.role === 'user' ? 'USER' : 'ASSISTANT';
    context += `--- ${role} [${i + 1}/${messages.length}] ---\n`;
    context += msg.content;
    context += '\n\n';
  });

  context += `${'='.repeat(50)}
END OF PREVIOUS CONVERSATION
${'='.repeat(50)}

I've switched sessions due to rate limits. The above is my COMPLETE conversation history. Please continue helping me with this project from where we left off.`;

  return context;
}

function pasteIntoChat(text, platform) {
  let inputEl = null;
  
  if (platform === 'chatgpt') {
    inputEl = document.querySelector('textarea[data-id], #prompt-textarea, textarea[placeholder*="Message"]');
  } else if (platform === 'claude') {
    inputEl = document.querySelector('[contenteditable="true"], .ProseMirror, textarea');
  } else if (platform === 'gemini') {
    inputEl = document.querySelector('[contenteditable="true"], .ql-editor, textarea, .text-input-field');
  }
  
  if (inputEl) {
    if (inputEl.tagName === 'TEXTAREA') {
      inputEl.value = text;
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      inputEl.innerText = text;
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    }
    inputEl.focus();
    return true;
  }
  
  // Fallback: copy to clipboard
  navigator.clipboard.writeText(text);
  return false;
}

function openDeleteModal(projectId) {
  selectedProjectId = projectId;
  document.getElementById('deleteModal').classList.add('active');
}

function closeDeleteModal() {
  document.getElementById('deleteModal').classList.remove('active');
  selectedProjectId = null;
}

async function deleteProject() {
  if (!selectedProjectId) return;
  
  try {
    const result = await chrome.storage.local.get('projects');
    let projects = result.projects || [];
    const projectName = projects.find(p => p.id === selectedProjectId)?.name;
    
    projects = projects.filter(p => p.id !== selectedProjectId);
    await chrome.storage.local.set({ projects });
    
    closeDeleteModal();
    await loadProjects();
    showToast(`Deleted "${projectName}"`, 'success');
  } catch (error) {
    console.error('Error deleting project:', error);
    showToast('Failed to delete project', 'error');
  }
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  toast.className = 'toast ' + type;
  toastMessage.textContent = message;
  
  toast.classList.add('active');
  
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}
