"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Home,
  Shield,
  Search,
  Network,
  Globe,
  Info,
  Package,
  Settings,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Shield, label: "DNS Controls", href: "/dns" },
  { icon: Shield, label: "SSL Controls", href: "/ssl" },
  { icon: Settings, label: "Misconfiguration", href: "/misconfig" },
  { icon: Network, label: "Network Vulnerabilities", href: "/network" },
  { icon: Globe, label: "Web Vulnerabilities", href: "/web" },
  { icon: Info, label: "Information Scans", href: "/info" },
  { icon: Package, label: "Product Based Web", href: "/product-web" },
  { icon: Package, label: "Product Based Network", href: "/product-network" },
];

export function MainSidebar() {
  return (
    <Sidebar collapsible="none">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            S4E
          </div>
          <div className="font-semibold">Security4Ever</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuButton
              key={item.href}
              className="w-full justify-start gap-2"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
