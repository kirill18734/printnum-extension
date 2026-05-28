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
      title={isHidden ? "Отключено" : "Включено"}
      className={cn(
        "flex w-full items-center justify-start gap-3 p-2.5 h-auto rounded-lg border text-left font-normal transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isHidden
          ? "bg-muted/40 border-muted text-muted-foreground/60 hover:bg-muted/60"
          : "bg-background border-border shadow-sm text-foreground hover:bg-muted/40 hover:border-border/80",
      )}
    >
      <div className="flex items-center justify-center shrink-0">
        {isHidden ? (
          <HiddenIcon className="h-4 w-4 text-muted-foreground/50" />
        ) : (
          <VisibleIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
        )}
      </div>
      <span
        className={cn(
          "text-xs font-medium truncate select-none",
          isHidden && "line-through opacity-60",
        )}
      >
        {label}
      </span>
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
  renderLabel?: (item: string) => string;
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
    // Меняем border-none на border-b для разделения вложенных групп
    <AccordionItem value={value} className="border-none">
      {/* Возвращаем нормальный отступ px-4 вместо pl-6 */}
      <AccordionTrigger className="px-4 py-3 text-xs font-semibold text-muted-foreground hover:text-foreground hover:no-underline hover:bg-muted/20 transition-colors">
        {title}
      </AccordionTrigger>
      {/* Паддинги внутри подстроены под вложенность */}
      <AccordionContent className="px-4 pb-3 pt-0 flex flex-col gap-1.5">
        {items.map((element) => {
          const isHidden = hiddenItems.includes(element);
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
