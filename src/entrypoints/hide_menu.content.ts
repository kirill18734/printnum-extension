// entrypoints/example.content.ts

export default defineContentScript({
  matches: ["https://turbo-pvz.ozon.ru/*"],
  async main() {
    // форматирование текста
    function format_text(text) {
      const regex = /\d+/;
      return text.replace(regex, "").trim();
    }

    const menuContent = 'div[class^="_wrapperMenuItems_"]';
    const menu = await searchSelector(menuContent);
    if (menu) {
      menu.querySelectorAll("a").forEach((element) => {
        const text = format_text(element.textContent);
        console.log(text);
      });
    }
  },
});
