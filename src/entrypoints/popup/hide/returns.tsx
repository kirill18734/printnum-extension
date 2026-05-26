import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SettingSection } from "../SettingSection";

export default function Returns() {
  const returnsOption = ["Тест 1", "Тест 2", "Тест 3", "Тест 4"];

  // Храним только СКРЫТЫЕ элементы (массивы будут максимально короткими)
  const [hiddenReturns, setHiddenReturns] = useState<string[]>(["Тест 4"]);

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
      value="returns-settings"
      title="Видимость возвратов"
      items={returnsOption}
      hiddenItems={hiddenReturns}
      onItemToggle={(item) => toggleHiddenItem(item, setHiddenReturns)}
      VisibleIcon={Eye}
      HiddenIcon={EyeOff}
    />
  );
}
