import { Accordion } from "@/components/ui/accordion";
import { automations } from "@/utils/configAutomation";
import { useState } from "react";
import { SettingSection } from "./SettingSection";
import { Play, Pause } from "lucide-react";

export default function Automation() {
  const automationOptions = automations;

  // Храним только СКРЫТЫЕ элементы (массивы будут максимально короткими)
  const [hideAutomations, setHideAutomations] = useState<string[]>([]);

  // Универсальный хэндлер для работы со скрытыми элементами
  const toggleHiddenItem = (item: string) => {
    setHideAutomations((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
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
        title="Автоскрипты"
        items={automationOptions}
        hiddenItems={hideAutomations}
        onItemToggle={toggleHiddenItem}
        VisibleIcon={Pause}
        HiddenIcon={Play}
      />
    </Accordion>
  );
}
