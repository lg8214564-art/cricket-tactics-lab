# Cricket Masterclass Hub

Build a comprehensive cricket learning and analysis web application called "Cricket Technical & Tactical Masterclass".

Include the following key pages and features:
1. Interactive Field Placement Planner (/field-planner):
   - Interactive 2D cricket oval with pitch, 30-yard inner circle, and boundary ropes.
   - Batter stance toggle (RHB / LHB).
   - Delivery controls: Bowler style (Fast/Seam, Off-Spin, Leg-Spin, Left-Arm Orthodox), Round/Over wicket, Target Length (Yorker, Full/Driving, Good Length, Back of a Length, Short/Bouncer), Target Line (Wide Outside Off, Corridor of Uncertainty 4th-5th stump, Off-Stump, Middle & Leg, Pads/Down Leg).
   - 11 draggable fielder tokens (Bowler, Wicketkeeper, Slips, Gully, Point, Cover, Mid-off, Mid-on, Mid-wicket, Square leg, Fine leg, etc.) with position snapping and custom naming.
   - Dynamic scoring arcs overlay: Primary scoring arcs (solid radial wedge) and edge/false-shot cones (dashed wedge) mapped in real-time to selected line & length.
   - Real-time tactical conflict detection & warnings (unprotected boundary leaks, missing slip cordon for channel bowling, short ball without leg-side boundary, spin without close-in bat-pad catchers, Law 28.4 violations like >5 fielders on leg side or >2 behind square).
   - Format & phase presets (Test attacking slip cordon, T20 powerplay, death overs boundary choke, short ball barrage).
2. Batting Mechanics & Biomechanics (/batting):
   - Interactive breakdown of trigger movements, weight transfer, head position, and shot anatomy (front-foot drives, back-foot punch/cut/pull, wrist work, spin countermeasures).
3. Bowling Physics & Delivery Aerodynamics (/bowling):
   - Aerodynamics of conventional swing vs reverse swing (laminar vs turbulent boundary layer, seam angle, ball degradation).
   - Seam variations (wobble seam, cross seam, cutters).
   - Finger spin vs wrist spin mechanics (RPM, drift, drop, googly disguise, sliders).
4. Conditions & Environmental Science (/conditions):
   - Pitch wear cycles (Day 1 green top vs Day 5 abrasive rough), red/pink/white ball dynamics, weather/humidity impact on swing and drift.
5. Match Scenarios & Captaincy Lab (/scenarios):
   - Interactive decision-making scenarios with feedback on field settings and bowling changes.
6. Tactical Glossary (/glossary):
   - Visual reference guide for cricket terminology, fielding positions, and MCC laws.

Modern, premium sports analytics aesthetic with dark/light mode, clean vector diagrams, and responsive layout.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cricket-tactics-lab.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ce78dc2b-a976-4ab9-a2f7-70e0cd3fc95e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
