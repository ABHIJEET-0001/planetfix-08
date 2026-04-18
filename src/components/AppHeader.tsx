import { Moon, Sun, Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border/60 glass px-4 md:px-6">
      <SidebarTrigger className="rounded-lg hover:bg-muted" />
      <div className="hidden md:flex items-center gap-2 ml-2 w-72 rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
        <Search className="h-4 w-4" />
        <span>Search insights, reports…</span>
        <kbd className="ml-auto rounded bg-background px-1.5 py-0.5 text-[10px] font-semibold">⌘K</kbd>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-xl relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl" onClick={toggle} aria-label="Toggle theme">
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.span>
        </Button>
        <div className="h-9 w-9 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-semibold text-sm">
          AK
        </div>
      </div>
    </header>
  );
}
