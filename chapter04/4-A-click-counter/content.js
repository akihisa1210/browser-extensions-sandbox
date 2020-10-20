window.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "click" });
});
