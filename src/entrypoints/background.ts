export default defineBackground(() => {
  chrome.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      const data = message.listMenu || [];
      console.log(sender);
      if (data.length > 0) {
        console.log("Получено в popup:", message.listMenu);
        // await setChromeStorage('listMenu', message.listMenu)
        sendResponse({ status: "OK" });
      }
      return true;
    },
  );
});
