import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Calculator, Target, FileText, Settings, Leaf, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Calculator", url: "/calculator", icon: Calculator },
  { title: "Goals", url: "/goals", icon: Target },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Profile", url: "/profile", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-bg glow-primary"
          >
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold leading-none">EcoTrack</span>
              <span className="text-[10px] font-medium tracking-widest text-muted-foreground">AI</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11 rounded-xl">
                      <RouterNavLink
                        to={item.url}
                        end
                        className={`relative flex items-center gap-3 px-3 transition-all ${
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                            : "hover:bg-sidebar-accent/50"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="activeNav"
                            className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full gradient-bg"
                          />
                        )}
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </RouterNavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="rounded-xl gradient-soft p-3">
            <div className="text-xs font-semibold text-foreground">🌱 Trees saved</div>
            <div className="font-display text-2xl font-bold gradient-text">142</div>
          </div>
        ) : (
          <div className="flex justify-center text-xl">🌱</div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
