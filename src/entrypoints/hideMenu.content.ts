export default defineContentScript({
  matches: ["https://turbo-pvz.ozon.ru/*"],

  async main() {
    const container = 'div[class^="_wrapperMenuItems_"]';
    // // форматирование текста
    function format_text(text) {
      const regex = /\d+/;
      return text.replace(regex, "").trim();
    }

    async function changeData() {
      const store = (await getChromeStorage("menu")) || [];
      const storeOff = (await getChromeStorage("offMenu")) || [];

      await waitLoadElement(container).then(async (elem) => {
        const items = [...elem.querySelectorAll("a")];
        const itemsValue = items.map((e) => format_text(e.textContent));

        if (JSON.stringify(itemsValue) !== JSON.stringify(store)) {
          await setChromeStorage("menu", itemsValue);
        }

        //скрытие/показ элементов
        items.forEach((item) => {
          const text = format_text(item.textContent);
          const isHidden = storeOff.includes(text);
          item.style.display = isHidden ? "none" : "";
        });
      });
    }

    navigation.addEventListener("navigate", async (event) => {
      await changeData();
    });

    chrome.storage.onChanged.addListener(async (message) => {
      if (message.offMenu && message.offMenu.newValue) {
        await changeData();
      }
    });
  },
});
