// Hand-stitch look: irregular running stitches drawn as SVG along frames, dividers, chevrons and arrow bullets.
export function initStitches() {
  // --- Hand-stitch lines: irregular running stitches drawn along each frame or divider
  var NS = 'http://www.w3.org/2000/svg';
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  // point + direction at distance d along a rounded rectangle (clockwise from top-left)
  function rrect(w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    var sx = w - 2 * r, sy = h - 2 * r, arc = Math.PI * r / 2;
    var segs = [
      ['l', r, 0, 1, 0, sx], ['a', w - r, r, -Math.PI / 2, arc],
      ['l', w, r, 0, 1, sy], ['a', w - r, h - r, 0, arc],
      ['l', w - r, h, -1, 0, sx], ['a', r, h - r, Math.PI / 2, arc],
      ['l', 0, h - r, 0, -1, sy], ['a', r, r, Math.PI, arc]
    ];
    var total = segs.reduce(function (a, g) { return a + (g[0] === 'l' ? g[5] : g[4]); }, 0);
    return { total: total, at: function (d) {
      d = ((d % total) + total) % total;
      for (var i = 0; i < segs.length; i++) {
        var g = segs[i], len = g[0] === 'l' ? g[5] : g[4];
        if (d <= len || i === segs.length - 1) {
          if (g[0] === 'l') return { x: g[1] + g[3] * d, y: g[2] + g[4] * d, tx: g[3], ty: g[4] };
          var a = g[3] + (r ? d / r : 0);
          return { x: g[1] + r * Math.cos(a), y: g[2] + r * Math.sin(a), tx: -Math.sin(a), ty: Math.cos(a) };
        }
        d -= len;
      }
    } };
  }
  function line(w) { return { total: w, at: function (d) { return { x: d, y: 4, tx: 1, ty: 0 }; } }; }
  function stitchPaths(shape, seed, closed) {
    var R = rng(seed), thread = '', sheen = '', holes = '', f = function (n) { return n.toFixed(2); };
    var d = closed ? 0 : 2 + R() * 3, end = closed ? shape.total - 4 : shape.total - 2;
    while (d < end) {
      var L = 7 + R() * 3;                         // stitch length varies like a hand stitch
      if (d + L > end) break;
      var a = shape.at(d), b = shape.at(d + L);
      var nx = -(a.ty + b.ty) / 2, ny = (a.tx + b.tx) / 2;  // normal to the line
      var o1 = (R() - .5) * 1.6, o2 = (R() - .5) * 1.6;     // each end pulls slightly off the line
      var x1 = a.x + nx * o1, y1 = a.y + ny * o1, x2 = b.x + nx * o2, y2 = b.y + ny * o2;
      var bow = (R() - .5) * 1.2, mx = (x1 + x2) / 2 + nx * bow, my = (y1 + y2) / 2 + ny * bow;
      // thread drawn as a spindle: thicker in the middle, tapering where it enters the fabric
      var hw = .78 + R() * .3;
      thread += 'M' + f(x1) + ' ' + f(y1) + 'Q' + f(mx + nx * hw * 2) + ' ' + f(my + ny * hw * 2) + ' ' + f(x2) + ' ' + f(y2) +
                'Q' + f(mx - nx * hw * 2) + ' ' + f(my - ny * hw * 2) + ' ' + f(x1) + ' ' + f(y1) + 'Z';
      // thin light twist along the thread, slightly off-centre
      var s1x = x1 + (x2 - x1) * .3 + nx * (bow * .5 + .55), s1y = y1 + (y2 - y1) * .3 + ny * (bow * .5 + .55);
      var s2x = x1 + (x2 - x1) * .65 + nx * (bow * .5 + .45), s2y = y1 + (y2 - y1) * .65 + ny * (bow * .5 + .45);
      sheen += 'M' + f(s1x) + ' ' + f(s1y) + 'L' + f(s2x) + ' ' + f(s2y);
      // tiny needle holes where the thread goes through the fabric
      [[x1 - (x2 - x1) / L * 1.1, y1 - (y2 - y1) / L * 1.1], [x2 + (x2 - x1) / L * 1.1, y2 + (y2 - y1) / L * 1.1]].forEach(function (p) {
        var hr = .5 + R() * .3;
        holes += 'M' + f(p[0] - hr) + ' ' + f(p[1]) + 'a' + f(hr) + ' ' + f(hr) + ' 0 1 0 ' + f(2 * hr) + ' 0a' + f(hr) + ' ' + f(hr) + ' 0 1 0 ' + f(-2 * hr) + ' 0';
      });
      d += L + 4 + R() * 2.5;                       // gap varies too
    }
    return [thread, sheen, holes];
  }
  var seedN = 1;
  function makeSvg(cls) {
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', cls); svg.setAttribute('aria-hidden', 'true');
    ['holes', 'thread', 'sheen'].forEach(function (c) { var p = document.createElementNS(NS, 'path'); p.setAttribute('class', c); svg.appendChild(p); });
    return svg;
  }
  function paint(svg, parts, w, h) {
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.querySelector('.thread').setAttribute('d', parts[0]);
    svg.querySelector('.sheen').setAttribute('d', parts[1]);
    svg.querySelector('.holes').setAttribute('d', parts[2]);
  }
  function stitchFrame(el) {
    el.classList.add('stitched');
    var seed = seedN++ * 7919, svg = makeSvg('stitch'); el.appendChild(svg);
    var lastW = 0, lastH = 0;
    var draw = function () {
      var w = el.offsetWidth, h = el.offsetHeight; if (!w || !h || (w === lastW && h === lastH)) return;
      lastW = w; lastH = h;
      var rad = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, o = 1;
      var shape = rrect(w - 2 * o, h - 2 * o, Math.max(0, rad - o)), at = shape.at;
      shape.at = function (d) { var p = at(d); return { x: p.x + o, y: p.y + o, tx: p.tx, ty: p.ty }; };
      paint(svg, stitchPaths(shape, seed, true), w, h);
    };
    draw(); if (window.ResizeObserver) new ResizeObserver(draw).observe(el);
  }
  function stitchLine(el) {
    var seed = seedN++ * 7919, svg = makeSvg('stitch-top'); el.appendChild(svg);
    var lastW = 0;
    var draw = function () {
      var w = el.offsetWidth; if (!w || w === lastW) return; lastW = w;
      paint(svg, stitchPaths(line(w), seed, false), w, 8);
    };
    draw(); if (window.ResizeObserver) new ResizeObserver(draw).observe(el);
  }
  document.querySelectorAll('.card, .pill, .pf-card, dialog.modal, dialog.modal .close').forEach(stitchFrame);

  // --- Stitched chevrons next to Services / Portfolio / About us / Contact (two stitches, like ">")
  document.querySelectorAll('details.sec > summary svg.chev, .sec-link svg.chev').forEach(function (old, i) {
    var R = rng(9001 + i * 17), j = function (k) { return (R() - .5) * k; };
    var parts = [spindle(7 + j(.4), 3 + j(.4), 16.4 + j(.2), 11.3 + j(.2), 1.05), spindle(7 + j(.4), 21 + j(.4), 16.4 + j(.2), 12.7 + j(.2), 1.05)];
    var svg = makeSvg('chev'); svg.setAttribute('viewBox', '0 0 24 24');
    svg.querySelector('.thread').setAttribute('d', parts[0][0] + parts[1][0]);
    svg.querySelector('.sheen').setAttribute('d', parts[0][1] + parts[1][1]);
    svg.querySelector('.holes').setAttribute('d', parts[0][2] + parts[1][2]);
    old.parentNode.replaceChild(svg, old);
  });

  // --- Stitched arrow bullets (three stitches) in front of the offer lines
  function spindle(x1, y1, x2, y2, hw) {
    var f = function (n) { return n.toFixed(2); };
    var L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L, mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    var t = 'M' + f(x1) + ' ' + f(y1) + 'Q' + f(mx + nx * hw * 2) + ' ' + f(my + ny * hw * 2) + ' ' + f(x2) + ' ' + f(y2) +
            'Q' + f(mx - nx * hw * 2) + ' ' + f(my - ny * hw * 2) + ' ' + f(x1) + ' ' + f(y1) + 'Z';
    var sh = 'M' + f(x1 + (x2 - x1) * .3 + nx * .5) + ' ' + f(y1 + (y2 - y1) * .3 + ny * .5) + 'L' + f(x1 + (x2 - x1) * .65 + nx * .4) + ' ' + f(y1 + (y2 - y1) * .65 + ny * .4);
    var ux = (x2 - x1) / L, uy = (y2 - y1) / L, h = '';
    [[x1 - ux * 1.1, y1 - uy * 1.1], [x2 + ux * 1.1, y2 + uy * 1.1]].forEach(function (p) {
      h += 'M' + f(p[0] - .5) + ' ' + f(p[1]) + 'a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0';
    });
    return [t, sh, h];
  }
  document.querySelectorAll('.offer li').forEach(function (li, i) {
    var R = rng(4001 + i * 131), j = function (k) { return (R() - .5) * k; };
    var parts = [
      spindle(1 + j(.6), 6 + j(.6), 12 + j(.8), 6 + j(.6), .72),        // shaft
      spindle(13 + j(.6), 1.4 + j(.5), 19.5 + j(.4), 5.4 + j(.3), .7),  // upper head stitch
      spindle(13 + j(.6), 10.6 + j(.5), 19.5 + j(.4), 6.6 + j(.3), .7)  // lower head stitch
    ];
    var svg = makeSvg('arrow'); svg.setAttribute('viewBox', '0 0 22 12');
    svg.querySelector('.thread').setAttribute('d', parts.map(function (p) { return p[0]; }).join(''));
    svg.querySelector('.sheen').setAttribute('d', parts.map(function (p) { return p[1]; }).join(''));
    svg.querySelector('.holes').setAttribute('d', parts.map(function (p) { return p[2]; }).join(''));
    li.insertBefore(svg, li.firstChild);
  });
  document.querySelectorAll('.stitch-line').forEach(stitchLine);
}
