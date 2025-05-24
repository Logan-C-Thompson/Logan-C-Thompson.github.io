// init-phase.js

document.addEventListener("DOMContentLoaded", () => {
  const splash      = document.getElementById("splash");
  const content     = splash.querySelector(".splash-content");
  const wrapper     = splash.querySelector(".laptop-wrapper");
  const screenG     = wrapper.querySelector(".screen");
  const percentDiv  = document.getElementById("splash-percent");

  // 1) Inject progress bar below the percentage
  const barOuter = document.createElement("div");
  barOuter.id = "splash-progress";
  const barInner = document.createElement("div");
  barInner.id = "splash-progress-inner";
  barOuter.appendChild(barInner);
  content.appendChild(barOuter);

  // 2) After the initial spin completes, show percent + animate lid
  const spinTotalMs = 1200 + 300; // 1.2s spin + 0.3s delay
  setTimeout(() => {
    wrapper.classList.add("spin-done");
    splash.classList.add("show-percent");

    let pct = 0;
    const maxAngle = 90;   // lid closed at 90°, open at 0°
    const stepMs   = 20;   // ~50fps

    const timer = setInterval(() => {
      pct = Math.min(100, pct + 1);
      percentDiv.textContent = pct + "%";

      // open laptop lid
      const angle = maxAngle * (1 - pct / 100);
      screenG.style.transform = `rotateX(${angle}deg)`;

      // fill progress bar
      barInner.style.width = pct + "%";

      if (pct === 100) {
        clearInterval(timer);

        // move “Welcome” above the laptop
        content.insertBefore(percentDiv, wrapper);
        percentDiv.textContent = "Welcome";
        splash.classList.add("show-welcome");

        // 3) set flag so index.html knows splash ran
        sessionStorage.setItem("didSplash", "true");

        // 4) pause briefly then navigate to real homepage
        setTimeout(() => {
          window.location.replace("index.html");
        }, 1200);
      }
    }, stepMs);
  }, spinTotalMs);
});
