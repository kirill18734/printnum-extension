import { Bell, BellOff } from "lucide-react"; // Заменили Eye и EyeOff на Bell и BellOff
import { useState } from "react";
import { SettingSection } from "../SettingSection";

export default function Notification() {
  const menuOptions = [
    "Выдача товаров",
    "Возвраты",
    "Посылки",
    "Поиск предметов",
  ];
  const [hiddenNotifications, setHiddenNotifications] = useState<string[]>([]);
  // Универсальный хэндлер для работы со скрытыми элементами
  const toggleHiddenItem = (
    item: string,
    setHiddenRows: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setHiddenRows((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  return (
    <SettingSection
      value="notification-settings"
      title="Уведомления"
      items={menuOptions}
      hiddenItems={hiddenNotifications}
      onItemToggle={(item) => toggleHiddenItem(item, setHiddenNotifications)}
      VisibleIcon={Bell}
      HiddenIcon={BellOff}
    />
  );
}
