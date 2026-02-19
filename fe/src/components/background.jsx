import { motion } from "framer-motion";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import {
  SiCss3,
  SiDocker,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \\
  int index = 0;                                            \\
  for (int i = 0; i < 2; i++) {                               \\
     ColorStop currentColor = colors[i];                    \\
     bool isInBetween = currentColor.position <= factor;    \\
     index = int(mix(float(index), float(i), float(isInBetween))); \\
  }                                                         \\
  ColorStop currentColor = colors[index];                   \\
  ColorStop nextColor = colors[index + 1];                  \\
  float range = nextColor.position - currentColor.position; \\
  float lerpFactor = (factor - currentColor.position) / range; \\
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

function Aurora(props) {
  const {
    colorStops = ["#5227FF", "#7cff67", "#5227FF"],
    amplitude = 1.0,
    blend = 0.5,
  } = props;
  const propsRef = useRef(props);
  propsRef.current = props;

  const ctnDom = useRef(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";

    let program;

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener("resize", resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = colorStops.map((hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const update = (t) => {
      animateId = requestAnimationFrame(update);
      const { time = t * 0.01, speed = 1.0 } = propsRef.current;
      program.uniforms.uTime.value = time * speed * 0.1;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
      const stops = propsRef.current.colorStops ?? colorStops;
      program.uniforms.uColorStops.value = stops.map((hex) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude]);

  return <div ref={ctnDom} className="w-full h-full" />;
}

// Floating Icons with improved animations
const FloatingIcons = () => {
  const icons = [
    {
      Icon: SiReact,
      color: "text-cyan-400/40",
      x: "8%",
      y: "12%",
      duration: 15,
      rotateRange: [0, 360],
      scaleRange: [0.8, 1.3, 0.8],
    },
    {
      Icon: SiJavascript,
      color: "text-yellow-300/40",
      x: "88%",
      y: "18%",
      duration: 18,
      rotateRange: [0, -360],
      scaleRange: [0.9, 1.2, 0.9],
    },
    {
      Icon: SiPython,
      color: "text-blue-400/40",
      x: "12%",
      y: "78%",
      duration: 20,
      rotateRange: [0, 360],
      scaleRange: [0.7, 1.4, 0.7],
    },
    {
      Icon: SiGo,
      color: "text-cyan-300/40",
      x: "85%",
      y: "72%",
      duration: 16,
      rotateRange: [0, -360],
      scaleRange: [0.8, 1.2, 0.8],
    },
    {
      Icon: SiNodedotjs,
      color: "text-green-400/40",
      x: "22%",
      y: "42%",
      duration: 22,
      rotateRange: [0, 360],
      scaleRange: [0.9, 1.3, 0.9],
    },
    {
      Icon: SiMongodb,
      color: "text-green-500/40",
      x: "78%",
      y: "48%",
      duration: 19,
      rotateRange: [0, -360],
      scaleRange: [0.8, 1.25, 0.8],
    },
    {
      Icon: SiHtml5,
      color: "text-orange-400/40",
      x: "48%",
      y: "8%",
      duration: 17,
      rotateRange: [0, 360],
      scaleRange: [0.85, 1.3, 0.85],
    },
    {
      Icon: SiCss3,
      color: "text-blue-500/40",
      x: "52%",
      y: "88%",
      duration: 21,
      rotateRange: [0, -360],
      scaleRange: [0.9, 1.2, 0.9],
    },
    {
      Icon: SiTailwindcss,
      color: "text-teal-400/40",
      x: "5%",
      y: "50%",
      duration: 23,
      rotateRange: [0, 360],
      scaleRange: [0.7, 1.35, 0.7],
    },
    {
      Icon: SiDocker,
      color: "text-blue-400/40",
      x: "92%",
      y: "45%",
      duration: 18,
      rotateRange: [0, -360],
      scaleRange: [0.8, 1.28, 0.8],
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.3, 0.5, 0.3, 0],
            scale: item.scaleRange,
            y: [0, -30, -15, -25, 0],
            x: [0, 10, -5, 8, 0],
            rotate: item.rotateRange,
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.8,
          }}
          className="absolute"
          style={{ left: item.x, top: item.y }}
        >
          <item.Icon
            className={`${item.color} text-3xl sm:text-4xl lg:text-5xl xl:text-6xl drop-shadow-lg`}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Floating Particles
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0.8, 0.3, 0],
            y: [0, -80, -150, -220],
            x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
            scale: [0.3, 0.8, 1.1, 0.6],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut",
          }}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, rgba(255, 193, 7, 0.4), rgba(156, 39, 176, 0.2))`,
          }}
        />
      ))}
    </div>
  );
};

// Floating Geometric Shapes
const FloatingShapes = () => {
  const shapes = [
    {
      type: "square",
      x: "15%",
      y: "20%",
      size: 40,
      rotation: 45,
      color: "rgba(255, 193, 7, 0.15)",
    },
    {
      type: "circle",
      x: "80%",
      y: "25%",
      size: 30,
      rotation: 0,
      color: "rgba(156, 39, 176, 0.15)",
    },
    {
      type: "triangle",
      x: "25%",
      y: "70%",
      size: 35,
      rotation: 120,
      color: "rgba(33, 150, 243, 0.15)",
    },
    {
      type: "square",
      x: "75%",
      y: "65%",
      size: 25,
      rotation: 0,
      color: "rgba(76, 175, 80, 0.15)",
    },
  ];

  const getClipPath = (type) => {
    if (type === "triangle") return "polygon(50% 0%, 0% 100%, 100% 100%)";
    return "none";
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: shape.rotation }}
          animate={{
            opacity: [0, 0.4, 0.6, 0.4, 0],
            scale: [0.8, 1.2, 1, 1.3, 0.8],
            rotate: [
              shape.rotation,
              shape.rotation + 180,
              shape.rotation + 360,
            ],
            y: [0, -30, -15, -25, 0],
          }}
          transition={{
            duration: 12 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 1,
          }}
          className="absolute backdrop-blur-sm border border-white/10"
          style={{
            left: shape.x,
            top: shape.y,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            backgroundColor: shape.color,
            borderRadius: shape.type === "circle" ? "50%" : "8px",
            clipPath: getClipPath(shape.type),
          }}
        />
      ))}
    </div>
  );
};

// Floating Code Symbols
const FloatingCodeSymbols = () => {
  const symbols = [
    { text: "</>", x: "12%", y: "30%", delay: 0 },
    { text: "{ }", x: "88%", y: "35%", delay: 1 },
    { text: "[ ]", x: "18%", y: "60%", delay: 2 },
    { text: "=>", x: "82%", y: "58%", delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block opacity-25">
      {symbols.map((symbol, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.3, 0.5, 0.3, 0],
            y: [0, -20, -10, -18, 0],
            rotate: [-5, 5, -3, 4, -5],
            scale: [0.9, 1.1, 1, 1.15, 0.9],
          }}
          transition={{
            duration: 10 + index * 1.5,
            repeat: Infinity,
            delay: symbol.delay,
            ease: "easeInOut",
          }}
          className="absolute text-yellowg/30 font-mono text-2xl font-bold"
          style={{
            left: symbol.x,
            top: symbol.y,
          }}
        >
          {symbol.text}
        </motion.div>
      ))}
    </div>
  );
};

// Main Background Component with Aurora + All Floating Elements
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Aurora Background */}
      <div className="absolute inset-0 w-full h-screen bg-black">
        <Aurora
          colorStops={["#682d63", "#414288", "#5fb49c"]}
          amplitude={1.5}
          blend={0.6}
          speed={0.8}
        />
      </div>

      {/* Floating Tech Icons */}
      <FloatingIcons />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Floating Shapes */}
      <FloatingShapes />

      {/* Floating Code Symbols */}
      <FloatingCodeSymbols />
    </div>
  );
}
