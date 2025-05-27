// nav.js

window.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const current = location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === current || (href === "" && current === "")) {
      link.classList.add("active");
    }
    link.addEventListener("click", () => {
      links.forEach(l => l.classList.remove("active", "animate-fill"));
      void link.offsetWidth; // force reflow
      link.classList.add("animate-fill", "active");
    });
  });
});
