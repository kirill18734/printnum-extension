import { useState } from "react";
import { SettingSection } from "./SettingSection";
import { Ban, QrCode } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { qrCommands } from "@/utils/config";

export default function QrCommands() {
  // 1. Данные для ваших QR-обработчиков
  const qrHandlers = qrCommands;
  // 2. Стейт для скрытых (отключенных) QR-кодов — храним только их ID
  const [disabledQrIds, setDisabledQrIds] = useState<string[]>([]);

  // Универсальный хэндлер для изменения списков скрытых элементов
  const toggleHiddenItem = (
    item: string,
    setHiddenRows: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setHiddenRows((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };
  return (
    <Accordion
      type="single" // Можно заменить на "multiple", чтобы открывать несколько групп сразу
      collapsible
      defaultValue="menu-settings"
      className="w-72 rounded-xl border bg-card text-card-foreground shadow-sm m-5 overflow-hidden"
    >
      <SettingSection
        value="qr-settings"
        title="Обработчики QR-кодов"
        // Передаем массив ID (значения), но сопоставляем их с именами внутри компонента,
        // либо адаптируем передачу, используя хак с именами:
        items={qrHandlers.map((qr) => qr.id)}
        hiddenItems={disabledQrIds}
        onItemToggle={(id) => toggleHiddenItem(id, setDisabledQrIds)}
        VisibleIcon={QrCode}
        HiddenIcon={Ban} // Когда выключен — аккуратная иконка запрета/выключения
        // Чтобы в интерфейсе отображалось красивое ИМЯ, а не страшный ID,
        // мы слегка проапгрейдим наш SettingSection (см. шаг 2)
        renderLabel={(id) => qrHandlers.find((qr) => qr.id === id)?.name || id}
      />
    </Accordion>
  );
}
