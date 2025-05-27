// javascript/blackhole.js
(() => {
  const btn        = document.getElementById('blackhole-btn');
  const hole       = document.getElementById('blackhole');
  const starsWrap  = document.getElementById('stars');
  let starsCreated = false;

  // wrap every word (and nav link) in spans for per-word suck animation
  function wrapWords() {
    document.querySelectorAll('p, nav ul li a').forEach(el => {
      const words = el.textContent.split(/(\s+)/);
      el.innerHTML = words.map(w =>
        /\s+/.test(w)
          ? `<span class="suck-space">${w}</span>`
          : `<span class="suck-word">${w}</span>`
      ).join('');
    });
  }

  // generate twinkling stars behind everything
  function createStars(count = 120) {
    const W = innerWidth, H = innerHeight;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = 1 + Math.random() * 3; // px
      Object.assign(s.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * W}px`,
        top: `${Math.random() * H}px`,
        animationDelay: `${Math.random() * 4}s`
      });
      starsWrap.appendChild(s);
    }
  }

  // move stars into hole
  function suckStars() {
    const hb = hole.getBoundingClientRect(),
          cx = hb.left + hb.width / 2,
          cy = hb.top  + hb.height / 2;
    starsWrap.querySelectorAll('.star').forEach(s => {
      const r = s.getBoundingClientRect(),
            sx = r.left + r.width / 2,
            sy = r.top  + r.height / 2,
            dx = cx - sx,
            dy = cy - sy;
      s.style.transition = 'transform 12s ease-in, opacity 12s ease-in';
      s.style.transform  = `translate(${dx}px, ${dy}px) scale(0.1)`;
      s.style.opacity    = '0';
    });
  }

  // suck each word/span into the hole in 3D
  function suckWords() {
    const hb = hole.getBoundingClientRect(),
          cx = hb.left + hb.width / 2,
          cy = hb.top  + hb.height / 2;
    document.querySelectorAll('.suck-word').forEach((span, i) => {
      const r = span.getBoundingClientRect(),
            sx = r.left + r.width / 2,
            sy = r.top  + r.height / 2,
            dx = cx - sx,
            dy = cy - sy;
      span.style.transition = `transform 12s ease-in ${i * 50}ms, opacity 12s ease-in ${i * 50}ms`;
      span.style.transform  = `translate3d(${dx}px, ${dy}px, -500px) rotateY(90deg) scale(0.1)`;
      span.style.opacity    = '0';
    });
  }

  // animate plane diving into hole and shrinking
  function flyPlane() {
    const plane = document.getElementById('airplane'),
          hb    = hole.getBoundingClientRect(),
          cx    = hb.left + hb.width / 2,
          cy    = hb.top  + hb.height / 2;
    const ox = cx - window.innerWidth / 2,
          oy = cy - 70;
    plane.style.transition = 'transform 6s ease-in-out 4s, opacity 4s ease-in-out 4s';
    plane.style.transform  = `translate(${ox}px, ${oy}px) rotate(0deg) scale(0.1)`;
    plane.style.opacity    = '0';
  }

  document.addEventListener('DOMContentLoaded', wrapWords);

  btn.addEventListener('click', () => {
    // disable further clicks
    btn.disabled = true;
    btn.style.cursor = 'default';

    // 1) fade in stars
    if (!starsCreated) {
      createStars();
      starsCreated = true;
    }
    starsWrap.style.opacity = '1';

    // 2) after 4s, begin sucking everything
    setTimeout(() => {
      document.body.classList.add('sucking');
      suckStars();
      suckWords();
      flyPlane();
    }, 4000);

    // 3) after 25s, clear out everything but hole & stars
    setTimeout(() => {
      document.body.innerHTML = '';
      document.body.append(hole, starsWrap);
    }, 25000);

    // 4) after 30s total, restart via splash/init redirect
    setTimeout(() => {
      window.location.replace('initialization.html');
    }, 30000);
  });
})();
