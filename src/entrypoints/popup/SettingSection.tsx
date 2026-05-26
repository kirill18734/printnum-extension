import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SettingRowProps {
  label: string;
  isHidden: boolean;
  onToggle: () => void;
  VisibleIcon: LucideIcon;
  HiddenIcon: LucideIcon;
}

export function SettingRow({
  label,
  isHidden,
  onToggle,
  VisibleIcon,
  HiddenIcon,
}: SettingRowProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onToggle}
      className={cn(
        "flex w-full items-center justify-between p-3 h-auto rounded-lg border text-left font-normal transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isHidden
          ? "bg-secondary/40 border-muted hover:bg-secondary/80 text-muted-foreground"
          : "bg-background border-border hover:bg-muted/50 shadow-sm text-foreground",
      )}
    >
      <div className="flex items-center gap-3 pointer-events-none w-full">
        {isHidden ? (
          <HiddenIcon className="h-4 w-4 text-muted-foreground/70 shrink-0" />
        ) : (
          <VisibleIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-500 shrink-0" />
        )}
        <span
          className={cn(
            "text-sm font-medium truncate",
            isHidden && "line-through opacity-60",
          )}
        >
          {label}
        </span>
      </div>
    </Button>
  );
}

interface SettingSectionProps {
  value: string;
  title: string;
  items: string[];
  hiddenItems: string[];
  onItemToggle: (item: string) => void;
  VisibleIcon: LucideIcon;
  HiddenIcon: LucideIcon;
  renderLabel?: (item: string) => string; // Добавили опциональную функцию форматирования текста
}

export function SettingSection({
  value,
  title,
  items,
  hiddenItems,
  onItemToggle,
  VisibleIcon,
  HiddenIcon,
  renderLabel,
}: SettingSectionProps) {
  return (
    <AccordionItem value={value} className="border-b">
      <AccordionTrigger className="p-4 text-sm font-semibold hover:no-underline hover:bg-muted/50 transition-colors">
        {title}
      </AccordionTrigger>
      <AccordionContent className="p-3 pt-0 flex flex-col gap-2">
        {items.map((element) => {
          const isHidden = hiddenItems.includes(element);
          // Если передан renderLabel, используем его для красивого отображения названия
          const displayLabel = renderLabel ? renderLabel(element) : element;

          return (
            <SettingRow
              key={element}
              label={displayLabel}
              isHidden={isHidden}
              onToggle={() => onItemToggle(element)}
              VisibleIcon={VisibleIcon}
              HiddenIcon={HiddenIcon}
            />
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
}
