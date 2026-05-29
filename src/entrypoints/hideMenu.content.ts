// entrypoints/example.content.ts

export default defineContentScript({
  matches: ["https://turbo-pvz.ozon.ru/*"],
  async main() {
    const container = 'div[class^="_wrapperMenuItems_"]';
    // форматирование текста
    function format_text(text) {
      const regex = /\d+/;
      return text.replace(regex, "").trim();
    }

    async function changeMenu() {
      const storeHideMenu = (await getChromeStorage("hideMenu")) || [];
      const storeMenu = (await getChromeStorage("menu")) || [];

      await waitLoadElement(container).then(async (element) => {
        const menuItems = [...element.querySelectorAll("a")];
        const itemsValue = menuItems.map((e) => format_text(e.textContent));
        // обновление старого списка из хранилища
        if (JSON.stringify(itemsValue) !== JSON.stringify(storeMenu)) {
          await setChromeStorage("menu", itemsValue);
        }

        //скрытие/показ элементов
        menuItems.forEach((item) => {
          const text = format_text(item.textContent);
          const isHidden = storeHideMenu.includes(text);
          item.style.display = isHidden ? "none" : "";
        });
      });
    }

    let lastURL = "";
    // Сначала дожидаемся появления контейнера меню на странице
    waitLoadElement(container).then((menuContainer) => {
      const observer = new MutationObserver(async () => {
        const curURL = location.href;

        if (lastURL !== curURL) {
          lastURL = curURL;
          await changeMenu();
        }
      });

      // Наблюдаем ТОЛЬКО за контейнером меню, а не за всем сайтом
      observer.observe(menuContainer, {
        childList: true, // следим за добавлением/удалением ссылок
        subtree: true, // следим за изменениями внутри этих ссылок (например, счетчиков)
      });
    });

    chrome.storage.onChanged.addListener(async (message) => {
      if (message.hideMenu) {
        await changeMenu();
      }
    });
  },
});
