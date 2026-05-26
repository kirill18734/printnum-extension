import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SettingSection } from "../SettingSection";

export default function Menu() {
  const menuOptions = [
    "Выдача товаров",
    "Возвраты",
    "Посылки",
    "Поиск предметов",
  ];

  // Храним только СКРЫТЫЕ элементы (массивы будут максимально короткими)
  const [hiddenMenus, setHiddenMenus] = useState<string[]>(["Выдача товаров"]);

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
      value="menu-settings"
      title="Видимость меню"
      items={menuOptions}
      hiddenItems={hiddenMenus}
      onItemToggle={(item) => toggleHiddenItem(item, setHiddenMenus)}
      VisibleIcon={Eye}
      HiddenIcon={EyeOff}
    />
  );
}
