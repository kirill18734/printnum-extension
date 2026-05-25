// entrypoints/example.content.ts

export default defineContentScript({
  matches: ["https://turbo-pvz.ozon.ru/*"],
  async main() {
    let lastUrl = "";
    // форматирование текста
    function format_text(text) {
      const regex = /\d+/;
      return text.replace(regex, "").trim();
    }

    async function hideElements() {
      const menuContent = 'div[class^="_wrapperMenuItems_"]';
      const menu = await waitLoadElement(menuContent);

      let menuTags;
      if (menu) menuTags = menu.querySelectorAll("a");

      let menuTexts;
      if (menuTags) {
        menuTexts = menuTags.map((e) => format_text(e.textContent));
      } 
    }

    new MutationObserver(async () => {
      const curURL = location.href;
      if (lastUrl !== curURL) {
        lastUrl = curURL;
        await hideElements();
      }
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });

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
