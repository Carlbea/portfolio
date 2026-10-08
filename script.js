const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", false);
}));

const links = [...menu.querySelectorAll("a")];
const sections = links.map(a => document.querySelector(a.getAttribute("href")));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => s && io.observe(s));

const EMAIL = "carlplayz777@gmail.com"; // change this
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const n = document.getElementById("name").value.trim();
  const m = document.getElementById("email").value.trim();
  const msg = document.getElementById("message").value.trim();
  const out = document.getElementById("formMsg");
  if (!n || !/^\S+@\S+\.\S+$/.test(m) || !msg) {
    out.textContent = "Please enter your name, a valid email, and a message.";
    return;
  }
  const body = `${msg}\n\nFrom: ${n} (${m})`;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio message from " + n)}&body=${encodeURIComponent(body)}`;
  out.textContent = "Opening your email app...";
});

document.getElementById("year").textContent = new Date().getFullYear();