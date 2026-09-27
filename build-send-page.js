// Builds send.html: one card per draft.
// Cold emails get an "Open in Gmail" button (Gmail compose, pre-filled; you press Send).
// Internship cover notes get "Copy cover note" and "Open posting" buttons.
// Run: node build-send-page.js
const fs = require("fs");
const path = require("path");

const ACCOUNT = "kahitokrutik@gmail.com";
const root = __dirname;

function parseDraft(file) {
  const text = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const split = text.indexOf("\n\n");
  const head = text.slice(0, split);
  const body = text.slice(split + 2).trim();
  const meta = {};
  for (const line of head.split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim();
  }
  return { id: path.basename(file, ".md"), meta, body };
}

function readDir(dir) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => f.endsWith(".md")).sort().map((f) => parseDraft(path.join(full, f)));
}

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function gmailUrl(to, subject, body) {
  const q = new URLSearchParams({ view: "cm", fs: "1", authuser: ACCOUNT, to, su: subject, body });
  return "https://mail.google.com/mail/?" + q.toString();
}

const outreach = readDir("drafts/outreach");
const apps = readDir("drafts/applications");

function card(d, kind) {
  const m = d.meta;
  const isEmail = /@/.test(m.to || "") && !/^apply via/i.test(m.to || "");
  const title = kind === "outreach" ? m.business : `${m.company} — ${m.role}`;
  const deadline = m.deadline && !/not shown/i.test(m.deadline) ? ` · Apply by ${m.deadline}` : "";
  const sub = kind === "outreach" ? `${m.category || ""} · ${m.location || ""}` : `${m.location || ""}${deadline}`;
  const note = kind === "outreach" ? m["observed need"] : "";
  const formUrl = (m.to || "").replace(/^apply via form:\s*/i, "") || m.posting;
  const actions = isEmail
    ? `<a class="btn primary" target="_blank" rel="noopener" href="${esc(gmailUrl(m.to, m.subject, d.body))}">Open in Gmail</a>`
    : `<button class="btn primary" data-copy="${esc(d.id)}">Copy cover note</button>
       <a class="btn" target="_blank" rel="noopener" href="${esc(formUrl)}">Open posting</a>`;
  return `<article class="card" data-id="${esc(d.id)}">
  <header><div><h3>${esc(title)}</h3><p class="sub">${esc(sub)}</p></div><span class="tag">${esc(d.id)}</span></header>
  ${note ? `<p class="need"><b>Their need:</b> ${esc(note)}</p>` : ""}
  <p class="to"><b>To:</b> ${esc(m.to)}<br><b>Subject:</b> ${esc(m.subject)}</p>
  <details><summary>Read the message</summary><pre>${esc(d.body)}</pre></details>
  <textarea hidden id="t-${esc(d.id)}">${esc(d.body)}</textarea>
  <div class="actions">${actions}<label class="done"><input type="checkbox"> Sent</label></div>
</article>`;
}

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Job Hunt Sender</title>
<style>
:root{--bg:#f6f6f7;--card:#fff;--ink:#16161a;--muted:#5d5d66;--line:#e2e2e6;--accent:#c8102e;--ok:#1f7a4d}
@media (prefers-color-scheme:dark){:root{--bg:#0c0c0e;--card:#161618;--ink:#f5f5f7;--muted:#a1a1a6;--line:#2a2a2e;--accent:#ff4d3a;--ok:#4cc38a}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,-apple-system,Segoe UI,sans-serif}
main{max-width:900px;margin:0 auto;padding:24px 16px 80px}h1{font-size:26px;margin:0 0 6px}h2{margin:36px 0 6px;font-size:19px}
.lead,.sub,.rule{color:var(--muted)}.rule{font-size:13.5px;margin:0 0 14px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px;margin:12px 0}
.card header{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
h3{margin:0;font-size:16px}.sub{margin:2px 0 0;font-size:13px}.tag{font:12px ui-monospace,monospace;color:var(--muted);white-space:nowrap}
.need,.to{font-size:13.5px;margin:10px 0 0;overflow-wrap:anywhere}pre{white-space:pre-wrap;font:13.5px/1.5 inherit;background:var(--bg);padding:12px;border-radius:8px}
details{margin-top:10px}summary{cursor:pointer;color:var(--muted);font-size:13.5px}
.actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px}
.btn{appearance:none;border:1px solid var(--line);background:transparent;color:var(--ink);padding:8px 14px;border-radius:999px;font:inherit;font-size:14px;cursor:pointer;text-decoration:none}
.btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}.btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.done{margin-left:auto;font-size:13.5px;color:var(--muted);display:flex;gap:6px;align-items:center}
.card.is-sent{opacity:.55}.card.is-sent .done{color:var(--ok)}
.count{font-weight:600}
</style></head><body><main>
<h1>Job Hunt Sender</h1>
<p class="lead">Signed in to Gmail as ${esc(ACCOUNT)}. Nothing is sent until you press Send in Gmail.</p>

<h2>Cold emails · <span class="count" data-count="outreach"></span></h2>
<p class="rule">Send about 10 a day, spread out. If anyone replies "no thanks", mark it in tracking/outreach.csv and never email them again.</p>
${outreach.map((d) => card(d, "outreach")).join("\n")}

<h2>Internship applications · <span class="count" data-count="apps"></span></h2>
<p class="rule">These postings take applications through a form. Copy the note, open the posting, paste it into the form, and submit there. Check deadlines first.</p>
${apps.map((d) => card(d, "apps")).join("\n")}
</main>
<script>
const KEY="jobhunt-sent";let sent={};try{sent=JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(sent))}catch(e){}}
function counts(){for(const [k,sel] of [["outreach","oa-,ob-"],["apps","a-,b-,c-,r"]]){const cards=[...document.querySelectorAll(".card")].filter(c=>sel.split(",").some(p=>c.dataset.id.startsWith(p)));const n=cards.filter(c=>c.classList.contains("is-sent")).length;document.querySelector('[data-count="'+k+'"]').textContent=n+" of "+cards.length+" sent"}}
document.querySelectorAll(".card").forEach(c=>{const box=c.querySelector(".done input");box.checked=!!sent[c.dataset.id];c.classList.toggle("is-sent",box.checked);box.addEventListener("change",()=>{sent[c.dataset.id]=box.checked;c.classList.toggle("is-sent",box.checked);save();counts()})});
document.querySelectorAll("[data-copy]").forEach(b=>b.addEventListener("click",async()=>{const t=document.getElementById("t-"+b.dataset.copy).value;try{await navigator.clipboard.writeText(t);b.textContent="Copied"}catch(e){b.textContent="Copy failed, open 'Read the message'"}setTimeout(()=>b.textContent="Copy cover note",1800)}));
counts();
</script></body></html>`;

fs.writeFileSync(path.join(root, "send.html"), html);
console.log(`send.html: ${outreach.length} cold emails, ${apps.length} applications`);
