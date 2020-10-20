export function getVisitCount(url) {
  return new Promise((resolve) => {
    chrome.history.getVisits({ url }, (visits) => {
      resolve(visits.length);
    });
  });
}

export function getTabCount(url) {
  return new Promise((resolve) => {
    chrome.tabs.query({ url }, (tabs) => {
      resolve(tabs.length);
    });
  });
}
