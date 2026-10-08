---
version: alpha
name: Working Chart
description: Portfolio of Marcelinus Dinoglide Yoga Prakoso drawn as a navigator's working nautical chart. Printed NOAA chart conventions with a pencil-plotted track on top.
colors:
  primary: "#000000"
  secondary: "#1788BA"
  tertiary: "#9C3B8E"
  neutral: "#FFFFFF"
  sea: "#DDF2FD"
  shallow: "#B1E1F4"
  shoal: "#85CFEB"
  land: "#FBF0C6"
  land-ink: "#77562A"
  pencil: "#5A5E62"
typography:
  display:
    fontFamily: Newsreader
    fontSize: 4.75rem
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: -0.02em
  h1:
    fontFamily: Newsreader
    fontSize: 4.75rem
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.02em
  h2:
    fontFamily: Newsreader
    fontSize: 1.875rem
    fontWeight: 400
    lineHeight: 1.2
  h3:
    fontFamily: Newsreader
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.3
  body-md:
    fontFamily: Newsreader
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  body-lg:
    fontFamily: Newsreader
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: B612
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: 0px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  gutter-mobile: 20px
  gutter-desktop: 56px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: 48px
    padding: 20px
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: 48px
    padding: 20px
  button-secondary-hover:
    backgroundColor: "{colors.sea}"
    textColor: "{colors.primary}"
  nav-link:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
  nav-link-active:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label}"
  cartouche:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: 28px
  chart-inset:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: 8px
  depth-band-shoal:
    backgroundColor: "{colors.shoal}"
    textColor: "{colors.primary}"
  depth-band-shallow:
    backgroundColor: "{colors.shallow}"
    textColor: "{colors.primary}"
  depth-band-sea:
    backgroundColor: "{colors.sea}"
    textColor: "{colors.primary}"
  contour-line:
    backgroundColor: "{colors.secondary}"
    height: 1px
  land-footer:
    backgroundColor: "{colors.land}"
    textColor: "{colors.land-ink}"
    typography: "{typography.label}"
  meta-text:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.pencil}"
    typography: "{typography.label}"
  input-field:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    height: 48px
  position-fix:
    backgroundColor: "{colors.neutral}"
    rounded: "{rounded.full}"
    size: 23px
---

## Overview

**Working Chart.** The site is a navigator's working nautical chart. Every screen has two layers:

1. **The printed chart (the system).** Flat and exact: NOAA paper-chart colors, depth bands, 1px depth contours, italic soundings, a graduated border scale, a cartouche title block, a compass rose. This layer carries the grid and the hierarchy.
2. **The pencil layer (the human).** What a navigator adds while working: a dashed course line through circled position fixes. Graphite gray, sparse.

**Why this subject.** Marcel builds software for Gamantaray UGM's autonomous surface vessel (a robot boat): the vision pipeline and the mission map. A chart is his real working surface, so every motif comes from a real artifact (NOAA Chart No. 1 symbology), not from a UI kit.

**Voice.** Plain, specific, a little dry ("Uncharted waters" on the 404). Facts over adjectives. Sentence case everywhere.

**Light by design.** Flat print: no gradients, blur, glass, shadows or WebGL. Decoration is inline SVG line work and CSS. Pages are static HTML; client JavaScript is limited to the active nav link, the contact form and the Last.fm widget.

## Colors

All colors come from the NOAA NCWG paper-chart baseline palette (NOAA Technical Memorandum NOS CS 60) and keep the job they have on a chart. Fills are always flat.

- **Primary, Chart Black (#000000):** text, coastline, neatlines, primary buttons. Pure black, as printed.
- **Secondary, Contour Blue (#1788BA):** 1px depth contours and dividers only. It is 3.99:1 on white, so never body text.
- **Tertiary, Nautical Purple (#9C3B8E):** the compass-rose and aids-to-navigation color. The only accent: active nav, hover, focus ring, award notes, the compass rose. Never a large fill, never a gradient.
- **Neutral, Deep Water (#FFFFFF):** the page background.
- **Sea (#DDF2FD), Shallow (#B1E1F4), Shoal (#85CFEB):** depth tints, lightest to darkest toward the coast. Water areas in illustrations and hover fills.
- **Land, Buff (#FBF0C6) with Land Ink (#77562A):** land masses and the footer. Never the page background.
- **Pencil (#5A5E62):** plotted course lines, position fixes, meta text such as dates.

## Typography

Two families with clearly separate jobs, following chart lettering (water features are lettered in sloping type).

- **Newsreader**: italic for the display name, page titles and section titles; roman for body text (18px, line height 1.6, at most about 68 characters per line) and semibold h3.
- **B612**: navigation, buttons, form labels, dates, coordinates and other short labels. Designed by Airbus for cockpit displays. Sentence case, never all caps, never tracked out.

No other families. No monospace labels.

## Layout

- **Sheet.** Content sits in a 1120px column with 20px gutters on mobile and 56px on desktop.
- **Border scale.** From 1024px up, both viewport edges carry a fixed 8px graduated scale: 1px black outline with alternating 40px black and white segments, like a chart's latitude border.
- **Header.** Compass rose and "Marcel" (Newsreader italic) on the left, B612 links on the right, a 1px black rule underneath. On mobile the links wrap to a second row; there is no hamburger menu.
- **Home.** Two columns: the cartouche (name, role, place and coordinates on separate lines), intro and buttons on the left; a square-cornered chart illustration on the right with the portrait as an inset on the land. Below: "Current position" and "Recent results" as ruled lists.
- **Inner pages.** Big italic title, one intro paragraph, then a single wavy contour line as the divider.
- **Rhythm.** 56–80px between sections on desktop, 48px on mobile. Asymmetric columns, left aligned text. No centered hero, no card grid.

## Elevation & Depth

Flat print. No drop shadows, blur, glass or glow. Hierarchy comes from line weight (1px rule, then the cartouche's double rule: 1px border plus a 2px outline 4px outside it), from depth tints and from type size. Hover never lifts with a shadow; it changes color (black to Nautical Purple), underline weight or the fill tint.

## Shapes

Rectangles with square corners, like chart insets: 0 radius on panels, buttons, inputs and images. Full circles only for position fixes and the compass rose. Screenshots and the portrait sit in a 1px black frame with a small black-and-white scale bar under the image.

## Components

- **Buttons.** Primary: black fill, white B612 text, 48px tall, square; on hover Nautical Purple sweeps in from the left. Secondary: white with a 1px black border; on hover Sea sweeps in from the left. Labels say what happens ("See projects", "Send message"). No arrows appended.
- **Chart illustration.** Land (Buff) top right with a 1.5px coastline; Shoal, Shallow and Sea bands parallel to the coast with 1px Contour Blue lines labelled 5, 10, 20, 30; about twenty italic soundings whose depth grows away from the coast; a Nautical Purple compass rose; a dashed pencil track with four circled fixes ending near the portrait.
- **Project inset.** Screenshot in a framed inset (7 of 12 columns) beside the title (Newsreader italic), award in Nautical Purple B612, summary, "Built with ..." in pencil B612, and "Live site" / "Source code" links. Projects without screenshots are a two-column text list.
- **Skills legend.** A table: group name in Newsreader italic on the left, items as a wrapped inline list on the right, 1px black row rules.
- **Experience track.** A vertical dashed pencil line with a 23px position-fix circle at each role: dates in B612, role in Newsreader italic, organization, then bullet points.
- **Contact form.** Labels in B612 above inputs that only have a 1px black bottom border, 18px text, a 2px Nautical Purple focus ring, and a polite live status line next to the button.
- **Now playing.** A small fixed panel bottom right on desktop: 40px album art, "Listening now" or "Last played" in pencil, track and artist, linking to a Spotify search.
- **Footer.** A Buff land strip under a wavy coastline: name, place, links (GitHub, LinkedIn, X, CV) and "Edition of <month year>".

## Do's and Don'ts

**Motion (all of it disabled under prefers-reduced-motion)**

The owner wants the site to feel alive, so everything moves, but slowly and with one easing, cubic-bezier(0.16, 1, 0.3, 1).

- Page load: headings are lettered in word by word (each word slides up from behind a clip), then the rest rises 24px and fades in, staggered; the contour divider under page titles is drawn left to right; the cartouche's outer rule settles onto the frame.
- Home chart, when it scrolls into view: contours sketch in, soundings fade in one by one, the compass rose swings and settles on north, then a small purple boat sails the dashed course line as it is drawn, a fix pops in at each point, and two sonar pings mark the current position and stop.
- Scroll: every section heading, row and project rises in as it enters the viewport (an IntersectionObserver adds a class; CSS does the motion), staggered when several arrive together. Wheel scrolling is smoothed with Lenis. On desktop a purple marker rides the left border scale with the scroll position. The About experience track draws itself while scrolling.
- Hover: nav underlines draw in from the left; link underlines drop slightly; buttons fill from the left; list rows get a Sea band sweeping in behind them and shift 10px right; project screenshots zoom to 1.05, their frame turns purple and the scale bar stretches; experience fixes turn purple; the logo's compass swings 90 degrees.
- Parallax and depth (Motion): the hero text, chart and portrait drift against the mouse at different depths and the chart tilts slightly; the chart lags the scroll; both compass roses turn as you scroll; project screenshots slide in from alternating sides, tilt toward the pointer and pan inside their frames; the footer's oversized name slides sideways; a purple progress line runs along the top; a purple ring follows the mouse and grows over links; buttons are magnetic.
- Showpieces: a first-visit intro (compass swings in over "Marcel", a scale bar fills, the sheet lifts away; once per session); a big italic skills marquee that speeds up and reverses with scroll velocity and pauses on hover; featured projects as chart sheets that pin and stack on desktop, earlier ones shrinking back; nav and button labels roll up on hover.
- Scrollbar: purple thumb on a paper track ruled off with a black line, never the browser default.
- Page changes use the View Transitions API: the old page fades up and out, the new one fades in while its own entrances play; the header stays still.

**Do**

- Take every decoration from a real chart symbol: contour, sounding, neatline, scale bar, compass rose, position fix, course line.
- Keep Nautical Purple rare, at most about 5% of any screen.
- Keep it light: inline SVG and CSS, two font families, WebP screenshots. Motion (Framer Motion) drives parallax, tilt, magnetic buttons, the cursor ring and scroll-linked pieces; Lenis smooths wheel scrolling.
- Keep text contrast at 4.5:1 or better.

**Don't**

- No gradients of any kind, no gradient text, no purple, indigo or blue fades.
- No glassmorphism, backdrop blur, drop shadows, glows, neon or WebGL backgrounds.
- No centered hero with three feature cards, no bento grid, no icon-in-a-rounded-square tiles, no decorative 01/02/03 numbering, no fake window dots.
- No cream with terracotta, no black with acid green, no all-caps or monospace label chrome, no meta strings joined with middle dots.
- No emoji, no sparkles, no copy like "seamless", "elevate" or "cutting-edge", no arrows appended to buttons.
- No bouncy or looping motion: entrances move 32px at most, finish within about 2 seconds, and nothing repeats for more than 5 seconds.
