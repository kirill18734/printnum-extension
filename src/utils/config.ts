export const TEXT = {
  CONTINUE: "Продолжить",
  ISSUE: "Выдать",
  PAY: "Провести оплату",
  PAY_REPEAT: "Попробовать ещё",
  HOME: "На главную",
  READY: "К выдаче",
  CHECK: "Проверить",
  ONCHECK: "На проверке",
  RETURN_REASON_1: "Изменил решение о покупке/Товар не подошёл",
  RETURN_REASON_2: "Отказ получателя при вручении",
};

export const SELECTOR = {
  // пакеты
  M: 'div:nth-child(1) > [class^="ozi__input__root__"] button',
  L: 'div:nth-child(2) > [class^="ozi__input__root__"] button',
  // приемка
  RECEIVING: "[class^=ozi__toggle__toggle]",
  // отсканированный товар
  scanAnimate: 'div[class^="_scanAnimate_"]',
};

export const qrCommands = [
  {
    id: "37821563489167429583100",
    name: "Выдать заказ (без пакета)",
    repeat: false,
    actions: [TEXT.CONTINUE, TEXT.ISSUE, TEXT.HOME],
  },
  {
    id: "60418273951624830975261",
    name: "Выдать заказ (+1 пакет M)",
    repeat: false,
    actions: [TEXT.CONTINUE, SELECTOR.M, TEXT.ISSUE, TEXT.HOME],
  },
  {
    id: "60418273951624830975262",
    name: "Выдать заказ (+1 пакет L)",
    repeat: false,
    actions: [TEXT.CONTINUE, SELECTOR.L, TEXT.ISSUE, TEXT.HOME],
  },
  {
    id: "74892015376184239061527",
    name: "Выдать все (без пакета)",
    repeat: true,
    actions: [TEXT.READY, TEXT.CONTINUE, TEXT.ISSUE, TEXT.HOME],
  },
  {
    id: "91347265019832476015342",
    name: "Выдать все (+1 пакет M)",
    repeat: true,
    actions: [TEXT.READY, TEXT.CONTINUE, SELECTOR.M, TEXT.ISSUE, TEXT.HOME],
  },
  {
    id: "91347265019832476015343",
    name: "Выдать все (+1 пакет L)",
    repeat: true,
    actions: [TEXT.READY, TEXT.CONTINUE, SELECTOR.L, TEXT.ISSUE, TEXT.HOME],
  },
  {
    id: "70983625147892016354712",
    name: "Оплатить заказ (без пакета)",
    repeat: false,
    actions: [TEXT.CONTINUE, TEXT.PAY, TEXT.HOME],
  },
  {
    id: "70983625147892016354713",
    name: "Оплатить заказ (+1 пакет M)",
    repeat: false,
    actions: [TEXT.CONTINUE, SELECTOR.M, TEXT.PAY, TEXT.HOME],
  },
  {
    id: "70983625147892016354714",
    name: "Оплатить заказ (+1 пакет L)",
    repeat: false,
    actions: [TEXT.CONTINUE, SELECTOR.L, TEXT.PAY, TEXT.HOME],
  },
  {
    id: "920374615208431975286391",
    name: "С рекомендацией",
    repeat: false,
    actions: [SELECTOR.RECEIVING],
  },
  {
    id: "82634791520368417952631",
    name: "Возврат товара",
    repeat: false,
    actions: [TEXT.CHECK, TEXT.ONCHECK, TEXT.READY, TEXT.RETURN_REASON_1],
  },
];
