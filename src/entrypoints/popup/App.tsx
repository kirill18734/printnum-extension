import { ChevronRight, ChevronsUpDown, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function App() {
  const name = "тестович";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const theme = "system";
    const body = document.documentElement;

    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    body.classList.toggle("dark", isDark);
  }, []);

  const listMenu = ["Выдача товаров", "Возвраты", "Посылки", "Поиск предметов"];

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="shipping"
      className="w-auto p-2 rounded-lg border"
    >
      <AccordionItem value="shipping">
        <AccordionTrigger>Настройка видимости</AccordionTrigger>
        <AccordionContent>
          <Accordion
            type="single"
            collapsible
            defaultValue="shipping"
            className="ml-5"
          >
            <AccordionItem value="test">
              <AccordionTrigger>Меню</AccordionTrigger>
              <AccordionContent> </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default App;
