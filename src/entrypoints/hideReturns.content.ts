export default defineContentScript({
  matches: ["https://turbo-pvz.ozon.ru/outbound*"],
  async main() {
    async function changeReturns() {
      // Селектор для поиска с ожиданием:
      const container =
        'div[class^="_outboundLayout_"] div[class^="_block_"]:nth-of-type(2)';

      await waitLoadElement(container).then(async (element) => {
        if (element.textContent.includes("Добавьте содержимое в перевозку")) {
          console.log(element);
        }
      });
    }

    let lastURL = "";
    // Отслеживание изменений DOM для SPA-навигации Ozon
    new MutationObserver(async () => {
      const curURL = location.href;

      if (lastURL !== curURL) {
        lastURL = curURL;
        await changeReturns();
      }
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Реакция на изменение настроек из Popup-окна в реальном времени
    chrome.storage.onChanged.addListener(async (message) => {
      if (message.offReturns && message.offReturns.newValue) {
        await changeReturns();
      }
    });
  },
});
