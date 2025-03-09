import { Button } from "./button";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { getTextColorForBackground } from "../../lib/colors";

interface ColorOption {
  value: string;
  label: string;
  category?: string;
}

interface ColorSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const colorOptions: ColorOption[] = [
  // Couleurs de base
  { value: "bg-slate-700", label: "Slate", category: "Foncé" },
  { value: "bg-gray-700", label: "Gris", category: "Foncé" },
  { value: "bg-zinc-800", label: "Zinc", category: "Foncé" },

  // Couleurs vives
  { value: "bg-blue-500", label: "Bleu", category: "Vif" },
  { value: "bg-green-500", label: "Vert", category: "Vif" },
  { value: "bg-red-500", label: "Rouge", category: "Vif" },
  { value: "bg-yellow-500", label: "Jaune", category: "Vif" },
  { value: "bg-purple-500", label: "Violet", category: "Vif" },
  { value: "bg-pink-500", label: "Rose", category: "Vif" },
  { value: "bg-indigo-500", label: "Indigo", category: "Vif" },
  { value: "bg-cyan-500", label: "Cyan", category: "Vif" },
  { value: "bg-amber-500", label: "Ambre", category: "Vif" },
  { value: "bg-teal-500", label: "Teal", category: "Vif" },
  { value: "bg-orange-500", label: "Orange", category: "Vif" },

  // Couleurs foncées
  { value: "bg-blue-600", label: "Bleu foncé", category: "Intense" },
  { value: "bg-green-600", label: "Vert foncé", category: "Intense" },
  { value: "bg-red-600", label: "Rouge foncé", category: "Intense" },
  { value: "bg-purple-600", label: "Violet foncé", category: "Intense" },
  { value: "bg-indigo-600", label: "Indigo foncé", category: "Intense" },
];

// Grouper les couleurs par catégorie
const groupedColors = colorOptions.reduce<Record<string, ColorOption[]>>(
  (acc, color) => {
    const category = color.category || "Autres";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(color);
    return acc;
  },
  {}
);

export function ColorSelector({
  value,
  onChange,
  className = "",
}: ColorSelectorProps) {
  const selectedColor =
    colorOptions.find((option) => option.value === value) || colorOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center justify-between w-full ${className}`}
          type="button"
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full ${selectedColor.value}`}
              aria-hidden="true"
            />
            <span>{selectedColor.label}</span>
          </div>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 p-2">
        {Object.entries(groupedColors).map(([category, colors]) => (
          <div key={category}>
            <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
              {category}
            </div>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {colors.map((color) => (
                <Button
                  key={color.value}
                  type="button"
                  variant="ghost"
                  className={`relative p-0 h-12 overflow-hidden border border-input hover:border-primary hover:opacity-90 transition-all ${
                    value === color.value
                      ? "ring-2 ring-primary ring-offset-1"
                      : ""
                  }`}
                  onClick={() => onChange(color.value)}
                >
                  <div
                    className={`absolute inset-0 ${
                      color.value
                    } ${getTextColorForBackground(color.value)}`}
                  />
                  {value === color.value && (
                    <Check className="absolute" size={16} />
                  )}
                  <span className="sr-only">{color.label}</span>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
