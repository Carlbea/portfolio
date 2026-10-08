// ---------- Edit your content here ----------
const toolkit = {
  hardware: ["PC assembly and disassembly","Diagnosing RAM, disk, and power problems","Laptop and desktop repair basics","Printer and peripheral setup","Cable and port troubleshooting"],
  software: ["Windows 10/11 installation and settings","Ubuntu / Linux basics","Account and password management","Microsoft 365 and Google Workspace","Virus removal and system cleanup","Remote support tools"],
  network: ["TCP/IP, DNS, and DHCP basics","Router and Wi-Fi configuration","Ping, ipconfig, and tracert","Cisco Packet Tracer","VPN and basic firewall concepts"],
  people: ["Active listening","Explaining fixes in plain language","Documenting tickets clearly","Staying calm under pressure","Following up until it's solved"]
};

const issues = {
  "Wi-Fi is connected but no internet": ["Check if other devices have internet","Toggle Wi-Fi off and on","Run ipconfig /all and check for a valid IP","Flush DNS with ipconfig /flushdns","Restart the router","Escalate to the network admin if the ISP is down"],
  "Computer won't turn on": ["Check the power cable and outlet","Try a different power adapter or battery","Hold the power button for 30 seconds to drain residual power","Listen for beeps or look for LED lights","Reseat RAM","Escalate for hardware repair"],
  "User forgot their password": ["Verify the user's identity","Use the approved reset method","Give a temporary password and force a change at next login","Confirm the user can sign in","Log the ticket and close it"],
  "Printer won't print": ["Check paper, ink, and error lights","Make sure it's online and set as default","Clear the print queue","Restart the print spooler service","Reinstall the driver","Test with a different computer"],
  "Computer is very slow": ["Open Task Manager and check CPU, memory, disk","Close or uninstall heavy startup apps","Check free disk space","Run a malware scan","Install pending updates","Suggest a RAM or SSD upgrade if needed"]
};

// ---------- Hero ticket ----------
const btn = document.getElementById("resolveBtn");
const status = document.getElementById("status");
const note = document.getElementById("ticketNote");
const ticket = document.querySelector(".ticket");
let resolved = false;
btn.addEventListener("click", () => {
  resolved = !resolved;
  status.textContent = resolved ? "Resolved" : "Open";
  status.className = "status " + (resolved ? "done" : "open");
  btn.textContent = resolved ? "Reopen ticket" : "Assign to Carl";
  note.textContent = resolved ? "Resolved. Let's talk: scroll down to contact me." : "Click to see how fast I move.";
  if (resolved) { ticket.classList.remove("resolved"); void ticket.offsetWidth; ticket.classList.add("resolved"); }
});

// ---------- Toolkit tabs ----------
const tabs = document.querySelectorAll(".tab");
const panel = document.getElementById("tabPanel");
function showTab(key) {
  panel.innerHTML = "<ul>" + toolkit[key].map(i => `<li>${i}</li>`).join("") + "</ul>";
  tabs.forEach(t => {
    const on = t.dataset.tab === key;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on);
  });
}
tabs.forEach(t => t.addEventListener("click", () => showTab(t.dataset.tab)));
showTab("hardware");

// ---------- Troubleshooter ----------
const issueBox = document.getElementById("issues");
const title = document.getElementById("issueTitle");
const list = document.getElementById("stepList");
const progress = document.getElementById("progress");

function updateProgress() {
  const all = list.querySelectorAll("input");
  const done = list.querySelectorAll("input:checked").length;
  if (!all.length) return;
  progress.textContent = done === all.length ? "Issue resolved and documented." : `${done} of ${all.length} steps done`;
}
function showIssue(name, el) {
  document.querySelectorAll(".issue").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
  title.textContent = name;
  list.innerHTML = issues[name].map(s => `<li><label><input type="checkbox"><span>${s}</span></label></li>`).join("");
  list.querySelectorAll("input").forEach(i => i.addEventListener("change", updateProgress));
  updateProgress();
}
Object.keys(issues).forEach((name, idx) => {
  const b = document.createElement("button");
  b.className = "issue";
  b.textContent = name;
  b.addEventListener("click", () => showIssue(name, b));
  issueBox.appendChild(b);
  if (idx === 0) showIssue(name, b);
});

// ---------- Contact form (opens the visitor's email app) ----------
const EMAIL = "youremail@example.com"; // change this
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const n = document.getElementById("name").value.trim();
  const m = document.getElementById("email").value.trim();
  const msg = document.getElementById("message").value.trim();
  const out = document.getElementById("formMsg");
  if (!n || !/^\S+@\S+\.\S+$/.test(m) || !msg) {
    out.textContent = "Please fill in your name, a valid email, and a message.";
    return;
  }
  const body = `${msg}\n\nFrom: ${n} (${m})`;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio message from " + n)}&body=${encodeURIComponent(body)}`;
  out.textContent = "Opening your email app...";
});

document.getElementById("year").textContent = new Date().getFullYear();
