export async function getChromeStorage(key) {
  const result = await chrome.storage.local.get([key]);
  return result[key];
}

export async function getKeysChromeStorage() {
  return await chrome.storage.local.getKeys();
}

export async function setChromeStorage(keyName, value) {
  await chrome.storage.local.set({ [keyName]: value });
}

export async function clearChromeStorage() {
  await chrome.storage.local.clear();
}
