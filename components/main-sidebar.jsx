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
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
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
  const { state, isMobile, openMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  const SidebarContents = (
    <>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={s4eLogo}
              alt="Security4Ever Logo"
              width={128}
              height={128}
              className="rounded-lg"
            />
          </div>
          {!isMobile && <SidebarTrigger />}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuButton
              key={item.href}
              className="w-full justify-start gap-2"
              tooltip={isCollapsed && !isMobile ? item.label : undefined}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );

  return (
    <>
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-40 md:hidden rounded-full"
          onClick={() => setOpenMobile(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      )}
      <Sidebar collapsible="icon" aria-label="Main Navigation">
        {SidebarContents}
      </Sidebar>
    </>
  );
}
