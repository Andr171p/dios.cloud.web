"use client";

import { useEffect, useRef } from "react";

type Props = {
  enabled?: boolean;
  className?: string;
};

export function InteractiveGrid({ enabled = true, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0.72, y: 0.28, active: false });

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mediaMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mediaPointer = window.matchMedia("(pointer: fine)");
    if (mediaMotion.matches || !mediaPointer.matches) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const stopLoop = () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;
      if (!pointer.active) {
        rafRef.current = null;
        return;
      }

      const styles = getComputedStyle(document.documentElement);
      const border = styles.getPropertyValue("--border").trim() || "#deddd9";

      const gap = 44;
      const px = pointer.x * width;
      const py = pointer.y * height;
      const radius = 150;

      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.clip();

      ctx.strokeStyle = border;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;

      const startX = Math.floor((px - radius) / gap) * gap;
      const endX = px + radius;
      const startY = Math.floor((py - radius) / gap) * gap;
      const endY = py + radius;

      for (let x = startX; x <= endX; x += gap) {
        ctx.beginPath();
        for (let y = startY; y <= endY; y += 6) {
          const dx = x - px;
          const dy = y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, 1 - dist / radius);
          const offset = force * force * 8 * (dx / (dist || 1));
          const nx = x + offset;
          if (y === startY) ctx.moveTo(nx, y);
          else ctx.lineTo(nx, y);
        }
        ctx.stroke();
      }

      for (let y = startY; y <= endY; y += gap) {
        ctx.beginPath();
        for (let x = startX; x <= endX; x += 6) {
          const dx = x - px;
          const dy = y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, 1 - dist / radius);
          const offset = force * force * 8 * (dy / (dist || 1));
          const ny = y + offset;
          if (x === startX) ctx.moveTo(x, ny);
          else ctx.lineTo(x, ny);
        }
        ctx.stroke();
      }

      ctx.restore();
      rafRef.current = window.requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      pointerRef.current = {
        x: (event.clientX - rect.left) / Math.max(rect.width, 1),
        y: (event.clientY - rect.top) / Math.max(rect.height, 1),
        active: inside,
      };

      if (inside && rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(draw);
      }

      if (!inside) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stopLoop();
      }
    };

    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      stopLoop();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`.trim()}
    />
  );
}
