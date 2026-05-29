import { Eye, EyeOff } from "lucide-react";
import { SettingSection } from "../SettingSection";
import { others } from "@/utils/configHideOther";

export default function Other() {
  const [other, setOther] = useStorageState("other", others);
  // Храним только СКРЫТЫЕ элементы (массивы будут максимально короткими)
  const [offOther, setOffOther] = useStorageState("offOther", []);

  return (
    <SettingSection
      value="menu-settings"
      title="Другое"
      items={other}
      hiddenItems={offOther}
      onItemToggle={setOffOther}
      VisibleIcon={Eye}
      HiddenIcon={EyeOff}
    />
  );
}
