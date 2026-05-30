import { notifications } from "@/utils/configNotification";

export default defineContentScript({
  matches: ["https://turbo-pvz.ozon.ru/*"],
  async main() {
    const container = "#ozi-notifications-container";

    async function changeData(pathname = location.pathname) {
      const storeOff = (await getChromeStorage("offNotification")) || [];
      const item = notifications.find((itemUrl) =>
       pathname.startsWith(itemUrl.url),
      );

      // Дожидаемся контейнера в любом случае, чтобы управлять его видимостью
      await waitLoadElement(container).then((element) => {
        if (item) {
          // Если страница в конфиге — скрываем, только если её ID сохранен в offNotification
          element.style.display = storeOff.includes(item.id) ? "none" : "";
        } else {
          // Если страница не в конфиге — принудительно показываем контейнер (сбрасываем скрытие)
          element.style.display = "";
        }
      });
    }

    navigation.addEventListener("navigate", async (event) => {
      const pathname = new URL(event.destination.url).pathname;
      await changeData(pathname);
    });

    // Реакция на изменение настроек из Popup-окна в реальном времени
    chrome.storage.onChanged.addListener(async (message) => {
      if (message.offNotification && message.offNotification.newValue) {
        await changeData();
      }
    });
  },
});
