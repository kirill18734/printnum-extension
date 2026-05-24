export async function getChromeStorage(key) {
  const result = await chrome.storage.local.get([key]);
  return result[key];
}

export async function getKeysChromeStorage() {
  return await chrome.storage.local.getKeys();
}

export async function setChromeStorage(key, value) {
  await chrome.storage.local.set({ key: value });
}

export async function clearChromeStorage() {
  await chrome.storage.local.clear();
}
