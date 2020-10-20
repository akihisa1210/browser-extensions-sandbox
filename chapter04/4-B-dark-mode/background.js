const updateTab = (tabId, background, foreground) => {
  const code = `* {
    background-color: ${background} !important;
    color: ${foreground} !important;
  }`;
  chrome.tabs.insertCSS(tabId, { code });
};

const getSettings = (callback) => {
  chrome.storage.local.get({
    background: "#121212",
    foreground: "#ffffff",
  }, ({ background, foreground }) => {
    callback(background, foreground);
  });
}

const refreshAllTabs = () => {
  getSettings((background, foreground) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }

    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        updateTab(tab.id, background, foreground);
      });
    });
  });
}

chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo, tabInfo) => {
    if (changeInfo.status !== "loading") {
      return;
    }
    getSettings((background, foreground) => {
      updateTab(tabInfo.id, background, foreground);
    });
  }
);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") {
    return;
  }

  refreshAllTabs();
});

refreshAllTabs();
