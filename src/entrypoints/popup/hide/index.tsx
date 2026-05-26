import { Accordion } from "@/components/ui/accordion";
import Menu from "./menu";
import Notification from "./notifications";
import Returns from "./returns";

export default function Hide() {
  return (
    <Accordion
      type="single" // Можно заменить на "multiple", чтобы открывать несколько групп сразу
      collapsible
      defaultValue="menu-settings"
      className="w-72 rounded-xl border bg-card text-card-foreground shadow-sm m-5 overflow-hidden"
    >
      {/* ГРУППА 1: НАСТРОЙКА МЕНЮ */}
      <Menu />
      {/* ГРУППА 2: БУДУЩИЕ НАСТРОЙКИ (Пример: Уведомления) */}
      <Notification />
      {/* ГРУППА 3: ЕЩЕ ОДНА СЕКЦИЯ */}
      <Returns />
    </Accordion>
  );
}
