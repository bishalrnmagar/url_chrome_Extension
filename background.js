chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the tab is fully loaded and the URL is a YouTube video
    if (changeInfo.status === 'complete' && tab.url) {
      const url = new URL(tab.url);
  
      // Check if the URL is a YouTube video (contains /watch) and does not end with a /
      if (url.hostname.includes('youtube.com') && url.pathname === '/watch' && !tab.url.endsWith('/')) {
  
        // Retrieve from chrome.storage.local if the slash has already been added for this tabId
        chrome.storage.local.get([tabId.toString()], (result) => {
          if (!result[tabId]) {  // If the slash has not been added yet
            const updatedUrl = tab.url + '/';
  
            // Update the tab with the modified URL (with the trailing slash)
            chrome.tabs.update(tabId, { url: updatedUrl });
  
            // Mark that the slash has been added for this tab
            let data = {};
            data[tabId] = true;
            chrome.storage.local.set(data);
  
            console.log("Added trailing slash to YouTube video URL:", updatedUrl);
          }
        });
      }
    }
  
    // Detect when the URL of the tab has changed
    if (changeInfo.url) {
      console.log(`Tab URL changed to: ${changeInfo.url}`);
    }
  
    // Optionally, you can clear the flag when the tab is closed
    chrome.tabs.onRemoved.addListener((closedTabId) => {
      chrome.storage.local.remove(closedTabId.toString());  // Remove the tracking for this tabId
    });
  });
  