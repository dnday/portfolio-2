# Stitch: style "Working Chart" + prompt

Panduan memakai Google Stitch untuk eksplorasi/refine UI portfolio ini. Desain yang sudah diimplementasikan di kode
mengikuti `DESIGN.md` (format resmi Stitch, lolos `npx -p @google/design.md designmd lint DESIGN.md`).

## Kenapa style ini

- **Yang dihindari.** Ciri "AI slop" tingkat pertama: gradien ungu-biru, Inter, glassmorphism, teks bergradien,
  fade-up di setiap section. Versi lama (`aurora` + kaca + ikon melayang) kena semuanya. Ciri tingkat kedua yang
  "terlihat berselera": krem + aksen terakota/vermilion, satu kata headline diberi warna aksen, label monospace
  huruf kapital. Eksperimen `porto-v2` (krem `#fbf9f4` + `#ff4500`, "marcel.**dev**") kena yang ini.
- **Yang dipakai.** Skill `frontend-design` dari Anthropic dan `avoid-ai-design` sama-sama menyarankan desain yang
  diturunkan dari *materi dan artefak subjeknya sendiri*. Marcel membangun software untuk kapal otonom Gamantaray UGM,
  jadi artefaknya adalah **peta laut navigasi**: palet resmi NOAA (NOS CS 60), kontur kedalaman, sounding, mawar
  kompas, skala tepi, jalur haluan pensil. Spesifik ke orangnya, bukan template.
- **Ringan.** Peta itu cetakan datar: tanpa gradien, blur, bayangan, WebGL. Dekorasi = SVG statis + CSS.

## Cara pakai di Stitch (manual)

1. Buat project baru di stitch.withgoogle.com, pilih **Web**, model yang lebih teliti (Pro/Thinking).
2. Ganti design system project dengan isi `DESIGN.md` (Stitch menyimpan design system sebagai DESIGN.md).
   Kalau tidak ketemu menu impornya, tempel isi DESIGN.md di awal Prompt 1.
3. Jalankan **Prompt 1**, lalu Prompt 2–5 satu per satu (masing-masing menambah satu layar).
4. Refine dengan prompt R1–R5: **satu perubahan per prompt**. Prompt panjang (>5.000 karakter) membuat Stitch
   menghilangkan komponen, dan beberapa perubahan sekaligus bisa membuat layout dibuat ulang dari nol.
5. Export kode (HTML/Tailwind), lalu minta Claude memindahkan perubahan ke komponen Next.js.
   Konten tetap di `src/content.js`.

## Opsi: hubungkan Stitch langsung ke Claude Code (MCP resmi, gratis)

Buat API key di Stitch → foto profil → Stitch Settings → API Key → Create Key. Lalu jalankan **di terminal Anda
sendiri** (jangan lewat `!` di chat, supaya key tidak tercatat di percakapan):

```sh
claude mcp add stitch --transport http https://stitch.googleapis.com/mcp --header "X-Goog-Api-Key: API_KEY_ANDA" -s user
```

Restart Claude Code, cek dengan `/mcp`, lalu minta: "buat layar dari fe/DESIGN.md dan fe/STITCH.md lewat Stitch".
Nama tool MCP Stitch (`create_project`, `generate_screen_from_text`, `get_screen`, ...) belum didokumentasikan
resmi dan bisa berubah.

MCP gratis lain yang berguna untuk UI/UX (opsional): Chrome DevTools MCP
(`claude mcp add chrome-devtools -- npx chrome-devtools-mcp@latest`) untuk trace performa, Playwright MCP
(`claude mcp add playwright -- npx @playwright/mcp@latest`) untuk cek visual otomatis.

## Prompt 1: Home

```text
Design the HOME page of a personal portfolio website (desktop, 1440px wide). Follow the attached DESIGN.md ("Working Chart") exactly: the page is a navigator's working nautical chart. Flat NOAA chart colors, square corners, two typefaces (Newsreader and B612), no gradients, no shadows, no cards.

Person: Marcelinus Dinoglide Yoga Prakoso ("Marcel"), software engineer and Information Engineering student at Universitas Gadjah Mada, Yogyakarta, Indonesia.

Layout, top to bottom:
1. Header: a small purple compass rose and "Marcel" in Newsreader italic on the left; the links "Projects", "Skills", "About", "Contact" in B612 on the right; a 1px black rule below.
2. Hero in two top-aligned columns.
   Left: a cartouche (a black double-rule box with square corners) holding the name "Marcelinus Dinoglide Yoga Prakoso" in very large Newsreader italic on three lines, then "Software engineer and Information Engineering student at Universitas Gadjah Mada." and, in small gray B612 on two lines, "Yogyakarta, Indonesia" and "7°46′ S  110°22′ E". Under the box an intro paragraph: "Most of my work is on the backend: APIs, data pipelines and the dashboards on top of them. Right now I'm teaching an autonomous boat to recognise what's in the water, and writing the software around a medical wearable." Then two square buttons: "See projects" (black fill, white text) and "Get in touch" (white with a 1px black border).
   Right: a framed nautical chart illustration, about 500 by 570px. A buff land mass in the top-right with a black coastline. Three blue depth bands parallel to the coast (#85CFEB nearest the coast, then #B1E1F4, then #DDF2FD). Thin #1788BA contour lines labelled 5, 10, 20 and 30. About twenty small italic depth numbers scattered in the water, larger further from the coast. A purple (#9C3B8E) compass rose in the open water on the left. A dashed gray pencil course line with four small circled position fixes, running from the bottom-left toward the coast. The portrait photo sits as a framed inset on the land in the top-right, with a tiny black-and-white scale bar under it.
3. Section "Current position" (Newsreader italic heading) with two items side by side. First: small gray "Since Dec 2025", bold "Software Programmer, Gamantaray UGM", then "Building the boat's vision system and the dashboard we watch during field tests. We placed 3rd at KKI 2026." Second: "Since Jan 2026", "Software Engineer, OstoSense", then "Writing the backend, dashboard and patient app for a medical wearable funded by PKM-KC."
4. Section "Recent results" as a ruled list with two columns (result on the left, detail in gray on the right):
   3rd place, Kontes Kapal Indonesia 2026 | Autonomous boat, with Gamantaray UGM
   1st place, Bootcamp AI DTETI UGM 2026 | Post-disaster damage triage
   2nd place, Bootcamp IoT DTETI UGM 2026 | Smart harvest window optimizer
   PKM-KC 2026 research grant | OstoSense, Kemdiktisaintek
5. Footer: a buff land strip under a wavy black coastline with the name, "Yogyakarta, Indonesia", the links GitHub, LinkedIn, X and "CV (PDF)", and "Edition of October 2026".
Along the left and right edges of the viewport, a thin vertical chart border scale with alternating black and white segments.
```

## Prompt 2: Projects

```text
Add a new screen: PROJECTS page. Same header, footer, border scale and DESIGN.md rules. "Projects" is the active nav link (purple, underlined).
Top: the title "Projects" in very large Newsreader italic, the intro "Things I've built for competitions, classes and research teams. Where there's a live site or public code, it's linked.", then one thin wavy #1788BA contour line as the divider.
Three featured projects, each one row: on the left (7 of 12 columns) a screenshot in a 1px black frame with a small scale bar; on the right the title in Newsreader italic, a one or two sentence summary, a small gray B612 line "Built with ...", and text links.
1. AI Recruitment Platform. "Screens resumes with Gemini and scores each one against the job it was sent for. I built the API behind it, including roles and sign-in." Built with NestJS, PostgreSQL, Gemini. Link: Live site.
2. PIONIR Kesatria 2025. "The event website, with an interactive map. More than 500 people used it during the event." Built with Next.js, Tailwind CSS. Link: Live site.
3. AI Summarization Tool. "Turns long articles into short summaries using DeepSeek or GPT." Built with React, Tailwind CSS. Links: Live site, Source code.
Then a section "More projects" as a two-column text list, no images and no cards:
- Post-Disaster Damage Triage System, with a purple award line "1st place, Bootcamp AI DTETI 2026". "Spots damaged buildings in satellite images from before and after a disaster, then drafts a triage report based on BNPB procedures." Built with SegFormer, FAISS, Gemini.
- Instride. "A mood tracker for students that their counselors can follow, with privacy built into the database." Built with Next.js, Supabase. Link: Source code.
- EV Charging Station Queue Simulation. "Simulates the queues at 32 EV charging stations in Yogyakarta and animates them live, with a dashboard for what-if scenarios." Built with Next.js, p5.js, SimPy. Links: Live site, Source code.
- Smart Harvest Window Optimizer, with a purple award line "2nd place, Bootcamp IoT DTETI 2026". "A small ESP32 sensor setup that predicts when chili plants are ready to harvest." Built with ESP32, MQTT, Node-RED. Link: Source code.
- Restaurant Menu API. "A Go API that suggests dishes by mood and reads the sentiment of reviews." Built with Go, MongoDB, Gemini. Link: Source code.
```

## Prompt 3: Skills

```text
Add a new screen: SKILLS page. Same header, footer, border scale and DESIGN.md rules. "Skills" is the active nav link.
Title "Skills", intro "What I use most, from backend and web to robotics.", then the wavy contour divider.
A legend table with 1px black row rules. Left column: the group name in Newsreader italic. Right column: the items as a wrapped inline list in Newsreader. No chips, no icons, no tiles.
Languages: Python, Go, TypeScript, JavaScript, C++, SQL
Web and backend: FastAPI, NestJS, Next.js, React, Tailwind CSS
Data: PostgreSQL, Supabase, MongoDB, Firebase
Infrastructure: Docker, Nginx, Linux, GitHub Actions, Vercel
AI and robotics: YOLOv8, OpenVINO, OpenCV, Gemini API, ROS 2, ESP32, MQTT
Under the table: "Spoken: Indonesian (native) and English."
Then a section "Certificates" with two links: "Google Cloud skill badges" followed by gray ", Credly", and "Getting Started with Haskell" followed by gray ", Dicoding".
```

## Prompt 4: About

```text
Add a new screen: ABOUT page. Same header, footer, border scale and DESIGN.md rules. "About" is the active nav link. Title "About" and the wavy contour divider.
Two columns. Left, two paragraphs at 20px:
"I'm Marcel. I study Information Engineering at Universitas Gadjah Mada in Yogyakarta and plan to graduate in 2028."
"Most of my time goes to two teams: Gamantaray, where I work on the software for an autonomous boat, and OstoSense, a medical wearable funded by PKM-KC. I also run workshops with KMTETI, and I've helped organize competitions like FindIT! and Technocorner."
Right: the portrait in a 1px black frame with a small scale bar.
Section "Education": dates "Jul 2024 – expected 2028", "Universitas Gadjah Mada", "Bachelor of Engineering in Information Engineering". Do not show any GPA.
Section "Experience": a vertical dashed gray pencil line with a circled position fix at each role. For each role show the dates in small B612, the role in Newsreader italic, the organization, then one to three short bullet points.
Role 1: dates Dec 2025 – present; role Software Programmer; organization Gamantaray UGM, autonomous boat team; bullets: "Trained the object detection model the boat uses, from labelling the dataset to running it in real time on the onboard computer." "Built the mission dashboard: live position on a map with the waypoints and buoys, next to the onboard camera feed." "Our team placed 3rd at Kontes Kapal Indonesia 2026."
Role 2: dates Dec 2025 – Jun 2026; role Hacker (backend developer); organization Google Developer Group on Campus UGM, KosCheck; bullets: "Built the backend for KosCheck, which flags suspicious boarding-house listings using a mix of rules and an LLM." "Shipped it in Docker behind Nginx, where it handled more than 100 requests per second."
Role 3: dates Jan 2026 – present; role Software Engineer; organization OstoSense, PKM-KC 2026 research; bullets: "Our wearable estimates the risk of an ostomy leak, and the team won national PKM-KC 2026 funding for it." "I build the software around the device: a NestJS backend fed by its sensors over MQTT, a dashboard for clinicians and an app for patients."
Role 4: dates May 2025 – Aug 2025; role Website Developer; organization PIONIR Kesatria UGM, HumIT division; bullet: "Built the event website. More than 500 people used it during the event."
Section "Organizations" as a ruled list with three columns (role, organization, dates): Workshop Division Staff, KMTETI FT UGM, Jan 2025 – present. CTF Technical Staff, FindIT! UGM, Oct 2025 – May 2026. Robotics Technical Staff, Technocorner UGM, Oct 2024 – Jun 2025. Human Resources Staff, Misa Kampus UGM, Sep 2024 – Feb 2026. Logistics and Equipment Division Staff, FindIT! UGM, Oct 2024 – May 2025.
Section "Awards" as a ruled two-column list: the four results from the Home page, plus "Silver medal, ISTEC 2023" with "Life science category", and "UKBI 726, rated Istimewa" with "Indonesian language proficiency test".
```

## Prompt 5: Contact

```text
Add a new screen: CONTACT page. Same header, footer, border scale and DESIGN.md rules. "Contact" is the active nav link.
Title "Contact", intro "Send a message and I'll reply by email.", then the wavy contour divider.
Left: a form like a ruled log sheet with the fields Name, Email, Subject and Message (a textarea). Labels in B612 above each field; inputs have only a 1px black bottom border, 48px tall, square corners. A black "Send message" button with an empty status line beside it.
Right: a narrow column separated by a 1px black rule, with the links GitHub, LinkedIn, X and "Download my CV (PDF)".
```

## Prompt refine (satu perubahan per prompt)

```text
R1. On every screen, check the chart border scale along the left and right viewport edges: an 8px strip, 16px from the edge, 1px black outline, alternating 40px black and white segments. Change nothing else.
```

```text
R2. Create the mobile version (390px) of the Home screen: the header links wrap to a second row under the logo (no hamburger menu), the chart illustration goes below the buttons at full width, 20px side margins, 18px body text. Change nothing else.
```

```text
R3. Add a 404 screen titled "Uncharted waters" with the text "This page isn't on the chart. It may have moved, or the link has a typo." and a black square button "Back to the home page". Same header and footer.
```

```text
R4. This screen drifted toward a generic template. Remove every gradient, shadow, blur, rounded corner, card container, icon tile and emoji, and put the content back on white with 1px black rules as in DESIGN.md. Keep the layout.
```

```text
R5. Make a dark variant of the Home screen using the ECDIS night palette: background #0B0F13, depth bands #0F1A22, #12212C and #16293A, contours #2A6F8F, text #C9D3DA, accent #C46BB6, land #2A2618. Same layout, no glow.
```

## Sumber riset

- Panduan prompt resmi Stitch: https://discuss.ai.google.dev/t/stitch-prompt-guide/83844
- Spesifikasi DESIGN.md: https://github.com/google-labs-code/design.md
- Stitch MCP untuk Claude Code: https://sotaaz.com/post/stitch-mcp-api-en
- Skill frontend-design (Anthropic): https://github.com/anthropics/skills/tree/main/skills/frontend-design
- Pola desain buatan AI: https://github.com/funboy322/avoid-ai-design
- Tren anti-AI 2026: https://www.visuapexcreatives.com/2026-design-trends-anti-ai-craft/
- Vercel Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines
- Palet peta NOAA (NOS CS 60, Annex A): https://repository.library.noaa.gov/view/noaa/66438
