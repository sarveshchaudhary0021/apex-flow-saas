import re

with open("script.js", "r", encoding="utf-8") as f:
    js = f.read()

# 1. Update handleSearch
old_handleSearch = """function handleSearch(v){
  searchQuery=v;
  if(currentPage==='transactions')renderPage('transactions');
}"""

new_handleSearch = """function handleSearch(v){
  searchQuery=v;
  const dropdown = document.getElementById('search-dropdown');
  if(!dropdown) return;
  if(!v.trim()){
    dropdown.style.display = 'none';
    if(currentPage==='transactions') renderPage('transactions');
    return;
  }
  
  const q = v.toLowerCase();
  const results = transactions.filter(t=> t.desc.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || (t.emp||'').toLowerCase().includes(q)).slice(0, 5);
  
  if(results.length > 0){
    dropdown.innerHTML = results.map(t=>`
      <div style="padding:10px 16px;border-bottom:1px solid var(--border);cursor:pointer;display:flex;justify-content:space-between;align-items:center;" onmouseover="this.style.background='var(--glass2)'" onmouseout="this.style.background='transparent'" onclick="navigate('transactions'); document.getElementById('global-search').value='${e(t.desc)}'; handleSearch('${e(t.desc)}'); document.getElementById('search-dropdown').style.display='none';">
        <div>
          <div style="font-size:13px;font-weight:500;">${e(t.desc)}</div>
          <div style="font-size:11px;color:var(--text3);margin-top:2px;">${e(t.category)} &middot; ${e(t.date)}</div>
        </div>
        <div style="color:${t.type==='income'?'var(--green)':'var(--red)'};font-weight:600;font-size:13px;">${t.type==='income'?'+':'-'}${fmt(t.amount)}</div>
      </div>
    `).join('') + \`<div style="padding:10px;text-align:center;font-size:12px;color:var(--cyan);cursor:pointer;font-weight:600;" onclick="navigate('transactions');document.getElementById('search-dropdown').style.display='none';">View all \${results.length}+ results</div>\`;
  } else {
    dropdown.innerHTML = \`<div style="padding:16px;text-align:center;color:var(--text3);font-size:13px;">No transactions found.</div>\`;
  }
  dropdown.style.display = 'block';
  
  if(currentPage==='transactions') renderPage('transactions');
}

document.addEventListener('click', function(e){
  const sd = document.getElementById('search-dropdown');
  const gs = document.getElementById('global-search');
  if(sd && e.target !== sd && e.target !== gs && !sd.contains(e.target)) sd.style.display = 'none';
});
"""
js = js.replace(old_handleSearch, new_handleSearch)

# 2. Update navigate
old_navigate = """function navigate(page){
  currentPage=page;
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.remove('active'));
  const navEl=document.getElementById('nav-'+page);
  if(navEl)navEl.classList.add('active');
  document.getElementById('page-title').textContent={
    dashboard:'Dashboard Overview',transactions:'Transactions',expenses:'Expense Management',
    revenue:'Revenue Tracker',budgets:'Budget Planning',reports:'Reports & P&L Analysis',
    employees:'Employee Expenses',settings:'System Settings',contact:'Contact Us',admin:'CEO & Admin Portal'
  }[page]||page;
  destroyCharts();
  const el=document.getElementById('content-area');
  el.innerHTML='';
  renderPage(page);
}"""

new_navigate = """function navigate(page){
  currentPage=page;
  
  const sidebar = document.querySelector('.sidebar');
  const topbar = document.querySelector('.topbar');
  const main = document.querySelector('.main');
  const content = document.getElementById('content-area');
  
  if(page === 'landing'){
    if(sidebar) sidebar.style.display = 'none';
    if(topbar) topbar.style.display = 'none';
    if(main) main.style.padding = '0';
    if(content) {
      content.style.padding = '0';
      content.style.height = '100vh';
      content.style.overflowY = 'auto'; // allow scrolling landing
    }
  } else {
    if(sidebar) sidebar.style.display = 'flex';
    if(topbar) topbar.style.display = 'flex';
    if(main) main.style.padding = '';
    if(content) {
      content.style.padding = '';
      content.style.height = '';
      content.style.overflowY = '';
    }
  }

  document.querySelectorAll('.nav-item').forEach(el=>el.classList.remove('active'));
  const navEl=document.getElementById('nav-'+page);
  if(navEl)navEl.classList.add('active');
  document.getElementById('page-title').textContent={
    dashboard:'Dashboard Overview',transactions:'Transactions',expenses:'Expense Management',
    revenue:'Revenue Tracker',budgets:'Budget Planning',reports:'Reports & P&L Analysis',
    employees:'Employee Expenses',settings:'System Settings',contact:'Contact Us',admin:'CEO & Admin Portal',
    about:'Apex Flow Solutions'
  }[page]||page;
  destroyCharts();
  if(content) content.innerHTML='';
  renderPage(page);
}"""
js = js.replace(old_navigate, new_navigate)

# 3. Update renderPage switch
old_switch = """    case 'contact': renderContact(); break;
    case 'admin': renderAdmin(); break;
  }"""
new_switch = """    case 'contact': renderContact(); break;
    case 'admin': renderAdmin(); break;
    case 'about': renderAbout(); break;
    case 'landing': renderLanding(); break;
  }"""
js = js.replace(old_switch, new_switch)


# 4. Add renderAbout and renderLanding
new_sections = """// ─── LANDING PAGE ───
function renderLanding(){
  const el=document.getElementById('content-area');
  el.innerHTML=`
  <div style="background:var(--bg); min-height:100vh; position:relative; overflow:hidden;">
    <div style="position:absolute; width:600px; height:600px; background:var(--cyan); opacity:0.1; filter:blur(120px); border-radius:50%; top:-200px; left:-100px; pointer-events:none;"></div>
    <div style="position:absolute; width:400px; height:400px; background:var(--purple); opacity:0.1; filter:blur(100px); border-radius:50%; bottom:-100px; right:-100px; pointer-events:none;"></div>
    
    <nav style="display:flex; justify-content:space-between; align-items:center; padding:30px 50px; position:relative; z-index:2;">
      <div style="display:flex; align-items:center; gap:12px;">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 4L4 28H14L18 20L22 28H32L18 4Z" fill="#f8fafc"/>
          <path d="M18 20L14 28H22L18 20Z" fill="#18181b"/>
        </svg>
        <div style="font-family:'Syne',sans-serif; font-size:22px; font-weight:700; color:var(--text);">Apex Flow</div>
      </div>
      <button class="btn btn-primary" style="padding:12px 24px; font-size:14px; border-radius:30px; border:none; box-shadow:0 4px 15px rgba(248, 250, 252, 0.1);" onclick="navigate('dashboard')">Launch Dashboard →</button>
    </nav>

    <div style="max-width:1100px; margin:0 auto; padding:100px 20px 80px 20px; text-align:center; position:relative; z-index:2;">
      <div style="display:inline-block; padding:8px 16px; background:rgba(0,229,255,0.1); color:var(--cyan); border-radius:30px; font-size:13px; font-weight:600; margin-bottom:24px; letter-spacing:1px; text-transform:uppercase; border:1px solid rgba(0,229,255,0.2);">Next-Gen SaaS Finance</div>
      <h1 style="font-family:'Syne',sans-serif; font-size:72px; font-weight:800; line-height:1.1; margin-bottom:24px; letter-spacing:-1px;">Enterprise Expense<br/><span style="color:var(--text3);">Reimagined.</span></h1>
      <p style="font-size:18px; color:var(--text2); max-width:600px; margin:0 auto 40px auto; line-height:1.6;">Control budgets, automate approvals, and gain real-time visibility into your corporate spend with a premium SaaS platform tailored for scale.</p>
      <div style="display:flex; gap:16px; justify-content:center;">
        <button class="btn btn-primary" style="padding:16px 36px; font-size:16px; font-weight:600; border-radius:30px; border:none; box-shadow:0 8px 30px rgba(248, 250, 252, 0.15); transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'" onclick="navigate('dashboard')">Enter Application</button>
        <button class="btn btn-ghost" style="padding:16px 36px; font-size:16px; font-weight:600; border-radius:30px; border:1px solid rgba(255,255,255,0.2); transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'" onclick="navigate('dashboard'); setTimeout(()=>navigate('about'), 50);">Why Apex Flow?</button>
      </div>
    </div>
    
    <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr 1fr; gap:24px; padding:40px 20px 80px 20px; position:relative; z-index:2;">
      <div class="glass-card" style="padding:32px; background:rgba(24, 24, 27, 0.4); border:1px solid rgba(255,255,255,0.05); transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="font-size:32px; margin-bottom:20px; display:inline-block; padding:12px; background:rgba(168,85,247,0.1); border-radius:16px;">⚡</div>
        <h3 style="font-size:18px; font-weight:600; margin-bottom:12px;">Automated Workflows</h3>
        <p style="color:var(--text3); font-size:14px; line-height:1.6;">Configurable multi-level approvals and automated routing ensure strict compliance without operational bottlenecks.</p>
      </div>
      <div class="glass-card" style="padding:32px; background:rgba(24, 24, 27, 0.4); border:1px solid rgba(255,255,255,0.05); transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="font-size:32px; margin-bottom:20px; display:inline-block; padding:12px; background:rgba(0,229,255,0.1); border-radius:16px;">📊</div>
        <h3 style="font-size:18px; font-weight:600; margin-bottom:12px;">Real-time Analytics</h3>
        <p style="color:var(--text3); font-size:14px; line-height:1.6;">Deep dive into P&L statements, budget utilization, and cash flow trends with beautifully interactive visualizations.</p>
      </div>
      <div class="glass-card" style="padding:32px; background:rgba(24, 24, 27, 0.4); border:1px solid rgba(255,255,255,0.05); transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="font-size:32px; margin-bottom:20px; display:inline-block; padding:12px; background:rgba(255,201,71,0.1); border-radius:16px;">🛡️</div>
        <h3 style="font-size:18px; font-weight:600; margin-bottom:12px;">Enterprise Security</h3>
        <p style="color:var(--text3); font-size:14px; line-height:1.6;">Engineered with localized XSS protection, role-based access control, and comprehensive tamper-proof audit logs.</p>
      </div>
    </div>
  </div>`;
}

// ─── APEX FLOW ABOUT/SERVICES ───
function renderAbout(){
  const el=document.getElementById('content-area');
  el.innerHTML=`
  <div class="page" style="max-width:900px; margin:0 auto; padding-top:20px;">
    <div style="text-align:center; margin-bottom:50px;">
      <h1 style="font-family:'Syne',sans-serif; font-size:40px; font-weight:800; margin-bottom:16px;">Why Apex Flow?</h1>
      <p style="font-size:16px; color:var(--text2); max-width:640px; margin:0 auto; line-height:1.6;">Apex Flow provides enterprise-grade financial management tools that scale with your corporate needs. Explore the core services we offer to streamline your expenditure workflows and unlock rapid growth.</p>
    </div>
    
    <div style="display:flex; flex-direction:column; gap:24px;">
      <div class="glass-card" style="display:flex; gap:32px; align-items:center; padding:40px; transition:box-shadow 0.3s;" onmouseover="this.style.boxShadow='0 8px 30px rgba(0,0,0,0.4)'" onmouseout="this.style.boxShadow='none'">
        <div style="font-size:48px; background:rgba(0,229,255,0.1); width:96px; height:96px; display:flex; align-items:center; justify-content:center; border-radius:50%; flex-shrink:0;">🤖</div>
        <div>
          <h3 style="font-size:22px; font-weight:600; margin-bottom:12px; color:var(--cyan);">Smart Spend Categorization</h3>
          <p style="color:var(--text3); line-height:1.6; font-size:14.5px;">Our predictive engine automatically tags and categorizes transactions in real-time, removing the burden of manual entry so your accounting team can focus on what matters most — complex forecasting analysis.</p>
        </div>
      </div>
      
      <div class="glass-card" style="display:flex; gap:32px; align-items:center; padding:40px; transition:box-shadow 0.3s;" onmouseover="this.style.boxShadow='0 8px 30px rgba(0,0,0,0.4)'" onmouseout="this.style.boxShadow='none'">
        <div style="font-size:48px; background:rgba(168,85,247,0.1); width:96px; height:96px; display:flex; align-items:center; justify-content:center; border-radius:50%; flex-shrink:0;">⚖️</div>
        <div>
          <h3 style="font-size:22px; font-weight:600; margin-bottom:12px; color:var(--purple);">Dynamic Approval Hierarchies</h3>
          <p style="color:var(--text3); line-height:1.6; font-size:14.5px;">Establish nested L1 and L2 managerial hierarchies. When a budget utilization threshold is breached, Apex Flow automatically routes approval requests to the relevant department head via Slack or Email.</p>
        </div>
      </div>
      
      <div class="glass-card" style="display:flex; gap:32px; align-items:center; padding:40px; transition:box-shadow 0.3s;" onmouseover="this.style.boxShadow='0 8px 30px rgba(0,0,0,0.4)'" onmouseout="this.style.boxShadow='none'">
        <div style="font-size:48px; background:rgba(255,201,71,0.1); width:96px; height:96px; display:flex; align-items:center; justify-content:center; border-radius:50%; flex-shrink:0;">⚙️</div>
        <div>
          <h3 style="font-size:22px; font-weight:600; margin-bottom:12px; color:var(--gold);">Deep Third-Party Integrations</h3>
          <p style="color:var(--text3); line-height:1.6; font-size:14.5px;">Seamlessly connect via robust APIs with RazorPay, Zoho Books, Slack, and the GSTN Portal, granting you a centralized financial ecosystem without needing to tear up your legacy tech stack.</p>
        </div>
      </div>
      
      <div class="glass-card" style="text-align:center; padding:48px; margin-top:16px; background:linear-gradient(to right, rgba(24,24,27,0.4), rgba(0,229,255,0.05)); border-color:rgba(0,229,255,0.1);">
        <h3 style="font-size:24px; font-weight:700; margin-bottom:16px; color:var(--text);">Ready to Elevate Your Workflow?</h3>
        <p style="color:var(--text3); margin-bottom:32px; max-width:540px; margin-left:auto; margin-right:auto; font-size:15px; line-height:1.6;">Experience transparent pricing, unparalleled performance, and dedicated onboarding support tailored strictly for your enterprise scale.</p>
        <button class="btn btn-primary" style="padding:14px 40px; font-size:15px; font-weight:600; border-radius:30px;" onclick="navigate('contact')">Get in Touch with CEO</button>
      </div>
    </div>
  </div>`;
}

// ─── MODAL ───"""
js = js.replace("// ─── MODAL ───", new_sections)

# 5. Modify Init Route
js = js.replace("navigate('dashboard');", "navigate('landing');")

with open("script.js", "w", encoding="utf-8") as f:
    f.write(js)
