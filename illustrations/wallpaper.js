(function () {
  'use strict';

  // Respect the user's motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ─── Canvas setup ────────────────────────────────────────────────────────

  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;display:block;';
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext('2d');
  var dpr = 1;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = window.innerWidth  + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
  resize();
  window.addEventListener('resize', resize);

  // ─── Drawing functions ───────────────────────────────────────────────────
  // Coordinates match each SVG's viewBox. Caller handles scale via ctx.scale().

  function drawRobot(c) {
    // Head
    c.beginPath();
    c.moveTo(42, 8);
    c.bezierCurveTo(44, 5, 48, 4, 52, 4);
    c.lineTo(112, 5);
    c.bezierCurveTo(116, 5, 120, 7, 121, 11);
    c.lineTo(122, 68);
    c.lineTo(40, 70);
    c.lineTo(40, 12);
    c.closePath();
    c.stroke();

    // Left eye
    c.beginPath(); c.rect(51, 18, 13, 11); c.stroke();
    // Right eye
    c.beginPath(); c.rect(78, 17, 13, 11); c.stroke();
    // Mouth outer
    c.beginPath(); c.rect(43, 42, 76, 18); c.stroke();

    // Grill bars
    var bars = [55, 66, 77, 88, 99, 110];
    for (var i = 0; i < bars.length; i++) {
      c.beginPath(); c.moveTo(bars[i], 42); c.lineTo(bars[i], 60); c.stroke();
    }

    // Body
    c.beginPath();
    c.moveTo(40, 70);
    c.lineTo(40, 78);  c.lineTo(28, 78);  c.lineTo(24, 84);
    c.lineTo(22, 142); c.lineTo(38, 144); c.lineTo(38, 178);
    c.lineTo(56, 180); c.lineTo(58, 162); c.lineTo(58, 148);
    c.lineTo(88, 148); c.lineTo(88, 166); c.lineTo(92, 180);
    c.lineTo(108, 178); c.lineTo(106, 162); c.lineTo(106, 146);
    c.lineTo(120, 146); c.lineTo(122, 144); c.lineTo(122, 112);
    c.bezierCurveTo(122, 110, 124, 108, 126, 107);
    c.lineTo(154, 95); c.lineTo(148, 82); c.lineTo(126, 88);
    c.bezierCurveTo(124, 89, 122, 88, 122, 86);
    c.lineTo(122, 68); c.lineTo(40, 70);
    c.closePath();
    c.stroke();
  }

  function drawPinFace(c) {
    // Outer shell
    c.beginPath();
    c.moveTo(52, 18);
    c.bezierCurveTo(32, 20, 18, 38, 16, 60);
    c.bezierCurveTo(14, 80, 22, 104, 40, 118);
    c.bezierCurveTo(52, 128, 68, 132, 80, 124);
    c.bezierCurveTo(96, 114, 110, 96, 112, 74);
    c.bezierCurveTo(114, 52, 104, 28, 88, 20);
    c.bezierCurveTo(78, 14, 64, 16, 52, 18);
    c.closePath();
    c.stroke();

    // Inner contour
    c.beginPath();
    c.moveTo(55, 30);
    c.bezierCurveTo(40, 32, 30, 48, 30, 64);
    c.bezierCurveTo(30, 80, 38, 100, 52, 110);
    c.bezierCurveTo(62, 118, 74, 120, 82, 114);
    c.bezierCurveTo(94, 106, 104, 90, 104, 72);
    c.bezierCurveTo(104, 54, 96, 36, 82, 30);
    c.bezierCurveTo(74, 26, 64, 28, 55, 30);
    c.closePath();
    c.stroke();

    // Safety pin ellipse (rotated)
    c.save();
    c.translate(70, 58);
    c.rotate(-30 * Math.PI / 180);
    c.beginPath();
    c.ellipse(0, 0, 10, 6, 0, 0, Math.PI * 2);
    c.stroke();
    c.restore();

    // Pin body line
    c.beginPath(); c.moveTo(62, 62); c.lineTo(88, 100); c.stroke();

    // Pin tip closure
    c.beginPath();
    c.moveTo(86, 98);
    c.bezierCurveTo(90, 102, 92, 104, 88, 106);
    c.bezierCurveTo(85, 108, 82, 106, 82, 102);
    c.stroke();

    // Stitch lines
    var stitches = [[44,92,44,106],[54,94,54,108],[64,94,64,108],[74,92,74,106]];
    for (var i = 0; i < stitches.length; i++) {
      c.beginPath(); c.moveTo(stitches[i][0], stitches[i][1]); c.lineTo(stitches[i][2], stitches[i][3]); c.stroke();
    }
    // Crossbar
    c.beginPath(); c.moveTo(40, 99); c.lineTo(78, 99); c.stroke();
  }

  function drawRoundHead(c) {
    // Main body
    c.beginPath();
    c.moveTo(80, 8);
    c.bezierCurveTo(112, 8, 136, 30, 136, 60);
    c.bezierCurveTo(136, 82, 128, 96, 116, 106);
    c.bezierCurveTo(122, 108, 126, 112, 126, 118);
    c.bezierCurveTo(126, 124, 120, 128, 110, 132);
    c.bezierCurveTo(108, 134, 106, 138, 106, 144);
    c.lineTo(104, 165); c.lineTo(90, 168); c.lineTo(88, 144);
    c.bezierCurveTo(88, 140, 86, 136, 82, 134);
    c.bezierCurveTo(76, 132, 72, 132, 68, 134);
    c.bezierCurveTo(64, 136, 62, 140, 62, 144);
    c.lineTo(60, 168); c.lineTo(46, 165); c.lineTo(44, 144);
    c.bezierCurveTo(44, 138, 42, 134, 36, 132);
    c.bezierCurveTo(26, 128, 20, 124, 20, 118);
    c.bezierCurveTo(20, 112, 24, 108, 30, 106);
    c.bezierCurveTo(18, 96, 10, 82, 10, 60);
    c.bezierCurveTo(10, 30, 48, 8, 80, 8);
    c.closePath();
    c.stroke();

    // Visor bar
    c.beginPath(); c.rect(38, 58, 74, 14); c.stroke();

    // Eyes
    c.beginPath(); c.arc(52, 52, 4, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.arc(52, 52, 1.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(106, 50, 4, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.arc(106, 50, 1.5, 0, Math.PI * 2); c.fill();

    // Smile
    c.beginPath();
    c.moveTo(54, 90);
    c.bezierCurveTo(64, 100, 96, 100, 108, 90);
    c.stroke();
  }

  // ─── Instance definitions ────────────────────────────────────────────────
  // x, y     — position as fraction of viewport (0,0 = top-left)
  // scale    — size multiplier (1 = original viewBox size)
  // opacity  — stroke opacity
  // speed    — animation speed (rad/ms)
  // phase    — wave phase offset so instances drift independently
  // driftX/Y — max drift amplitude in CSS px
  // rotRange — max rotation in radians

  var instances = [
    // Robot — large, top-right
    { draw: drawRobot,     x: 0.76, y: 0.00, scale: 2.0, opacity: 0.35, speed: 0.00018, phase: 0.4,  driftX: 18, driftY: 24, rotRange: 0.05 },
    // Robot — medium, left edge
    { draw: drawRobot,     x:-0.10, y: 0.50, scale: 1.3, opacity: 0.28, speed: 0.00013, phase: 2.1,  driftX: 14, driftY: 20, rotRange: 0.06 },
    // Robot — small, lower-right
    { draw: drawRobot,     x: 0.82, y: 0.66, scale: 0.8, opacity: 0.20, speed: 0.00021, phase: 4.8,  driftX: 10, driftY: 16, rotRange: 0.08 },
    // Pin-face — large, left upper
    { draw: drawPinFace,   x:-0.06, y: 0.16, scale: 1.8, opacity: 0.32, speed: 0.00015, phase: 1.2,  driftX: 16, driftY: 28, rotRange: 0.04 },
    // Pin-face — medium, right middle
    { draw: drawPinFace,   x: 0.78, y: 0.36, scale: 1.1, opacity: 0.24, speed: 0.00020, phase: 3.5,  driftX: 12, driftY: 22, rotRange: 0.07 },
    // Pin-face — small, left lower
    { draw: drawPinFace,   x:-0.04, y: 0.74, scale: 0.8, opacity: 0.20, speed: 0.00016, phase: 5.8,  driftX: 10, driftY: 18, rotRange: 0.09 },
    // Round-head — large, right lower-mid
    { draw: drawRoundHead, x: 0.74, y: 0.48, scale: 1.9, opacity: 0.30, speed: 0.00011, phase: 0.8,  driftX: 20, driftY: 30, rotRange: 0.04 },
    // Round-head — medium, left top
    { draw: drawRoundHead, x:-0.05, y:-0.04, scale: 1.2, opacity: 0.24, speed: 0.00017, phase: 4.2,  driftX: 12, driftY: 20, rotRange: 0.05 },
    // Round-head — small, far right bottom
    { draw: drawRoundHead, x: 0.83, y: 0.80, scale: 0.7, opacity: 0.18, speed: 0.00024, phase: 2.6,  driftX: 8,  driftY: 14, rotRange: 0.10 },
  ];

  // ─── Animation loop ──────────────────────────────────────────────────────

  var startTime = null;
  var raf = null;
  var CR = 237, CG = 232, CB = 223; // --text base colour

  function frame(ts) {
    if (startTime === null) startTime = ts;
    var t = ts - startTime;

    // Reset to identity then apply DPR scale so all subsequent coords are in CSS px
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    var W = window.innerWidth;
    var H = window.innerHeight;

    for (var i = 0; i < instances.length; i++) {
      var inst = instances[i];

      // Two overlapping sinusoids for organic, non-repeating drift
      var dx = Math.sin(t * inst.speed + inst.phase)        * inst.driftX
             + Math.sin(t * inst.speed * 0.53 + inst.phase * 1.7) * inst.driftX * 0.35;
      var dy = Math.cos(t * inst.speed * 0.8  + inst.phase * 0.9) * inst.driftY
             + Math.cos(t * inst.speed * 0.37 + inst.phase * 1.3) * inst.driftY * 0.35;
      var rot = Math.sin(t * inst.speed * 0.6 + inst.phase * 1.1) * inst.rotRange;

      ctx.save();
      ctx.translate(inst.x * W + dx, inst.y * H + dy);
      ctx.rotate(rot);
      ctx.scale(inst.scale, inst.scale);

      ctx.strokeStyle = 'rgba(' + CR + ',' + CG + ',' + CB + ',' + inst.opacity + ')';
      ctx.fillStyle   = 'rgba(' + CR + ',' + CG + ',' + CB + ',' + inst.opacity + ')';
      ctx.lineWidth   = 2.4;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';

      inst.draw(ctx);
      ctx.restore();
    }

    raf = requestAnimationFrame(frame);
  }

  raf = requestAnimationFrame(frame);

  // Pause when the tab is hidden — saves CPU / battery
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = null;
    } else {
      startTime = null;
      raf = requestAnimationFrame(frame);
    }
  });

}());
