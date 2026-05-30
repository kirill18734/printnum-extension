export default defineContentScript({
  matches: ["https://turbo-pvz.ozon.ru/*"],

  async main() {
    // Вынесем селекторы наверх для удобного обновления
    const SELECTORS = {
      title: 'div[class^="_breadcrumbsTitle_"]',
      container: 'div[class^="_block_"]:nth-of-type(2)',
      item: 'div[class*="_itemsElement_"]',
      itemTitle: 'div[class^="_titleWrap_"]',
    };

    async function changeData() {
      const store = (await getChromeStorage("returns")) || [];
      const storeOff = (await getChromeStorage("offReturns")) || [];

      // Ожидаем элементы линейно и безопасно
      await waitLoadElement(SELECTORS.title);
      const element = await waitLoadElement(SELECTORS.container);

      if (
        !element ||
        !element.textContent.startsWith("Добавьте содержимое в перевозку")
      ) {
        return;
      }

      const returnsItems = [...element.querySelectorAll(SELECTORS.item)];

      // Безопасное извлечение текста с оператором опциональной последовательности (?.)
      const itemsValue = [
        ...new Set(
          returnsItems.map(
            (e) =>
              e.querySelector(SELECTORS.itemTitle)?.textContent?.trim() || "",
          ),
        ),
      ].filter(Boolean); // Удаляем пустые строки, если элемент не нашелся

      // Синхронизация с хранилищем
      if (JSON.stringify(itemsValue) !== JSON.stringify(store)) {
        await setChromeStorage("returns", itemsValue);
      }

      // Скрытие / показ
      returnsItems.forEach((item) => {
        const titleEl = item.querySelector(SELECTORS.itemTitle);
        if (!titleEl) return; // Защита от падения скрипта

        const text = titleEl.textContent.trim();
        const isHidden = storeOff.includes(text);
        item.style.display = isHidden ? "none" : "";
      });
    }

    navigation.addEventListener("navigate", async (event) => {
      const pathname = new URL(event.destination.url).pathname;
      if (pathname.startsWith("/outbound")) await changeData();
    });

    // Подписка на изменения из Popup
    chrome.storage.onChanged.addListener(async (message) => {
      if (message.offReturns && message.offReturns.newValue) {
        await changeData();
      }
    });
  },
});
