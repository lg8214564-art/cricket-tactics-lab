import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  CloudSun,
  Crosshair,
  Gauge,
  Menu,
  Moon,
  ShieldQuestion,
  Sun,
  Target,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Overview", icon: Gauge },
  { to: "/field-planner", label: "Field planner", icon: Target },
  { to: "/batting", label: "Batting", icon: Activity },
  { to: "/bowling", label: "Bowling", icon: Crosshair },
  { to: "/conditions", label: "Conditions", icon: CloudSun },
  { to: "/scenarios", label: "Captaincy lab", icon: ShieldQuestion },
  { to: "/glossary", label: "Glossary", icon: BookOpen },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => setMenuOpen(false), [pathname]);

  const navigation = (
    <nav aria-label="Main navigation" className="space-y-1">
      {navItems.map(({ to, label, icon: Icon }) => {
        const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className={cn(
              "group flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/65 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <Icon className={cn("size-4", active && "text-primary")} aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
        <div className="flex h-20 items-center gap-3 border-b border-sidebar-border px-5">
          <div className="grid size-10 place-items-center rounded-md bg-primary text-primary-foreground shadow-glow">
            <span className="font-display text-xl font-bold">C</span>
          </div>
          <div>
            <p className="font-display text-sm font-bold leading-tight">CRICKET</p>
            <p className="text-[10px] font-semibold uppercase text-primary">Technical masterclass</p>
          </div>
        </div>
        <div className="flex-1 px-3 py-5">{navigation}</div>
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Learning track</span><span>6 modules</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-1/3 bg-primary" /></div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">Build decisions, not just definitions.</p>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur lg:ml-64 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open navigation">
            <Menu />
          </Button>
          <div className="lg:hidden">
            <p className="font-display text-sm font-bold">CRICKET MASTERCLASS</p>
          </div>
          <div className="hidden items-center gap-2 text-xs text-muted-foreground lg:flex">
            <span className="size-2 rounded-full bg-primary shadow-glow" /> Live coaching workspace
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setDark((value) => !value)} aria-label={dark ? "Use light theme" : "Use dark theme"}>
          {dark ? <Sun /> : <Moon />}
        </Button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-overlay" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />
          <aside className="relative h-full w-[min(82vw,20rem)] border-r border-sidebar-border bg-sidebar p-4 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <p className="font-display text-sm font-bold">CRICKET MASTERCLASS</p>
              <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></Button>
            </div>
            {navigation}
          </aside>
        </div>
      )}

      <main className="lg:ml-64">{children}</main>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <header className="border-b border-border bg-surface-subtle px-4 py-7 sm:px-6 lg:px-10 lg:py-9">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase text-primary">{eyebrow}</p>
          <h1 className="font-display text-3xl font-bold tracking-normal sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
        </div>
        {children}
      </div>
    </header>
  );
}
