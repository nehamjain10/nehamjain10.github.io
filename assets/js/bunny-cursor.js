/* Stanford Bunny point sample: see assets/models/bunny-points-source.txt. */
(() => {
  const script = document.currentScript;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  if (motion.matches || !pointer.matches) return;
  fetch(script.dataset.points).then(r => {
    if (!r.ok) throw new Error('Bunny unavailable');
    return r.json();
  }).then(points => {
    const canvas = document.createElement('canvas');
    canvas.className = 'bunny-cursor';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.append(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) { canvas.remove(); return; }
    const size = 112, dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    let x = 0, y = 0, tx = 0, ty = 0, frame = 0, active = false, hover = false;
    let burst = -10000, last = 0, angle = 0;
    const allowed = () => !motion.matches && pointer.matches;
    function stop() {
      active = false;
      cancelAnimationFrame(frame); frame = 0;
      canvas.style.opacity = '0';
      document.documentElement.classList.remove('has-bunny-cursor');
    }
    function draw(now) {
      if (!active || !allowed()) { stop(); return; }
      const dt = Math.min(now - (last || now), 40); last = now;
      const follow = 1 - Math.exp(-dt / 45);
      x += (tx - x) * follow; y += (ty - y) * follow;
      angle += dt * .00035;
      const turn = -.35 + Math.sin(angle) * .65;
      const c = Math.cos(turn), s = Math.sin(turn);
      const t = Math.min(1, Math.max(0, (now - burst) / 850));
      const scatter = Math.sin(t * Math.PI) * (1 - t) * 25;
      ctx.clearRect(0, 0, size, size);
      // Exact click hotspot; the cloud follows just below and to the right.
      ctx.save();
      ctx.translate(28, 28);
      // A tiny carrot; its pointed tip is the exact click position.
      const bounce = Math.sin(t * Math.PI) * (1 - t);
      ctx.rotate(.5 + bounce * .18);
      const grow = 1.2 * ((hover ? 1.12 : 1) + bounce * .12);
      ctx.scale(grow, grow);
      ctx.fillStyle = '#de783e';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-3, -3, -7, -10, -5, -13);
      ctx.quadraticCurveTo(0, -17, 5, -13);
      ctx.bezierCurveTo(7, -10, 3, -3, 0, 0);
      ctx.fill();
      ctx.strokeStyle = '#74864b'; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
      for (const lean of [-1, 0, 1]) {
        ctx.beginPath(); ctx.moveTo(0, -14);
        ctx.quadraticCurveTo(lean * 2, -17, lean * 4, -19);
        ctx.stroke();
      }
      ctx.strokeStyle = '#b6522c'; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.moveTo(-3, -10); ctx.lineTo(-.5, -9);
      ctx.moveTo(3, -6); ctx.lineTo(1, -5.5); ctx.stroke();
      ctx.restore();
      points.forEach((p, i) => {
        const depth = p[0] * s + p[2] * c;
        const px = (p[0] * c - p[2] * s) *  cloudScale + 57 + (x - tx) * .35 + Math.sin(i * 2.4) * scatter;
        const py = -p[1] * cloudScale + 57 + (y - ty) * .35 + Math.cos(i * 1.7) * scatter - Math.sin(t * Math.PI) * 7;
        ctx.globalAlpha = .35 + (depth + .55) * .5;
        ctx.fillStyle = hover ? '#c2512f' : '#49453f';
        ctx.beginPath(); ctx.arc(px, py, .65 + (depth + .5) * .4, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      canvas.style.transform = `translate3d(${tx - 28 * 72 / 112}px,${ty - 28 * 72 / 112}px,0)`;
      frame = requestAnimationFrame(draw);
    }
    const cloudScale = 68;
    document.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse' || !allowed()) return;
      tx = e.clientX; ty = e.clientY;
      hover = !!e.target.closest('a, button, [role="button"]');
      if (!active) {
        active = true; x = tx; y = ty; last = 0;
        canvas.style.opacity = '1';
        document.documentElement.classList.add('has-bunny-cursor');
        frame = requestAnimationFrame(draw);
      }
    }, {passive:true});
    document.addEventListener('pointerdown', () => { burst = performance.now(); }, {passive:true});
    document.documentElement.addEventListener('pointerleave', stop);
    window.addEventListener('blur', stop);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
    document.addEventListener('keydown', e => { if (e.key === 'Tab' || e.key === 'Escape') stop(); });
    motion.addEventListener('change', stop); pointer.addEventListener('change', stop);
  }).catch(() => { /* Native cursor remains available if the asset fails. */ });
})();
