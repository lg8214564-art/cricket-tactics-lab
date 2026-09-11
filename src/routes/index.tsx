import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowRight, BookOpen, CloudSun, Crosshair, ShieldQuestion, Target } from "lucide-react";
import { PageHeader } from "@/components/masterclass/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Cricket Technical & Tactical Masterclass" }, { name: "description", content: "Master cricket technique, physics, field settings and captaincy through interactive analysis." },
    { property: "og:title", content: "Cricket Technical & Tactical Masterclass" }, { property: "og:description", content: "Interactive cricket coaching for players, coaches and captains." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Index,
});
const modules = [
  { to: "/field-planner", icon: Target, n: "01", title: "Field Placement", note: "Build, test and pressure-check a complete field.", level: "Tactical" },
  { to: "/batting", icon: Activity, n: "02", title: "Batting Mechanics", note: "Connect movement, balance and bat path.", level: "Biomechanics" },
  { to: "/bowling", icon: Crosshair, n: "03", title: "Bowling Physics", note: "See how seam, air and spin change a ball.", level: "Physics" },
  { to: "/conditions", icon: CloudSun, n: "04", title: "Conditions", note: "Read pitch, ball, weather and wear together.", level: "Environment" },
  { to: "/scenarios", icon: ShieldQuestion, n: "05", title: "Captaincy Lab", note: "Make the call under match pressure.", level: "Decision-making" },
  { to: "/glossary", icon: BookOpen, n: "06", title: "Tactical Glossary", note: "Decode positions, language and MCC law.", level: "Reference" },
] as const;
function Index() { return <>
  <PageHeader eyebrow="Coach's analysis room" title="Read the game. Shape the contest." description="An interactive technical and tactical learning environment for players, coaches and captains." />
  <div className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-10">
    <section className="relative overflow-hidden rounded-lg border border-border bg-card p-6 sm:p-8 lg:grid lg:grid-cols-[1fr_420px] lg:gap-10">
      <div className="relative z-10 flex flex-col justify-center py-5">
        <p className="text-xs font-bold uppercase text-warning">Featured lab · New-ball strategy</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-none sm:text-5xl">Build a field that makes the batter doubt both edges.</h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Set a fourth-stump line, move every fielder, and get an instant read on scoring leaks and catching coverage.</p>
        <Button asChild className="mt-6 w-fit"><Link to="/field-planner">Open field planner <ArrowRight /></Link></Button>
      </div>
      <div className="mt-8 lg:mt-0"><MiniField /></div>
    </section>
    <div className="mt-9 flex items-end justify-between"><div><p className="text-xs font-bold uppercase text-primary">Learning modules</p><h2 className="mt-1 font-display text-3xl font-bold">The complete game</h2></div><p className="hidden text-sm text-muted-foreground sm:block">Six connected disciplines</p></div>
    <section className="mt-4 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
      {modules.map(({to, icon: Icon, n, title, note, level}) => <Link to={to} key={to} className="group bg-card p-5 transition-colors hover:bg-accent/40">
        <div className="flex items-center justify-between"><span className="font-display text-lg font-bold text-muted-foreground">{n}</span><Icon className="size-5 text-primary"/></div>
        <h3 className="mt-8 font-display text-2xl font-bold group-hover:text-primary">{title}</h3><p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{note}</p><div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="text-[11px] font-bold uppercase text-muted-foreground">{level}</span><ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></div>
      </Link>)}
    </section>
  </div>
</>; }
function MiniField() { return <svg viewBox="0 0 420 310" className="w-full" aria-label="New ball attacking field diagram"><ellipse cx="210" cy="155" rx="190" ry="140" fill="var(--field-deep)" stroke="var(--primary)" strokeWidth="2"/><ellipse cx="210" cy="155" rx="115" ry="83" fill="none" stroke="var(--primary-foreground)" strokeOpacity=".28" strokeDasharray="5 6"/><rect x="195" y="69" width="30" height="172" rx="3" fill="var(--warning)" opacity=".7"/><path d="M210 210 L355 252 A165 165 0 0 0 375 184 Z" fill="var(--warning)" opacity=".2"/>{[[210,239],[210,94],[245,236],[270,224],[294,203],[330,160],[286,119],[245,88],[175,88],[112,120],[100,203]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="9" fill="var(--primary)" stroke="var(--primary-foreground)" strokeWidth="2"/><text x={x} y={(y ?? 0)+3} textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--primary-foreground)">{i+1}</text></g>)}</svg>; }
