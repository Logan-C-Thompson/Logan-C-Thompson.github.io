// snap-scroll.js

document.addEventListener("DOMContentLoaded", () => {
  const sections = Array.from(document.querySelectorAll(".snap-section"));
  let current = 0;
  let isThrottled = false;

  function scrollToSection(index) {
    isThrottled = true;
    sections[index].scrollIntoView({ behavior: "smooth" });
    setTimeout(() => { isThrottled = false; }, 800);
  }

  window.addEventListener("wheel", e => {
    e.preventDefault(); // stop native scroll

    if (isThrottled) return;

    if (e.deltaY > 0 && current < sections.length - 1) {
      current++;
      scrollToSection(current);
    } else if (e.deltaY < 0 && current > 0) {
      current--;
      scrollToSection(current);
    }
  }, { passive: false });
});
