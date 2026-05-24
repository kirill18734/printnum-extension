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
    // <div
    //   className={cn(
    //     "m-10 flex items-center justify-between p-3 rounded-lg border transition-colors",
    //     isVisible
    //       ? "bg-emerald-50/50 border-emerald-200"
    //       : "bg-red-50/50 border-red-200",
    //   )}
    // >
    //   <div className="flex items-center gap-3">
    //     {isVisible ? (
    //       <Eye className="h-4 w-4 text-emerald-600" />
    //     ) : (
    //       <EyeOff className="h-4 w-4 text-red-500" />
    //     )}
    //     <Label
    //       className={cn(
    //         "font-medium",
    //         isVisible
    //           ? "text-emerald-900"
    //           : "text-red-900 line-through opacity-70",
    //       )}
    //     >
    //       {name}
    //     </Label>
    //   </div>

    //   <Switch
    //     checked={isVisible}
    //     onCheckedChange={setIsVisible}
    //     className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-red-500"
    //   />
    // </div>
    <Accordion
      type="single"
      collapsible
      defaultValue="shipping"
      className="w-96 m-10 p-2 rounded-lg border"
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
