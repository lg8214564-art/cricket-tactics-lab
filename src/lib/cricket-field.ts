export type Hand = "RHB" | "LHB";
export type BowlerStyle = "Fast / Seam" | "Off-spin" | "Leg-spin" | "Left-arm orthodox";
export type Length = "Yorker" | "Full / Driving" | "Good length" | "Back of a length" | "Short / Bouncer";
export type Line = "Wide outside off" | "Corridor (4th–5th)" | "Off stump" | "Middle & leg" | "Pads / down leg";
export type Fielder = { id: string; name: string; x: number; y: number };

export const initialFielders: Fielder[] = [
  { id: "wk", name: "Wicketkeeper", x: 50, y: 78 },
  { id: "bowler", name: "Bowler", x: 50, y: 34 },
  { id: "1", name: "1st Slip", x: 58, y: 76 },
  { id: "2", name: "2nd Slip", x: 63, y: 73 },
  { id: "3", name: "Gully", x: 71, y: 68 },
  { id: "4", name: "Point", x: 77, y: 56 },
  { id: "5", name: "Cover", x: 69, y: 40 },
  { id: "6", name: "Mid-off", x: 59, y: 29 },
  { id: "7", name: "Mid-on", x: 39, y: 29 },
  { id: "8", name: "Mid-wicket", x: 26, y: 42 },
  { id: "9", name: "Fine leg", x: 24, y: 72 },
];

const testAttack: Fielder[] = initialFielders;
const t20Powerplay: Fielder[] = [
  { id: "wk", name: "Wicketkeeper", x: 50, y: 78 }, { id: "bowler", name: "Bowler", x: 50, y: 34 },
  { id: "1", name: "Slip", x: 59, y: 75 }, { id: "2", name: "Short third", x: 73, y: 72 },
  { id: "3", name: "Point", x: 78, y: 55 }, { id: "4", name: "Cover", x: 68, y: 42 },
  { id: "5", name: "Mid-off", x: 59, y: 30 }, { id: "6", name: "Mid-on", x: 40, y: 30 },
  { id: "7", name: "Mid-wicket", x: 29, y: 43 }, { id: "8", name: "Square leg", x: 24, y: 58 },
  { id: "9", name: "Fine leg", x: 25, y: 75 },
];
const death: Fielder[] = [
  { id: "wk", name: "Wicketkeeper", x: 50, y: 78 }, { id: "bowler", name: "Bowler", x: 50, y: 34 },
  { id: "1", name: "Deep third", x: 73, y: 78 }, { id: "2", name: "Deep point", x: 88, y: 58 },
  { id: "3", name: "Deep cover", x: 78, y: 28 }, { id: "4", name: "Long-off", x: 60, y: 13 },
  { id: "5", name: "Long-on", x: 39, y: 13 }, { id: "6", name: "Deep mid-wicket", x: 17, y: 32 },
  { id: "7", name: "Deep square", x: 12, y: 58 }, { id: "8", name: "Fine leg", x: 25, y: 76 },
  { id: "9", name: "Extra cover", x: 65, y: 43 },
];
const barrage: Fielder[] = [
  { id: "wk", name: "Wicketkeeper", x: 50, y: 81 }, { id: "bowler", name: "Bowler", x: 50, y: 34 },
  { id: "1", name: "Slip", x: 60, y: 76 }, { id: "2", name: "Gully", x: 69, y: 70 },
  { id: "3", name: "Deep point", x: 87, y: 56 }, { id: "4", name: "Mid-off", x: 61, y: 31 },
  { id: "5", name: "Mid-on", x: 39, y: 31 }, { id: "6", name: "Deep mid-wicket", x: 17, y: 35 },
  { id: "7", name: "Deep square", x: 13, y: 59 }, { id: "8", name: "Fine leg", x: 25, y: 78 },
  { id: "9", name: "Short leg", x: 43, y: 68 },
];

export const presets = { "Test attack": testAttack, "T20 powerplay": t20Powerplay, "Death overs": death, "Short-ball barrage": barrage } as const;
export type PresetName = keyof typeof presets;

export type TacticalWarning = { severity: "critical" | "warning" | "insight"; title: string; detail: string };

export function analyzeField(fielders: Fielder[], hand: Hand, style: BowlerStyle, length: Length, line: Line): TacticalWarning[] {
  const out: TacticalWarning[] = [];
  const legSide = fielders.filter((f) => f.id !== "wk" && f.id !== "bowler" && (hand === "RHB" ? f.x < 50 : f.x > 50));
  const behindSquareLeg = legSide.filter((f) => f.y > 67);
  const outside = fielders.filter((f) => f.id !== "wk" && f.id !== "bowler" && Math.hypot((f.x - 50) / 40, (f.y - 50) / 35) > 0.62);
  const slips = fielders.filter((f) => /slip|gully/i.test(f.name) || (f.y > 68 && (hand === "RHB" ? f.x > 54 : f.x < 46)));
  const closeCatchers = fielders.filter((f) => f.id !== "wk" && Math.hypot(f.x - 50, f.y - 67) < 14);
  const legBoundary = legSide.filter((f) => Math.hypot((f.x - 50) / 40, (f.y - 50) / 35) > 0.72);

  if (legSide.length > 5) out.push({ severity: "critical", title: "Law 28.4: too many on leg side", detail: `${legSide.length} fielders are on the leg side. A maximum of five is permitted when the ball is delivered.` });
  if (behindSquareLeg.length > 2) out.push({ severity: "critical", title: "Law 28.4: behind-square breach", detail: `${behindSquareLeg.length} leg-side fielders are behind popping crease alignment; only two are allowed.` });
  if (line === "Corridor (4th–5th)" && slips.length < 2) out.push({ severity: "warning", title: "Channel lacks catchers", detail: "A corridor plan creates outside edges. Add at least two slips or a slip and gully." });
  if (length === "Short / Bouncer" && legBoundary.length < 2) out.push({ severity: "warning", title: "Short ball is under-protected", detail: "Add deep square leg and fine leg or deep mid-wicket before committing to the bumper." });
  if (style !== "Fast / Seam" && closeCatchers.length < 2) out.push({ severity: "warning", title: "Spin needs bat-pad pressure", detail: "Add a short leg, silly point, or leg slip to turn drift and dip into catching chances." });
  if (outside.length < 3) out.push({ severity: "insight", title: "Boundary is exposed", detail: "Only a small part of the rope is protected. This field prioritizes wickets over run suppression." });
  if (out.length === 0) out.push({ severity: "insight", title: "Plan is structurally sound", detail: "The field supports the selected line and length with no immediate law conflicts." });
  return out;
}

export function scoringAngles(line: Line, length: Length, hand: Hand) {
  const lineBase: Record<Line, number> = { "Wide outside off": -48, "Corridor (4th–5th)": -32, "Off stump": -18, "Middle & leg": 24, "Pads / down leg": 48 };
  const lengthShift: Record<Length, number> = { Yorker: 0, "Full / Driving": -7, "Good length": 3, "Back of a length": 12, "Short / Bouncer": 22 };
  const mirror = hand === "RHB" ? 1 : -1;
  return { primary: (lineBase[line] + lengthShift[length]) * mirror, edge: (lineBase[line] - 55) * mirror };
}
