import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ContentPanel({ title, kicker, children, className }: { title: string; kicker?: string; children: ReactNode; className?: string }) {
  return <section className={cn("rounded-lg border border-border bg-card p-5 shadow-sm", className)}>{kicker && <p className="mb-1 text-[11px] font-bold uppercase text-primary">{kicker}</p>}<h2 className="font-display text-xl font-bold">{title}</h2><div className="mt-4">{children}</div></section>;
}
export function Metric({ label, value, note }: { label: string; value: string; note: string }) { return <div className="border-l-2 border-primary pl-3"><p className="text-[11px] font-bold uppercase text-muted-foreground">{label}</p><p className="mt-1 font-display text-2xl font-bold">{value}</p><p className="text-xs text-muted-foreground">{note}</p></div>; }
export function CueList({ items }: { items: string[] }) { return <ul className="space-y-3">{items.map(item => <li key={item} className="flex gap-2 text-sm leading-6"><CheckCircle2 className="mt-1 size-4 shrink-0 text-primary"/><span>{item}</span></li>)}</ul>; }
export function Insight({ children }: { children: ReactNode }) { return <div className="flex gap-3 rounded-md border border-primary/25 bg-primary/10 p-4 text-sm leading-6"><Info className="mt-1 size-4 shrink-0 text-primary"/><div>{children}</div></div>; }
export function PathButton({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) { return <button onClick={onClick} className={cn("flex min-h-11 items-center justify-between rounded-md border px-4 text-left text-sm font-semibold transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/60")}><span>{children}</span><ArrowRight className="size-4"/></button>; }
