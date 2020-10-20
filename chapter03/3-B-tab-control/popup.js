const closeCurrentTab = () => {
  chrome.tabs.query({ currentWindow: true, active: true },
    (tabs) => {
      const tab = tabs[0];
      chrome.tabs.remove(tab.id);
    });
};

const duplicateCurrentTab = () => {
  chrome.tabs.query({ currentWindow: true, active: true },
    (tabs) => {
      const tab = tabs[0];
      chrome.tabs.duplicate(tab.id);
    });
};

const pinCurrentTab = () => {
  chrome.tabs.query({ currentWindow: true, active: true },
    (tabs) => {
      const tab = tabs[0];
      chrome.tabs.update(tab.id, { pinned: true });
    });
};

document.getElementById("close-button")
  .addEventListener("click", closeCurrentTab);
document.getElementById("duplication-button")
  .addEventListener("click", duplicateCurrentTab);
document.getElementById("pin-button")
  .addEventListener("click", pinCurrentTab);
