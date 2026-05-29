import { notifications } from "@/utils/configNotification";

export default defineContentScript({
  matches: ["https://turbo-pvz.ozon.ru/*"],
  async main() {
    const container = "#ozi-notifications-container";

    async function changeNotification() {
      const offNotification = (await getChromeStorage("offNotification")) || [];
      const itemUrl = notifications.find((item) =>
        location.pathname.startsWith(item.url),
      );

      // Дожидаемся контейнера в любом случае, чтобы управлять его видимостью
      await waitLoadElement(container).then((element) => {
        if (itemUrl) {
          // Если страница в конфиге — скрываем, только если её ID сохранен в offNotification
          element.style.display = offNotification.includes(itemUrl.id)
            ? "none"
            : "";
        } else {
          // Если страница не в конфиге — принудительно показываем контейнер (сбрасываем скрытие)
          element.style.display = "";
        }
      });
    }

    let lastURL = "";
    // Отслеживание изменений DOM для SPA-навигации Ozon
    new MutationObserver(async () => {
      const curURL = location.href;

      if (lastURL !== curURL) {
        lastURL = curURL;
        await changeNotification();
      }
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Реакция на изменение настроек из Popup-окна в реальном времени
    chrome.storage.onChanged.addListener(async (message) => {
      if (message.offNotification && message.offNotification.newValue) {
        await changeNotification();
      }
    });
  },
});
