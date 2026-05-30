import { Eye, EyeOff } from "lucide-react";
import { SettingSection } from "../SettingSection";
import { others } from "@/utils/configOther";

export default function Other() {
  const [other, setOther] = useStorageState(
    "other",
    others.map((elem) => elem.id),
  );
  // Храним только СКРЫТЫЕ элементы (массивы будут максимально короткими)
  const [offOther, setOffOther] = useStorageState("offOther", []);

  return (
    <SettingSection
      value="other-settings"
      title="Другое"
      items={other}
      hiddenItems={offOther}
      onItemToggle={setOffOther}
      VisibleIcon={Eye}
      HiddenIcon={EyeOff}
      renderLabel={(id) => others.find((elem) => elem.id === id)?.name || id}
    />
  );
}
