"use client";

import Image from "next/image";
import s4eLogo from "../public/s4e-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
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
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={s4eLogo}
              alt="Security4Ever Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            {!isCollapsed && <div className="font-semibold">Security4Ever</div>}
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuButton
              key={item.href}
              className="w-full justify-start gap-2"
              tooltip={isCollapsed ? item.label : undefined}
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
