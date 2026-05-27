import { useState } from "react";
import { SettingSection } from "./SettingSection";
import { Ban, QrCode } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { qrCommands } from "@/utils/config";

export default function QrCommands() {
  const qrHandlers = qrCommands;
  const [disabledQrIds, setDisabledQrIds] = useState<string[]>([]);

  const toggleHiddenItem = (id: string) => {
    setDisabledQrIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="border rounded-xl bg-background overflow-hidden w-full"
    >
      <SettingSection
        value="qr-settings"
        title="Обработчики QR-кодов"
        items={qrHandlers.map((qr) => qr.id)}
        hiddenItems={disabledQrIds}
        onItemToggle={toggleHiddenItem}
        VisibleIcon={QrCode}
        HiddenIcon={Ban}
        renderLabel={(id) => qrHandlers.find((qr) => qr.id === id)?.name || id}
      />
    </Accordion>
  );
}
