# Cricket Technical & Tactical Masterclass

## Product direction
Build a six-part cricket coaching application with a premium broadcast-analysis feel: deep charcoal surfaces, crisp ivory text, pitch green, seam red, and restrained amber highlights. The experience will prioritize dense, readable analysis over marketing copy, with responsive navigation and a complete light/dark theme.

## Shared application shell
- Add a compact desktop sidebar and mobile top bar linking Home, Field Planner, Batting, Bowling, Conditions, Scenarios, and Glossary.
- Create reusable page headers, metric tiles, segmented controls, diagrams, callouts, and theme controls.
- Give every page distinct search/social metadata and accessible semantic structure.
- Use a coherent responsive layout so diagrams and controls remain usable on touch screens.

## Home dashboard (`/`)
- Replace the placeholder with a learning dashboard that makes all six modules immediately accessible.
- Show a featured tactical lesson, progress-style module summaries, and a field snapshot that leads into the planner.
- Keep the screen product-first rather than presenting a marketing landing page.

## Field Placement Planner (`/field-planner`)
- Build an interactive SVG oval with boundary rope, 30-yard circle, pitch, creases, striker orientation, and live scoring wedges.
- Add 11 draggable fielders with pointer/touch support, normalized coordinates, nearest-position snapping, custom names, and a reset action.
- Add RHB/LHB, bowler type, over/round wicket, target length, and target line controls.
- Recalculate primary scoring arcs and dashed false-shot/edge cones as delivery selections change.
- Add presets for Test attack, T20 powerplay, death overs, and short-ball barrage.
- Add live tactical checks for boundary gaps, channel bowling without slips, unsupported short-ball plans, spin without close catchers, and Law 28.4 leg-side limits.
- Surface severity, plain-language coaching guidance, and current field counts without blocking experimentation.

## Batting Mechanics (`/batting`)
- Create interactive lesson tabs for setup/trigger, front-foot strokes, back-foot strokes, wrist work, and spin countermeasures.
- Use a clean batter-and-pitch vector diagram with selectable movement phases and highlighted head, base, bat path, and weight-transfer cues.
- Include concise coaching checkpoints and common-fault comparisons.

## Bowling Physics (`/bowling`)
- Create switchable visualizations for conventional swing, reverse swing, seam movement, cutters, finger spin, and wrist spin.
- Illustrate seam orientation, airflow sides, drift/drop, release axis, and bounce outcome with animated vector paths.
- Add practical variables such as ball condition, seam angle, pace, and RPM that update the explanation and readouts.

## Conditions Science (`/conditions`)
- Add a day-by-day pitch wear timeline from green Day 1 to abrasive Day 5.
- Compare red, pink, and white ball behavior.
- Add humidity, cloud, wind, and surface controls that update expected swing, seam, grip, and deterioration indicators.

## Captaincy Lab (`/scenarios`)
- Build several interactive match situations with score, phase, batter tendencies, pitch state, and available bowling options.
- Let the learner choose a bowler and tactical plan, then reveal scored feedback and the strongest reasoning.
- Track session progress locally without requiring accounts.

## Tactical Glossary (`/glossary`)
- Add searchable, filterable terminology grouped by batting, bowling, fielding, conditions, and laws.
- Pair relevant terms with field-position and law diagrams.
- Include a focused MCC Law 28.4 reference and cross-links back to related learning modules.

## Technical implementation
- Use TanStack file routes for every page, React state for all interactions, and existing design-system controls.
- Keep field coordinates and tactical rules in typed domain modules so presets, warnings, and diagrams stay consistent.
- Use semantic Tailwind v4 tokens in `src/styles.css`; no hardcoded component colors.
- Use SVG for instructional and field diagrams, including keyboard-accessible fielder selection plus touch/pointer dragging.
- Add only local assets and code; no backend is required for this learning experience.
- Verify the finished app at desktop and mobile widths, including navigation, dragging, presets, theme switching, scenario feedback, and route metadata.
