import { SettingSection } from "./SettingSection";
import { Ban, QrCode } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { qrCommands } from "@/utils/configCommands";

export default function QrCommands() {
  const [qrId, setQrId] = useStorageState(
    "qrIds",
    qrCommands.map((qr) => qr.id),
  );
  const [offQrId, setOffQrId] = useStorageState("offQrId", []);

  return (
    <Accordion
      type="single"
      collapsible
      className="border rounded-xl bg-background overflow-hidden w-full"
    >
      <SettingSection
        value="qr-settings"
        title="Обработчики QR-кодов"
        items={qrId}
        hiddenItems={offQrId}
        onItemToggle={setOffQrId}
        VisibleIcon={QrCode}
        HiddenIcon={Ban}
        renderLabel={(id) => qrCommands.find((qr) => qr.id === id)?.name || id}
      />
    </Accordion>
  );
}
