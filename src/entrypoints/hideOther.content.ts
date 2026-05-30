import { others } from "@/utils/configOther";

export default defineContentScript({
  matches: ["https://turbo-pvz.ozon.ru/*"],

  async main() {
    async function changeData(pathname = location.pathname) {
      const storeOff = (await getChromeStorage("offOther")) || [];
      const item = others.find((item) => pathname == item.url);

      if (item) {
        await waitLoadElement(item.selector).then((element) => {
          // Если страница в конфиге — скрываем, только если её ID сохранен в offNotification
          element.style.display = storeOff.includes(item.id) ? "none" : "";
        });
      }
    }

    navigation.addEventListener("navigate", async (event) => {
      const pathname = new URL(event.destination.url).pathname;
      await changeData(pathname);
    });

    // Реакция на изменение настроек из Popup-окна в реальном времени
    chrome.storage.onChanged.addListener(async (message) => {
      if (message.offOther && message.offOther.newValue) {
        await changeData();
      }
    });
  },
});
