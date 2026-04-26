import { useRef, useEffect, useState } from 'react';
import { legalSystems, relationships } from '../data/dossierData';

interface Node {
  id: string; x: number; y: number; vx: number; vy: number;
}

export function NetworkGraph({ onSelect, selected }: { onSelect: (id: string) => void; selected: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const width = 800, height = 500;
    const initial: Node[] = legalSystems.map((s, i) => {
      const angle = (i / legalSystems.length) * Math.PI * 2;
      const radius = 180;
      return {
        id: s.id,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: 0, vy: 0
      };
    });
    setNodes(initial);
  }, []);

  useEffect(() => {
    if (!nodes.length) return;
    let raf = 0;
    const width = 800, height = 500;

    const tick = () => {
      setNodes(prev => {
        const next = prev.map(n => ({ ...n, vx: n.vx * 0.9, vy: n.vy * 0.9 }));
        for (let i = 0; i < next.length; i++) {
          for (let j = i + 1; j < next.length; j++) {
            const dx = next[j].x - next[i].x, dy = next[j].y - next[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 2000 / (dist * dist);
            const fx = (dx / dist) * force, fy = (dy / dist) * force;
            next[i].vx -= fx; next[i].vy -= fy; next[j].vx += fx; next[j].vy += fy;
          }
        }
        relationships.forEach(r => {
          const a = next.find(n => n.id === r.source);
          const b = next.find(n => n.id === r.target);
          if (a && b) {
            const dx = b.x - a.x, dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const target = 100 + (10 - r.strength) * 15;
            const force = (dist - target) * 0.02 * (r.strength / 10);
            const fx = (dx / dist) * force, fy = (dy / dist) * force;
            a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
          }
        });
        next.forEach(n => {
          n.x += n.vx; n.y += n.vy;
          n.x = Math.max(30, Math.min(width - 30, n.x));
          n.y = Math.max(30, Math.min(height - 30, n.y));
        });
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [nodes.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !nodes.length) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    relationships.forEach(r => {
      const a = nodes.find(n => n.id === r.source);
      const b = nodes.find(n => n.id === r.target);
      if (a && b) {
        ctx.strokeStyle = `rgba(56, 189, 248, ${r.strength / 20})`;
        ctx.lineWidth = r.strength / 3;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    });
    nodes.forEach(n => {
      const sys = legalSystems.find(s => s.id === n.id)!;
      const isHovered = hovered === n.id;
      const isSelected = selected === n.id;
      const r = 12 + sys.momentum;
      ctx.fillStyle = sys.color;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fill();
      if (isHovered || isSelected) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowColor = sys.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.fillStyle = '#fff';
      ctx.font = '11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(sys.id.toUpperCase(), n.x, n.y + r + 15);
    });
  }, [nodes, hovered, selected]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const found = nodes.find(n => {
      const dx = n.x - x, dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 25;
    });
    setHovered(found?.id || null);
  };

  const handleClick = () => {
    if (hovered) onSelect(hovered);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      onMouseMove={handleMove}
      onClick={handleClick}
      className="cursor-pointer rounded-lg"
    />
  );
}
