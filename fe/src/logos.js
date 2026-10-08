// Brand logos (Simple Icons) for skills and project stacks, keyed by the names used in content.js.
// Server-side only: pages pass the SVG path and color down, so no icon code reaches the browser.
// YOLOv8 shows its maker Ultralytics, OpenVINO its maker Intel; FAISS is Meta's. Names without a
// logo here (SQL, SimPy) render as text.
import {
  siCplusplus,
  siDeepseek,
  siDocker,
  siEspressif,
  siFastapi,
  siFirebase,
  siGithubactions,
  siGo,
  siGooglegemini,
  siHuggingface,
  siIntel,
  siJavascript,
  siLinux,
  siMeta,
  siMongodb,
  siMqtt,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodered,
  siOpencv,
  siP5dotjs,
  siPostgresql,
  siPython,
  siReact,
  siRos,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siUltralytics,
  siVercel,
} from "simple-icons";

const LOGOS = {
  Python: siPython,
  Go: siGo,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "C++": siCplusplus,
  FastAPI: siFastapi,
  NestJS: siNestjs,
  "Next.js": siNextdotjs,
  React: siReact,
  "Tailwind CSS": siTailwindcss,
  PostgreSQL: siPostgresql,
  Supabase: siSupabase,
  MongoDB: siMongodb,
  Firebase: siFirebase,
  Docker: siDocker,
  Nginx: siNginx,
  Linux: siLinux,
  "GitHub Actions": siGithubactions,
  Vercel: siVercel,
  YOLOv8: siUltralytics,
  OpenVINO: siIntel,
  OpenCV: siOpencv,
  Gemini: siGooglegemini,
  "Gemini API": siGooglegemini,
  "ROS 2": siRos,
  ESP32: siEspressif,
  MQTT: siMqtt,
  "Node-RED": siNodered,
  "p5.js": siP5dotjs,
  SegFormer: siHuggingface,
  FAISS: siMeta,
  DeepSeek: siDeepseek,
};

// Brand colors too dark to read on the night chart.
function isDark(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b < 70;
}

// { name, path, hex, dim } for one technology; path is undefined when there is no logo.
export function logo(name) {
  const icon = LOGOS[name];
  const hex = icon?.hex ?? "9C3B8E";
  return { name, path: icon?.path, hex, dim: isDark(hex) };
}
