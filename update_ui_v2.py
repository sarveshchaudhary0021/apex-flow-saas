import re

# 1. UPDATE CSS
with open("style.css", "a", encoding="utf-8") as f:
    f.write("""
/* LIGHT THEME */
[data-theme="light"] {
  --bg: #f8fafc;
  --bg2: #f1f5f9;
  --bg3: #e2e8f0;
  --glass: rgba(255, 255, 255, 0.7);
  --glass2: rgba(255, 255, 255, 0.9);
  --border: rgba(0, 0, 0, 0.08);
  --border2: rgba(0, 0, 0, 0.12);
  --cyan: #0891b2;
  --cyan2: #0e7490;
  --gold: #d97706;
  --green: #16a34a;
  --red: #dc2626;
  --purple: #9333ea;
  --orange: #ea580c;
  --text: #0f172a;
  --text2: #475569;
  --text3: #64748b;
}

[data-theme="light"] .sidebar {
  background: rgba(248, 250, 252, 0.95);
}

[data-theme="light"] .topbar {
  background: rgba(248, 250, 252, 0.85);
}

[data-theme="light"] .btn-primary {
  background: #0f172a;
  color: #fff;
}

[data-theme="light"] .form-input, 
[data-theme="light"] .filter-select {
  background: rgba(0,0,0,0.03);
  color: var(--text);
}

[data-theme="light"] .form-input option,
[data-theme="light"] .filter-select option {
  background: #fff;
}

[data-theme="light"] .form-modal {
  background: #fff;
}

[data-theme="light"] table thead th {
  background: rgba(0,0,0,0.03);
}

.nav-label {
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.nav-label:hover {
  color: var(--text);
}
.nav-chevron {
  transition: transform 0.3s ease;
  font-size: 14px;
}
.nav-items-container {
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  max-height: 500px;
}
.nav-items-container.collapsed {
  max-height: 0;
}
""")

# 2. UPDATE HTML for Sidebar Accordions & Dark Mode Toggle
with open("enterprise_expense_management_saas.html", "r", encoding="utf-8") as f:
    html = f.read()

# Make sidebar nav sections collapsible
html = html.replace(
    '<div class="nav-label">Overview</div>',
    '<div class="nav-label" onclick="toggleNav(\'overview\')"><span>Overview</span><span class="nav-chevron" id="chevron-overview">▼</span></div>\n      <div id="navg-overview" class="nav-items-container">'
)
html = html.replace(
    '<div class="nav-section">\n      <div class="nav-label" onclick="toggleNav(\'overview\')">',
    '<div class="nav-section">\n      <div class="nav-label" onclick="toggleNav(\'overview\')">'
)
html = html.replace(
    '      </div>\n    </div>\n    <div class="nav-section">\n      <div class="nav-label">Finance</div>',
    '      </div>\n      </div>\n    </div>\n    <div class="nav-section">\n      <div class="nav-label" onclick="toggleNav(\'finance\')"><span>Finance</span><span class="nav-chevron" id="chevron-finance">▼</span></div>\n      <div id="navg-finance" class="nav-items-container">'
)
html = html.replace(
    '      </div>\n    </div>\n    <div class="nav-section">\n      <div class="nav-label">Analytics</div>',
    '      </div>\n      </div>\n    </div>\n    <div class="nav-section">\n      <div class="nav-label" onclick="toggleNav(\'analytics\')"><span>Analytics</span><span class="nav-chevron" id="chevron-analytics">▼</span></div>\n      <div id="navg-analytics" class="nav-items-container">'
)
html = html.replace(
    '      </div>\n    </div>\n    <div class="nav-section">\n      <div class="nav-label">System</div>',
    '      </div>\n      </div>\n    </div>\n    <div class="nav-section">\n      <div class="nav-label" onclick="toggleNav(\'system\')"><span>System</span><span class="nav-chevron" id="chevron-system">▼</span></div>\n      <div id="navg-system" class="nav-items-container">'
)
html = html.replace(
    '      <div class="nav-item" onclick="navigate(\'about\')" id="nav-about">\n        <span class="nav-icon">✦</span> Apex Flow Solutions\n      </div>\n    </div>\n  </nav>',
    '      <div class="nav-item" onclick="navigate(\'about\')" id="nav-about">\n        <span class="nav-icon">✦</span> Apex Flow Solutions\n      </div>\n      </div>\n    </div>\n  </nav>'
)

# Add Toggle Theme script and global functions to HTML
script_adder = """
<script>
  function toggleNav(id){
    const container = document.getElementById('navg-'+id);
    const chevron = document.getElementById('chevron-'+id);
    if(container.classList.contains('collapsed')){
      container.classList.remove('collapsed');
      chevron.style.transform = 'rotate(0deg)';
    }else{
      container.classList.add('collapsed');
      chevron.style.transform = 'rotate(-90deg)';
    }
  }

  function toggleTheme(){
    const body = document.body;
    if(body.getAttribute('data-theme') === 'light'){
      body.removeAttribute('data-theme');
      document.getElementById('theme-icon').textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      body.setAttribute('data-theme', 'light');
      document.getElementById('theme-icon').textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }

  // init theme
  if(localStorage.getItem('theme') === 'light'){
    document.body.setAttribute('data-theme', 'light');
  }
</script>
"""
html = html.replace("</body>", script_adder + "\n</body>")

theme_btn = """<!-- Live Search Dropdown -->
        <div id="search-dropdown" class="glass-card" style="display:none;position:absolute;top:100%;left:0;width:100%;z-index:100;margin-top:8px;padding:8px 0;max-height:400px;overflow-y:auto;box-shadow:0 10px 30px rgba(0,0,0,0.5);"></div>
      </div>
      <button class="btn btn-ghost" style="font-size:16px;padding:8px 12px; border-radius:50%;" onclick="toggleTheme()" title="Toggle Theme">
        <span id="theme-icon">☀️</span>
      </button>"""
html = html.replace("""<!-- Live Search Dropdown -->
        <div id="search-dropdown" class="glass-card" style="display:none;position:absolute;top:100%;left:0;width:100%;z-index:100;margin-top:8px;padding:8px 0;max-height:400px;overflow-y:auto;box-shadow:0 10px 30px rgba(0,0,0,0.5);"></div>
      </div>""", theme_btn)

# Make "theme-icon" sync accurately
html = html.replace('<span id="theme-icon">☀️</span>', '<span id="theme-icon"></span><script>document.getElementById("theme-icon").textContent = localStorage.getItem("theme") === "light" ? "🌙" : "☀️";</script>')

with open("enterprise_expense_management_saas.html", "w", encoding="utf-8") as f:
    f.write(html)

# 3. FIX CEO ADMIN TABLE IN SCRIPT.JS
with open("script.js", "r", encoding="utf-8") as f:
    js = f.read()

# Make the wrapper scrollable and no-wrap so names aren't cut off or clipped
js = js.replace('<div class="table-wrap">', '<div class="table-wrap" style="overflow-x:auto; white-space:nowrap; padding-bottom:8px;">')

# Ensure the CEO table padding is adequate
js = js.replace('<td>Sarvesh Chaudhary</td><td>CEO · Admin</td>', '<td style="font-weight:600; padding-right:30px;">Sarvesh Chaudhary</td><td style="padding-right:30px;">CEO &middot; Admin</td>')

with open("script.js", "w", encoding="utf-8") as f:
    f.write(js)
