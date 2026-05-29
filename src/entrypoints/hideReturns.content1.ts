export default defineContentScript({
  matches: ["https://turbo-pvz.ozon.ru/outbound*"],
  async main() {
    async function changeReturns() {
      // Селектор для поиска с ожиданием:
      const container =
        'div[class^="_outboundLayout_"] div[class^="_block_"]:nth-of-type(2)';
      const storeOffReturns = (await getChromeStorage("offReturns")) || [];
      const storeReturns = (await getChromeStorage("returns")) || [];

      await waitLoadElement(container).then(async (element) => {
        if (element.textContent.includes("Добавьте содержимое в перевозку")) {
          const returnsItems = [
            ...element.querySelectorAll('div[class*="_itemsElement_"]'),
          ];
          const itemsValue = [
            ...new Set(
              returnsItems.map(
                (e) => e.querySelector('div[class^="_titleWrap_"]').textContent,
              ),
            ),
          ];

          // обновление старого списка из хранилища
          if (JSON.stringify(itemsValue) !== JSON.stringify(storeReturns)) {
            await setChromeStorage("returns", itemsValue);
          }

          //скрытие/показ элементов
          returnsItems.forEach((item) => {
            const text = item.querySelector(
              'div[class^="_titleWrap_"]',
            ).textContent;
            const isHidden = storeOffReturns.includes(text);
            item.style.display = isHidden ? "none" : "";
          });
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
