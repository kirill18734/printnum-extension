import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export default function Printing() {
  return (
    <FieldLabel htmlFor="switch-share">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Печать ячеек (Ozon)</FieldTitle>
        </FieldContent>
        <Switch id="switch-share" />
      </Field>
    </FieldLabel>
  );
}
