// Site content. Facts follow the CV in D:\College\DataDiri (Oct 2026), worded for the web rather than copied.
// GPA and phone number are deliberately left out.
import evShot from "./assets/Project-ev.webp";
import aiSumShot from "./assets/Project4.webp";
import pionirShot from "./assets/Project3.webp";
import recruitShot from "./assets/Project6.webp";

export const SITE_URL = "https://marcelinusdino.vercel.app";

// URL fragment for a project, e.g. /projects#instride
export const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const profile = {
  name: "Marcelinus Dinoglide Yoga Prakoso",
  role: "Software engineer and Information Engineering student at Universitas Gadjah Mada.",
  place: "Yogyakarta, Indonesia",
  coords: "7°46′ S  110°22′ E",
  intro:
    "Most of my work is on the backend: APIs, data pipelines and the dashboards on top of them. Right now I’m teaching an autonomous boat to recognise what’s in the water, and writing the software around a medical wearable.",
  github: "https://github.com/dnday",
  linkedin: "https://linkedin.com/in/marcelinus-dinoglide-yoga-prakoso",
  x: "https://twitter.com/marcel9994",
  cv: "/CV_MARCELINUS_DINOGLIDE_YOGA_PRAKOSO.pdf",
};

export const education = {
  school: "Universitas Gadjah Mada",
  degree: "Bachelor of Engineering in Information Engineering",
  period: "Jul 2024 – expected 2028",
};

export const experience = [
  {
    org: "Gamantaray UGM",
    team: "autonomous boat team",
    role: "Software Programmer",
    period: "Dec 2025 – present",
    summary: "Building the boat’s vision system and the dashboard we watch during field tests. We placed 3rd at KKI 2026.",
    points: [
      "Trained the object detection model the boat uses, from labelling the dataset to running it in real time on the onboard computer.",
      "Built the mission dashboard: live position on a map with the waypoints and buoys, next to the onboard camera feed.",
      "Our team placed 3rd at Kontes Kapal Indonesia 2026.",
    ],
  },
  {
    org: "Google Developer Group on Campus UGM",
    team: "KosCheck",
    role: "Hacker (backend developer)",
    period: "Dec 2025 – Jun 2026",
    points: [
      "Built the backend for KosCheck, which flags suspicious boarding-house listings using a mix of rules and an LLM.",
      "Shipped it in Docker behind Nginx, where it handled more than 100 requests per second.",
    ],
  },
  {
    org: "OstoSense",
    team: "PKM-KC 2026 research",
    role: "Software Engineer",
    period: "Jan 2026 – present",
    summary: "Writing the backend, dashboard and patient app for a medical wearable funded by PKM-KC.",
    points: [
      "Our wearable estimates the risk of an ostomy leak, and the team won national PKM-KC 2026 funding for it.",
      "I build the software around the device: a NestJS backend fed by its sensors over MQTT, a dashboard for clinicians and an app for patients.",
    ],
  },
  {
    org: "PIONIR Kesatria UGM",
    team: "HumIT division",
    role: "Website Developer",
    period: "May 2025 – Aug 2025",
    points: ["Built the event website. More than 500 people used it during the event."],
  },
];

export const organizations = [
  { org: "KMTETI FT UGM", role: "Workshop Division Staff", period: "Jan 2025 – present" },
  { org: "FindIT! UGM", role: "CTF Technical Staff", period: "Oct 2025 – May 2026" },
  { org: "Technocorner UGM", role: "Robotics Technical Staff", period: "Oct 2024 – Jun 2025" },
  { org: "Misa Kampus UGM", role: "Human Resources Staff", period: "Sep 2024 – Feb 2026" },
  { org: "FindIT! UGM", role: "Logistics and Equipment Division Staff", period: "Oct 2024 – May 2025" },
];

export const projects = [
  {
    title: "AI Recruitment Platform",
    summary:
      "Screens resumes with Gemini and scores each one against the job it was sent for. I built the API behind it, including roles and sign-in.",
    stack: ["NestJS", "PostgreSQL", "Gemini"],
    live: "https://gdgoc-1.vercel.app",
    shot: recruitShot,
  },
  {
    title: "PIONIR Kesatria 2025",
    summary: "The event website, with an interactive map. More than 500 people used it during the event.",
    stack: ["Next.js", "Tailwind CSS"],
    live: "https://pionir-kesatria-ft.vercel.app",
    shot: pionirShot,
  },
  {
    title: "AI Summarization Tool",
    summary: "Turns long articles into short summaries using DeepSeek or GPT.",
    stack: ["React", "Tailwind CSS"],
    live: "https://ai-sum-1jmt.vercel.app",
    repo: "https://github.com/dnday/ai-sum",
    shot: aiSumShot,
  },
  {
    title: "Post-Disaster Damage Triage System",
    award: "1st place, Bootcamp AI DTETI 2026",
    summary:
      "Spots damaged buildings in satellite images from before and after a disaster, then drafts a triage report based on BNPB procedures.",
    stack: ["SegFormer", "FAISS", "Gemini"],
  },
  {
    title: "KosCheck",
    summary:
      "Flags scam boarding-house listings. It checks the price against the area, the photos and the chat with the owner at the same time, then gives a risk score from 0 to 100.",
    stack: ["FastAPI", "Gemini", "Firebase", "Nginx"],
    repo: "https://github.com/dnday/hackathon",
  },
  {
    title: "Instride",
    summary: "A mood tracker for students that their counselors can follow, with privacy built into the database.",
    stack: ["Next.js", "Supabase"],
    repo: "https://github.com/dnday/Instride",
  },
  {
    title: "EV Charging Station Queue Simulation",
    summary:
      "Simulates the queues at 32 EV charging stations in Yogyakarta and animates them live, with a dashboard for what-if scenarios.",
    stack: ["Next.js", "p5.js", "SimPy"],
    live: "https://modsim-finalproject.vercel.app",
    repo: "https://github.com/dnday/modsim-finalproject",
    shot: evShot,
  },
  {
    title: "Smart Harvest Window Optimizer",
    award: "2nd place, Bootcamp IoT DTETI 2026",
    summary: "A small ESP32 sensor setup that predicts when chili plants are ready to harvest.",
    stack: ["ESP32", "MQTT", "Node-RED"],
    repo: "https://github.com/dnday/bootcamp-iot",
  },
  {
    title: "Restaurant Menu API",
    summary: "A Go API that suggests dishes by mood and reads the sentiment of reviews.",
    stack: ["Go", "MongoDB", "Gemini"],
    repo: "https://github.com/dnday/gdgoc-be",
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "Go", "TypeScript", "JavaScript", "C++", "SQL"] },
  { group: "Web and backend", items: ["FastAPI", "NestJS", "Next.js", "React", "Tailwind CSS"] },
  { group: "Data", items: ["PostgreSQL", "Supabase", "MongoDB", "Firebase"] },
  { group: "Infrastructure", items: ["Docker", "Nginx", "Linux", "GitHub Actions", "Vercel"] },
  { group: "AI and robotics", items: ["YOLOv8", "OpenVINO", "OpenCV", "Gemini API", "ROS 2", "ESP32", "MQTT"] },
];

export const spokenLanguages = "Indonesian (native) and English.";

export const awards = [
  { title: "3rd place, Kontes Kapal Indonesia 2026", detail: "Autonomous boat, with Gamantaray UGM" },
  { title: "1st place, Bootcamp AI DTETI UGM 2026", detail: "Post-disaster damage triage" },
  { title: "2nd place, Bootcamp IoT DTETI UGM 2026", detail: "Smart harvest window optimizer" },
  { title: "PKM-KC 2026 research grant", detail: "OstoSense, Kemdiktisaintek" },
  { title: "Silver medal, ISTEC 2023", detail: "Life science category" },
  { title: "UKBI 726, rated Istimewa", detail: "Indonesian language proficiency test" },
];

export const certificates = [
  { title: "Google Cloud skill badges", where: "Credly", url: "https://www.credly.com/users/marcelinus-dinoglide-yoga-prakoso.7441e0a5" },
  { title: "Getting Started with Haskell", where: "Dicoding", url: "https://www.dicoding.com/certificates/6RPNYQDQRZ2M" },
];
