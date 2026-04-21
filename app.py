import re

with open("enterprise_expense_management_saas.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update CSS Variables
old_root = r":root\{[^\}]+\}"
new_root = """:root{
  --bg:#09090b;
  --bg2:#18181b;
  --bg3:#27272a;
  --glass:rgba(39,39,42,0.5);
  --glass2:rgba(39,39,42,0.8);
  --border:rgba(255,255,255,0.08);
  --border2:rgba(255,255,255,0.12);
  --cyan:#f8fafc;
  --cyan2:#cbd5e1;
  --gold:#eab308;
  --green:#22c55e;
  --red:#ef4444;
  --purple:#a855f7;
  --orange:#f97316;
  --text:#f8fafc;
  --text2:#a1a1aa;
  --text3:#71717a;
  --r:10px;
  --r2:6px;
}"""
html = re.sub(old_root, new_root, html)

# Fix Primary Button & Active nav item colors to use the new text/bg based minimalism
html = re.sub(r"\.btn-primary\{[^\}]+\}", ".btn-primary{background:var(--text);color:var(--bg);}", html)
html = re.sub(r"\.btn-primary:hover\{[^\}]+\}", ".btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(255,255,255,0.15);}", html)
html = re.sub(r"\.nav-item\.active\{[^\}]+\}", ".nav-item.active{background:var(--glass2);color:var(--text);border-left-color:var(--text);}", html)
html = re.sub(r"\.nav-badge\{[^\}]+\}", ".nav-badge{margin-left:auto;background:var(--text);color:var(--bg);font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;}", html)
html = re.sub(r"\.form-input:focus\{[^\}]+\}", ".form-input:focus{border-color:var(--text);}", html)
html = re.sub(r"rgba\(0,229,255,0\.08\)", "var(--glass2)", html)

# 2. Add esc function and update saveTransaction for Data Consistency & Integrity
util_loc = "// ─── UTILITIES ───"
util_new = """// ─── UTILITIES ───
function e(s){return s?String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])):'';}"""
html = html.replace(util_loc, util_new)

# Update saveTransaction
save_old = """  if(!desc||!amount||amount<=0||!date){alert('Please fill all required fields.');return;}"""
save_new = """  if(!desc||isNaN(amount)||amount<=0||!date){alert('Please fill all required fields correctly to ensure data consistency.');return;}
  amount = Math.round(amount * 100) / 100; // maintain data consistency"""
html = html.replace(save_old, save_new)

# 3. Replace template literal injections for Security (XSS protection)
replacements = {
    "${t.desc}": "${e(t.desc)}",
    "${t.category}": "${e(t.category)}",
    "${t.emp||'—'}": "${e(t.emp)||'—'}",
    "${t.emp}": "${e(t.emp)}",
    "${t.date}": "${e(t.date)}",
    "${t.status}": "${e(t.status)}",
    "${c}": "${e(c)}",
    "${cat}": "${e(cat)}",
    "${b.category}": "${e(b.category)}",
    "${emp.name}": "${e(emp.name)}",
    "${emp.dept}": "${e(emp.dept)}",
    "${emp.initials}": "${e(emp.initials)}",
    "${topSpender?.name.split(' ')[0]}": "${e(topSpender?.name.split(' ')[0])}",
    "${employees.find(e=>e.name===t.emp)?.dept||'—'}": "${e(employees.find(e=>e.name===t.emp)?.dept)||'—'}",
}
for old_s, new_s in replacements.items():
    html = html.replace(old_s, new_s)

with open("enterprise_expense_management_saas.html", "w", encoding="utf-8") as f:
    f.write(html)
