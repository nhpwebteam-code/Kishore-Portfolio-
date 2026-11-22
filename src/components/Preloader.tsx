import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isFlash, setIsFlash] = useState<boolean>(false);
  const [isWiping, setIsWiping] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const waveLineRef = useRef<SVGPathElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const handleFinish = useCallback(() => {
    sessionStorage.setItem("rkr_intro_seen", "true");
    setIsVisible(false);
    onComplete();
  }, [onComplete]);

  // Check session and reduced motion
  useEffect(() => {
    if (sessionStorage.getItem("rkr_intro_seen")) {
      handleFinish();
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      handleFinish();
      return;
    }
  }, [handleFinish]);

  // WebGL Shaders for slow drifting red smoke
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true });
    if (!gl) return;

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(0.87, 0.5, -0.5, 0.87);
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.02 + vec2(15.0);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        // Slow upward and horizontal drifting motion
        vec2 q = vec2(st.x * 1.8 + u_time * 0.02, st.y * 1.8 - u_time * 0.06);
        float f = fbm(q + fbm(q + u_time * 0.04));

        // Soft, deep red smoke on black (#c1121f to #8b0000)
        vec3 deepRed = vec3(0.757, 0.071, 0.122);
        vec3 darkCrimson = vec3(0.45, 0.02, 0.05);

        float smokeMask = smoothstep(0.25, 0.75, f);
        vec3 col = mix(darkCrimson, deepRed, smokeMask);

        // Low opacity so text stays perfectly readable
        float alpha = smokeMask * 0.32;
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    let shaderRaf: number;
    const render = (time: number) => {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);
      gl.viewport(0, 0, w, h);
      gl.uniform2f(resLoc, w, h);
      gl.uniform1f(timeLoc, time * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      shaderRaf = requestAnimationFrame(render);
    };

    shaderRaf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(shaderRaf);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [isVisible]);

  // Main 3.5s Animation: Progress Counter, Water Fill & Wave Physics
  useEffect(() => {
    if (!isVisible) return;

    const TOTAL_FILL_DURATION = 2800; // 0 to 100% in 2.8s
    const TOTAL_INTRO_DURATION = 3500; // Total sequence duration ~3.5s

    const animateLoop = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      // Calculate progress 0 to 100
      const currentProgress = Math.min(100, (elapsed / TOTAL_FILL_DURATION) * 100);
      setProgress(Math.floor(currentProgress));

      // Calculate water surface position (viewBox: 0 to 450)
      // Height 450 -> 0 as progress goes 0 -> 100
      const viewBoxHeight = 450;
      const waterLevelY = viewBoxHeight * (1 - currentProgress / 100);

      // Wave calculation
      const waveAmplitude = currentProgress >= 100 ? 0 : 8 * (1 - currentProgress / 100) + 4;
      const waveFrequency = 0.015;
      const phase = elapsed * 0.006;

      let pathD = `M 0 450 L 0 ${waterLevelY} `;
      let lineD = `M 0 ${waterLevelY} `;

      const width = 1000;
      const step = 20;

      for (let x = 0; x <= width; x += step) {
        const y = waterLevelY + Math.sin(x * waveFrequency + phase) * waveAmplitude;
        pathD += `L ${x} ${y} `;
        lineD += `L ${x} ${y} `;
      }

      pathD += `L ${width} 450 Z`;

      if (wavePathRef.current) {
        wavePathRef.current.setAttribute("d", pathD);
      }
      if (waveLineRef.current) {
        waveLineRef.current.setAttribute("d", lineD);
      }

      // Check for 100% completion
      if (elapsed >= TOTAL_FILL_DURATION && !isFlash) {
        setIsFlash(true);
        setTimeout(() => {
          setIsFlash(false);
          setIsWiping(true);
        }, 160);
      }

      if (elapsed < TOTAL_INTRO_DURATION) {
        animFrameRef.current = requestAnimationFrame(animateLoop);
      } else {
        handleFinish();
      }
    };

    animFrameRef.current = requestAnimationFrame(animateLoop);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleFinish();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("keydown", handleKey);
    };
  }, [isVisible, isFlash, handleFinish]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="sponge-intro"
        initial={{ clipPath: "inset(0 0 0% 0)" }}
        animate={{
          clipPath: isWiping ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
        }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100000] bg-black text-white flex flex-col items-center justify-center select-none overflow-hidden"
        aria-label="Portfolio Introduction"
      >
        {/* Background WebGL Drifting Red Smoke */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Short Red Flash at 100% */}
        <div
          className={`absolute inset-0 bg-[#ff2d2d] z-30 pointer-events-none transition-opacity duration-150 ${
            isFlash ? "opacity-90" : "opacity-0"
          }`}
        />

        {/* Top Header: Skip Button */}
        <div className="absolute top-6 right-6 md:top-8 md:right-10 z-40">
          <button
            onClick={handleFinish}
            className="flex items-center gap-1.5 text-[11px] tracking-[0.25em] uppercase font-light text-neutral-400 hover:text-white transition-colors cursor-pointer p-2 font-['Inter']"
          >
            <span>Skip</span>
            <span className="text-neutral-600 text-[9px] font-mono">[ESC]</span>
            <span className="text-[var(--accent)] ml-1">→</span>
          </button>
        </div>

        {/* Center: Actor Name in Hollow Text with Water Fill */}
        <div className="relative z-20 w-full max-w-4xl px-4 flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 1000 450"
            className="w-full h-auto max-h-[60vh] overflow-visible"
            aria-label="Ch. Rathna Kishore Reddy"
          >
            <defs>
              {/* Dynamic Wave Clip Path */}
              <clipPath id="waterClip">
                <path ref={wavePathRef} d="M 0 450 L 1000 450 Z" />
              </clipPath>

              {/* Red Liquid Gradient (#c1121f to #ff2d2d) */}
              <linearGradient id="redLiquid" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#c1121f" />
                <stop offset="50%" stopColor="#e61c24" />
                <stop offset="100%" stopColor="#ff2d2d" />
              </linearGradient>

              {/* Crest Glow Filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Outlined / Hollow Text */}
            <g
              fill="none"
              stroke="rgba(255, 255, 255, 0.28)"
              strokeWidth="1.8"
              fontFamily="'Inter', sans-serif"
              fontWeight="200"
              textAnchor="middle"
            >
              <text x="500" y="130" fontSize="115" letterSpacing="10">
                RATHNA
              </text>
              <text x="500" y="255" fontSize="115" letterSpacing="10">
                KISHORE
              </text>
              <text x="500" y="380" fontSize="115" letterSpacing="10">
                REDDY
              </text>
            </g>

            {/* Filled Liquid Text (Clipped by Animated Water Level) */}
            <g
              clipPath="url(#waterClip)"
              fill="url(#redLiquid)"
              fontFamily="'Inter', sans-serif"
              fontWeight="300"
              textAnchor="middle"
            >
              <text x="500" y="130" fontSize="115" letterSpacing="10">
                RATHNA
              </text>
              <text x="500" y="255" fontSize="115" letterSpacing="10">
                KISHORE
              </text>
              <text x="500" y="380" fontSize="115" letterSpacing="10">
                REDDY
              </text>
            </g>

            {/* Wave Surface Glowing Crest Line */}
            <path
              ref={waveLineRef}
              d="M 0 450"
              fill="none"
              stroke="#ff5555"
              strokeWidth="2.5"
              filter="url(#glow)"
              opacity={progress > 0 && progress < 100 ? 0.85 : 0}
            />
          </svg>

          {/* Liquid Progress Percentage Counter */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex items-baseline gap-1 font-mono text-[var(--accent)] font-light text-2xl md:text-3xl tracking-widest">
              <span>{String(progress).padStart(3, "0")}</span>
              <span className="text-xs text-neutral-400 font-sans">%</span>
            </div>

            <div className="w-32 h-[1px] bg-neutral-800 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#c1121f] to-[#ff2d2d] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Editorial Tag */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10 z-20 text-[10px] tracking-[0.3em] uppercase font-light text-neutral-400 font-['Inter']">
          Portfolio Archive · 2026
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
