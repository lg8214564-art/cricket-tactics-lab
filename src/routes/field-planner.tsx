import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, RotateCcw, ShieldAlert, Sparkles } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/masterclass/app-shell";
import { analyzeField, initialFielders, presets, scoringAngles, type BowlerStyle, type Fielder, type Hand, type Length, type Line, type PresetName } from "@/lib/cricket-field";

export const Route = createFileRoute("/field-planner")({
  head: () => ({ meta: [
    { title: "Interactive Field Planner | Cricket Masterclass" }, { name: "description", content: "Build cricket fields, map scoring zones and detect tactical or Law 28.4 conflicts in real time." },
    { property: "og:title", content: "Interactive Cricket Field Planner" }, { property: "og:description", content: "Build fields and test them against lines, lengths and cricket laws." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: FieldPlanner,
});

const bowlerStyles: BowlerStyle[] = ["Fast / Seam", "Off-spin", "Leg-spin", "Left-arm orthodox"];
const lengths: Length[] = ["Yorker", "Full / Driving", "Good length", "Back of a length", "Short / Bouncer"];
const lines: Line[] = ["Wide outside off", "Corridor (4th–5th)", "Off stump", "Middle & leg", "Pads / down leg"];
const presetNames = Object.keys(presets) as PresetName[];

function FieldPlanner() {
  const [fielders, setFielders] = useState<Fielder[]>(initialFielders);
  const [hand, setHand] = useState<Hand>("RHB");
  const [style, setStyle] = useState<BowlerStyle>("Fast / Seam");
  const [length, setLength] = useState<Length>("Good length");
  const [line, setLine] = useState<Line>("Corridor (4th–5th)");
  const [wicket, setWicket] = useState<"Over" | "Round">("Over");
  const [selected, setSelected] = useState<string | null>(null);
  const fieldRef = useRef<SVGSVGElement>(null);
  const warnings = useMemo(() => analyzeField(fielders, hand, style, length, line), [fielders, hand, style, length, line]);
  const angles = scoringAngles(line, length, hand);

  const moveFielder = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!selected || !fieldRef.current) return;
    const rect = fieldRef.current.getBoundingClientRect();
    const x = Math.max(8, Math.min(92, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(8, Math.min(92, ((event.clientY - rect.top) / rect.height) * 100));
    setFielders((current) => current.map((fielder) => fielder.id === selected ? { ...fielder, x: Math.round(x / 2) * 2, y: Math.round(y / 2) * 2 } : fielder));
  };

  return <>
    <PageHeader eyebrow="Tactical workspace" title="Interactive Field Planner" description="Build the field around a delivery plan. Scoring channels, likely false shots and legality checks update as you work.">
      <div className="flex gap-2"><Badge variant="outline">11 players</Badge><Badge className="bg-primary/15 text-primary shadow-none">Live analysis</Badge></div>
    </PageHeader>
    <div className="mx-auto grid max-w-[1440px] gap-5 p-4 sm:p-6 lg:grid-cols-[300px_minmax(440px,1fr)_320px] lg:p-8">
      <section className="space-y-5">
        <Panel title="Delivery plan">
          <Label text="Batter stance" /><Segment values={["RHB", "LHB"]} value={hand} onChange={(v) => setHand(v as Hand)} />
          <Label text="Bowler style" /><Select value={style} onValueChange={(v) => setStyle(v as BowlerStyle)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{bowlerStyles.map(v => <SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectContent></Select>
          <Label text="Crease side" /><Segment values={["Over", "Round"]} value={wicket} onChange={(v) => setWicket(v as "Over" | "Round")} />
          <Label text="Target length" /><Select value={length} onValueChange={(v) => setLength(v as Length)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{lengths.map(v => <SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectContent></Select>
          <Label text="Target line" /><Select value={line} onValueChange={(v) => setLine(v as Line)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{lines.map(v => <SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectContent></Select>
        </Panel>
        <Panel title="Field presets"><div className="grid gap-2">{presetNames.map(name => <Button key={name} variant="outline" className="justify-start" onClick={() => setFielders(presets[name].map(f => ({...f})))}>{name}</Button>)}</div></Panel>
      </section>

      <section className="min-w-0">
        <div className="mb-3 flex items-center justify-between"><div><p className="font-display text-xl font-bold">Live field</p><p className="text-xs text-muted-foreground">Drag any numbered marker</p></div><Button variant="ghost" size="sm" onClick={() => setFielders(initialFielders)}><RotateCcw /> Reset</Button></div>
        <div className="rounded-lg border border-border bg-card p-2 shadow-sm sm:p-4">
          <svg ref={fieldRef} viewBox="0 0 100 100" className="aspect-[4/5] w-full touch-none select-none sm:aspect-square" onPointerMove={moveFielder} onPointerUp={() => setSelected(null)} onPointerLeave={() => setSelected(null)} aria-label="Interactive cricket field">
            <defs><radialGradient id="grass"><stop offset="0" className="[stop-color:var(--field)]"/><stop offset="1" className="[stop-color:var(--field-deep)]"/></radialGradient></defs>
            <ellipse cx="50" cy="50" rx="47" ry="46" fill="url(#grass)" stroke="var(--primary)" strokeWidth=".7" />
            <ellipse cx="50" cy="50" rx="29" ry="28" fill="none" stroke="var(--primary-foreground)" strokeOpacity=".55" strokeDasharray="2 2" strokeWidth=".45" />
            <path d={`M50 67 L${50 + Math.sin(angles.primary*Math.PI/180)*38} ${67-Math.cos(angles.primary*Math.PI/180)*38} A38 38 0 0 1 ${50 + Math.sin((angles.primary+28)*Math.PI/180)*38} ${67-Math.cos((angles.primary+28)*Math.PI/180)*38} Z`} fill="var(--warning)" opacity=".28" />
            <path d={`M50 67 L${50 + Math.sin(angles.edge*Math.PI/180)*32} ${67-Math.cos(angles.edge*Math.PI/180)*32}`} fill="none" stroke="var(--primary-foreground)" strokeWidth="1" strokeDasharray="2 2" opacity=".85" />
            <rect x="46.8" y="27" width="6.4" height="46" rx="1" fill="var(--warning)" opacity=".72" />
            <line x1="45" y1="35" x2="55" y2="35" stroke="var(--primary-foreground)" strokeWidth=".6"/><line x1="45" y1="67" x2="55" y2="67" stroke="var(--primary-foreground)" strokeWidth=".6"/>
            <circle cx="50" cy="67" r="1.7" fill="var(--danger-soft)" stroke="var(--primary-foreground)" strokeWidth=".5" />
            {fielders.map((f, i) => <g key={f.id} transform={`translate(${f.x} ${f.y})`} onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setSelected(f.id); }} className="cursor-grab">
              <circle r={selected === f.id ? 3.1 : 2.5} fill={f.id === "wk" || f.id === "bowler" ? "var(--warning)" : "var(--primary)"} stroke="var(--primary-foreground)" strokeWidth=".55" />
              <text y=".9" textAnchor="middle" fontSize="2.6" fontWeight="700" fill="var(--primary-foreground)">{i+1}</text>
              <text y="5" textAnchor="middle" fontSize="2.25" fontWeight="600" fill="var(--primary-foreground)" stroke="var(--field-deep)" strokeWidth=".15" paintOrder="stroke">{f.name}</text>
            </g>)}
          </svg>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-2"><i className="size-3 bg-warning/40" /> Primary scoring arc</span><span>┄ False-shot cone</span><span>{hand} · {style} · {wicket} wicket</span></div>
      </section>

      <section className="space-y-5">
        <Panel title="Tactical review">
          <div className="space-y-3">{warnings.map((warning) => <div key={warning.title} className={`rounded-md border p-3 ${warning.severity === "critical" ? "border-destructive/40 bg-danger-soft" : warning.severity === "warning" ? "border-warning/40 bg-warning/10" : "border-primary/30 bg-info-soft"}`}>
            <div className="flex items-start gap-2">{warning.severity === "critical" ? <ShieldAlert className="mt-0.5 size-4 text-destructive"/> : warning.severity === "warning" ? <AlertTriangle className="mt-0.5 size-4 text-warning"/> : <CheckCircle2 className="mt-0.5 size-4 text-primary"/>}<div><p className="text-sm font-bold">{warning.title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{warning.detail}</p></div></div>
          </div>)}</div>
        </Panel>
        <Panel title="Selected fielder">{selected ? <FielderEditor fielders={fielders} selected={selected} update={setFielders}/> : <p className="text-sm leading-6 text-muted-foreground">Select and drag a marker to move it. Names can be changed to match your exact plan.</p>}</Panel>
        <div className="rounded-md border border-primary/30 bg-primary/10 p-4"><div className="flex gap-2"><Sparkles className="size-4 text-primary"/><p className="text-xs leading-5"><strong>Coach's cue:</strong> Every field should tell the bowler where to miss.</p></div></div>
      </section>
    </div>
  </>;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) { return <div className="rounded-lg border border-border bg-card p-4 shadow-sm"><h2 className="mb-4 font-display text-lg font-bold">{title}</h2><div className="space-y-3">{children}</div></div>; }
function Label({ text }: { text: string }) { return <p className="pt-1 text-[11px] font-bold uppercase text-muted-foreground">{text}</p>; }
function Segment({ values, value, onChange }: { values: string[]; value: string; onChange: (value: string) => void }) { return <div className="grid grid-cols-2 gap-1 rounded-md bg-muted p-1">{values.map(v => <Button key={v} size="sm" variant={v === value ? "default" : "ghost"} onClick={() => onChange(v)}>{v}</Button>)}</div>; }
function FielderEditor({ fielders, selected, update }: { fielders: Fielder[]; selected: string; update: React.Dispatch<React.SetStateAction<Fielder[]>> }) { const fielder = fielders.find(f => f.id === selected); if (!fielder) return null; return <div><Label text="Position name"/><Input value={fielder.name} onChange={e => update(current => current.map(f => f.id === selected ? {...f, name: e.target.value} : f))}/><p className="mt-3 text-xs text-muted-foreground">Snapped coordinate: {fielder.x}, {fielder.y}</p></div>; }
