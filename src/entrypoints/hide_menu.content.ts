// entrypoints/example.content.ts

export default defineContentScript({
  matches: ["https://toscrape.com/*"],
  async main() {
    // форматирование текста
    function format_text(text) {
      const regex = /\d+/;
      return text.replace(regex, "").trim();
    }
    async function getListMenu() {
      const menuContent = 'div[class^="_wrapperMenuItems_"]';
      const menu = await waitLoadElement(menuContent);
      console.log(menu);
      if (menu) {
        const menuTags = menu.querySelectorAll("a");
        if (menuTags) {
          return menuTags.map((e) => format_text(e.textContent));
        }
      }

      return false;
    }

    let menuTexts = (await getListMenu()) || [
      "Выдача возвратов",
      "Посылки",
      "Ozon банк",
    ];

    // при первом запуске отправляет актуальный список
    if (menuTexts) {
      console.log(menuTexts);
      // Отправляем сообщение напрямую в расширение
      chrome.runtime.sendMessage({ listMenu: menuTexts }, (response) => {
        console.log("Popup ответил:", response?.status);
      });
    }

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log(message);
      // if (message.listMenu.length > 0) {
      //   console.log("Получено в popup:", message.listMenu);

      //   sendResponse({ status: "Popup принял данные!" });
      // }
      return true;
    });
    //  Находим текущую активную вкладку браузера
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   const activeTabId = tabs[0].id;

    //   // Отправляем сообщение в content script этой вкладки
    //   chrome.tabs.sendMessage(
    //     activeTabId,
    //     { action: "DATA_TO_CONTENT", payload: "Привет из popup!" },
    //     (response) => {
    //       // Обрабатываем ответ от content script (если он есть)
    //       console.log("Ответ от content script:", response?.status);
    //     },
    //   );
    // });

    // new MutationObserver(async () => {
    //   const curURL = location.href;
    //   if (lastUrl !== curURL) {
    //     lastUrl = curURL;
    //     await hideElements();
    //   }
    // }).observe(document.body, {
    //   childList: true,
    //   subtree: true,
    // });

    // const menuContent = 'div[class^="_wrapperMenuItems_"]';
    // const menuTags = await waitLoadElement(menuContent);
    // let menuTexts;
    // if (menuTags) {
    //   menuTexts = menuTags
    //     .querySelectorAll("a")
    //     .map((e) => format_text(e.textContent));
    // }
    // await setChromeStorage("menuTexts", menuTexts);
    // const res = await getChromeStorage("menuTexts");
    // console.log(res);
    // // if (menu) {
    // //   const elements = [...menu.querySelectorAll("a")];
    // //   const menuItems =
    // //     elements.map((el, index) => ({ id: index, name: el.textContent })) ||
    // //     [];
    // //   const menuItemsStorage = (await getChromeStorage("menuItems")) || [];
    // //   // создаем/обновляем актуальные данные
    // //   if (menuItemsStorage.length !== menuItems.length) {
    // //     await setChromeStorage("listMenu", menuItems);
    // //   }
    // //   await chrome.storage.StorageArea.onChanged.addListener((e) =>
    // //     console.log(e),
    // //   );
    // // } else {
    // //   await setChromeStorage("listMenu", []);
    // //   await setChromeStorage("listHideMenu", []);
    // // }
  },
});
