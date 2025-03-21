
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 rounded-full transition-all duration-300 hover:bg-muted"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all duration-500 dark:rotate-0" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all duration-500 dark:-rotate-90" />
      )}
    </Button>
  );
}
