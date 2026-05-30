export default defineContentScript({
  matches: ["https://turbo-pvz.ozon.ru/*"],
  async main() {
    async function runScript() {}

    let lastURL = "";
    // Отслеживание изменений DOM для SPA-навигации Ozon
    new MutationObserver(async () => {
      const curURL = location.href;

      if (lastURL !== curURL) {
        lastURL = curURL;
        await runScript();
      }
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Реакция на изменение настроек из Popup-окна в реальном времени
    chrome.storage.onChanged.addListener(async (message) => {
      if (message.offAutoscripts && message.offAutoscripts.newValue) {
        await runScript();
      }
    });
  },
});
