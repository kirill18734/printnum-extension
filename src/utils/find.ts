// Функция поиска с автоматическим ожиданием
export async function searchSelector(selector, timeout = 5000) {
  return waitLoadElement(selector, timeout);
}

// Эффективное ожидание элемента через MutationObserver
export function waitLoadElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    // 1. Проверяем, может элемент уже есть на странице
    const element = document.querySelector(selector);
    if (element) return resolve(element);

    // 2. Если элемента нет, запускаем слежку за DOM
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearTimeout(timer);
        observer.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // 3. Ограничиваем время ожидания
    const timer = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Элемент ${selector} не найден за ${timeout}мс`));
    }, timeout);
  });
}
