// ContextSwitch Background Service Worker

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('[ContextSwitch] Extension installed');
    
    // Initialize storage
    chrome.storage.local.set({ projects: [] });
  } else if (details.reason === 'update') {
    console.log('[ContextSwitch] Extension updated to version', chrome.runtime.getManifest().version);
  }
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getProjects') {
    chrome.storage.local.get('projects', (result) => {
      sendResponse({ projects: result.projects || [] });
    });
    return true;
  }
  
  if (request.action === 'saveProject') {
    chrome.storage.local.get('projects', (result) => {
      const projects = result.projects || [];
      projects.push(request.project);
      chrome.storage.local.set({ projects }, () => {
        sendResponse({ success: true });
      });
    });
    return true;
  }
  
  if (request.action === 'deleteProject') {
    chrome.storage.local.get('projects', (result) => {
      let projects = result.projects || [];
      projects = projects.filter(p => p.id !== request.projectId);
      chrome.storage.local.set({ projects }, () => {
        sendResponse({ success: true });
      });
    });
    return true;
  }
  
  if (request.action === 'exportProjects') {
    chrome.storage.local.get('projects', (result) => {
      sendResponse({ 
        data: JSON.stringify(result.projects || [], null, 2) 
      });
    });
    return true;
  }
  
  if (request.action === 'importProjects') {
    try {
      const importedProjects = JSON.parse(request.data);
      chrome.storage.local.get('projects', (result) => {
        const existingProjects = result.projects || [];
        const mergedProjects = [...existingProjects, ...importedProjects];
        chrome.storage.local.set({ projects: mergedProjects }, () => {
          sendResponse({ success: true, count: importedProjects.length });
        });
      });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
    return true;
  }
});

// Handle browser action click (when popup is not available)
chrome.action.onClicked.addListener((tab) => {
  // This won't fire if default_popup is set, but keeping for reference
  console.log('[ContextSwitch] Extension icon clicked on tab:', tab.url);
});

// Log storage changes for debugging
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.projects) {
    const newCount = changes.projects.newValue?.length || 0;
    const oldCount = changes.projects.oldValue?.length || 0;
    console.log(`[ContextSwitch] Projects changed: ${oldCount} -> ${newCount}`);
  }
});
