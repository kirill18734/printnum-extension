import { Accordion } from "@/components/ui/accordion";
import { automations } from "@/utils/configAutomation";
import { SettingSection } from "./SettingSection";
import { Play, Pause } from "lucide-react";

export default function Automation() {
  const [autoscript, setAutoscript] = useStorageState(
    "autoscript",
    automations,
  );
  // Храним только СКРЫТЫЕ элементы (массивы будут максимально короткими)
  const [offAutoscript, setOffAutoscript] = useStorageState(
    "offAutoscript",
    [],
  );

  return (
    <Accordion
      type="single"
      collapsible
      className="border rounded-xl bg-background overflow-hidden w-full"
    >
      <SettingSection
        value="qr-settings"
        title="Автоскрипты"
        items={autoscript}
        hiddenItems={offAutoscript}
        onItemToggle={setOffAutoscript}
        VisibleIcon={Pause}
        HiddenIcon={Play}
      />
    </Accordion>
  );
}
