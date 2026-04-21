import re

# 1. Update style.css
with open("style.css", "a", encoding="utf-8") as f:
    f.write("""
/* RESPONSIVENESS */
@media (max-width: 1024px) {
  .grid-2 { grid-template-columns: 1fr; }
  .grid-3 { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .sidebar { transform: translateX(-100%); transition: transform 0.3s; }
  .sidebar.open { transform: translateX(0); }
  .main { margin-left: 0; }
  .kpi-grid { grid-template-columns: 1fr 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .topbar { padding: 0 16px; }
  .content { padding: 16px; }
  .landing-hero h1 { font-size: 42px !important; }
}
@media (max-width: 480px) {
  .kpi-grid { grid-template-columns: 1fr; }
  .landing-hero h1 { font-size: 32px !important; }
  .landing-cards { grid-template-columns: 1fr !important; }
}

/* INITIAL LOADER */
#initial-loader {
  position: fixed; inset: 0; background: var(--bg); z-index: 9999;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transition: opacity 0.8s ease, visibility 0.8s ease;
}
.loader-spinner {
  width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.1); 
  border-top-color: var(--cyan); border-radius: 50%;
  animation: spin 1s linear infinite; margin-bottom: 20px;
}
@keyframes spin { 100% { transform: rotate(360deg); } }
""")

# 2. Update HTML
with open("enterprise_expense_management_saas.html", "r", encoding="utf-8") as f:
    html = f.read()

new_loader = """<body>
<div id="initial-loader">
  <div class="loader-spinner"></div>
  <div style="font-family:'Syne',sans-serif; font-size:20px; font-weight:700; color:var(--text); letter-spacing:1px;">APEX FLOW</div>
</div>
<script>
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('initial-loader');
      if (loader) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
      }
    }, 1200);
  });
</script>
<div class="app">"""

html = html.replace('<body>\n<div class="app">', new_loader)

with open("enterprise_expense_management_saas.html", "w", encoding="utf-8") as f:
    f.write(html)
