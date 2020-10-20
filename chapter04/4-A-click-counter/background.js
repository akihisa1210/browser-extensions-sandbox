chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  switch (data.type) {
    case "click":
      chrome.storage.local.get({ count: 0 }, ({ count }) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
        }

        chrome.storage.local.set({ count: count + 1 });
        chrome.browserAction.setBadgeText(
          { text: String(count + 1) }
        );
      });
  }
});
