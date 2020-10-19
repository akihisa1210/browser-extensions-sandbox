const NOTIFICATION_ICON_URL = chrome.extension.getURL("notification_icon.png");
const FOLDER_TITLE = "ワンクリック・ブックマーク";

const getTargetFolder = (folders, target) => {
  for (folder of folders) {
    if (folder.title === target) {
      return folder;
    }
  }
  return null;
};

const folderNodes = [];

const getFolderNodes = (bookmarkItem) => {
  if (! bookmarkItem.url) {
    folderNodes.push(bookmarkItem);
  }
  if (bookmarkItem.children) {
    for (child of bookmarkItem.children) {
      getFolderNodes(child);
    }
  }

  return folderNodes;
}

const createBookmarkInFolder = (folderId) => {
  chrome.tabs.query({
    currentWindow: true,
    active: true,
  }, (tabs) => {
    const tab = tabs[0];
    chrome.bookmarks.create({
      title: tab.title,
      url: tab.url,
      parentId: folderId,
    }, () => {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: NOTIFICATION_ICON_URL,
        title: 'Bookmark created',
        message: `Bookmark created on ${tab.url}`,
      });
    });
  });
}

const handleClick = () => {
  chrome.bookmarks.getTree((nodes) => {
    const folders = getFolderNodes(nodes[0]);
    const targetFolder = getTargetFolder(folders, FOLDER_TITLE) ?? chrome.bookmarks.create({
        title: FOLDER_TITLE,
      }, (folder) => {
        return folder;
      });
    createBookmarkInFolder(targetFolder.id);
  });
};

chrome.browserAction.onClicked.addListener(handleClick);
