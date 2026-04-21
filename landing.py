import re

with open("script.js", "r", encoding="utf-8") as f:
    js = f.read()

new_landing = """// ─── LANDING PAGE ───
function renderLanding(){
  const el=document.getElementById('content-area');
  el.innerHTML=`
  <div style="background:var(--bg); position:relative; overflow-x:hidden;">
    <!-- Background Effects -->
    <div style="position:absolute; width:600px; height:600px; background:var(--cyan); opacity:0.1; filter:blur(120px); border-radius:50%; top:-200px; left:-100px; pointer-events:none;"></div>
    <div style="position:absolute; width:400px; height:400px; background:var(--purple); opacity:0.1; filter:blur(100px); border-radius:50%; bottom:200px; right:-100px; pointer-events:none;"></div>
    
    <!-- Navbar -->
    <nav style="display:flex; justify-content:space-between; align-items:center; padding:30px 5vw; position:relative; z-index:2;">
      <div style="display:flex; align-items:center; gap:12px;">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 4L4 28H14L18 20L22 28H32L18 4Z" fill="#f8fafc"/>
          <path d="M18 20L14 28H22L18 20Z" fill="#18181b"/>
        </svg>
        <div style="font-family:'Syne',sans-serif; font-size:22px; font-weight:700; color:var(--text);">Apex Flow</div>
      </div>
      <div>
        <button class="btn btn-ghost" style="border:none; margin-right:16px; font-size:14px; background:transparent;" onclick="document.getElementById('plans')?.scrollIntoView({behavior: 'smooth'})">Pricing</button>
        <button class="btn btn-primary" style="padding:10px 24px; font-size:14px; border-radius:30px; border:none; box-shadow:0 4px 15px rgba(248, 250, 252, 0.1);" onclick="navigate('dashboard')">Launch Dashboard →</button>
      </div>
    </nav>

    <!-- Hero Section -->
    <div style="max-width:1100px; margin:0 auto; padding:80px 20px 40px 20px; text-align:center; position:relative; z-index:2; min-height:80vh; display:flex; flex-direction:column; justify-content:center; align-items:center;">
      <div style="display:inline-block; padding:8px 16px; background:rgba(0,229,255,0.08); color:var(--cyan); border-radius:30px; font-size:13px; font-weight:600; margin-bottom:24px; letter-spacing:1px; text-transform:uppercase; border:1px solid rgba(0,229,255,0.2);">Professional Enterprise Management</div>
      <h1 class="landing-hero" style="font-family:'Syne',sans-serif; font-size:64px; font-weight:800; line-height:1.1; margin-bottom:24px; letter-spacing:-1px;">The Ultimate SaaS<br/><span style="color:var(--text3);">Financial Platform.</span></h1>
      <p style="font-size:18px; color:var(--text2); max-width:650px; margin:0 auto 40px auto; line-height:1.6;">Apex Flow empowers multiple businesses with a seamless online platform to effectively manage cash flow, ease daily transactions, orchestrate global payments, and control expenses efficiently.</p>
      <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
        <button class="btn btn-primary" style="padding:16px 36px; font-size:16px; font-weight:600; border-radius:30px; border:none; box-shadow:0 8px 30px rgba(248, 250, 252, 0.15); transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'" onclick="navigate('dashboard')">Get Started For Free</button>
        <button class="btn btn-ghost" style="padding:16px 36px; font-size:16px; font-weight:600; border-radius:30px; border:1px solid rgba(255,255,255,0.2); transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'" onclick="document.getElementById('plans')?.scrollIntoView({behavior: 'smooth'})">View Pro Plans</button>
      </div>
    </div>

    <!-- Core Services -->
    <div style="background:rgba(255,255,255,0.02); border-top:1px solid rgba(255,255,255,0.05); border-bottom:1px solid rgba(255,255,255,0.05);">
        <div class="landing-cards" style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr 1fr; gap:24px; padding:60px 20px; position:relative; z-index:2;">
          <div class="glass-card" style="padding:32px; background:transparent; border:1px solid rgba(255,255,255,0.05);">
            <div style="font-size:32px; margin-bottom:20px; display:inline-block; padding:12px; background:rgba(0,229,255,0.1); border-radius:16px;">💳</div>
            <h3 style="font-size:18px; font-weight:600; margin-bottom:12px;">Global Payments & Cash Flow</h3>
            <p style="color:var(--text3); font-size:14px; line-height:1.6;">Route online payments, manage liquidity, and sync directly with enterprise bank APIs in one dashboard.</p>
          </div>
          <div class="glass-card" style="padding:32px; background:transparent; border:1px solid rgba(255,255,255,0.05);">
            <div style="font-size:32px; margin-bottom:20px; display:inline-block; padding:12px; background:rgba(168,85,247,0.1); border-radius:16px;">🏢</div>
            <h3 style="font-size:18px; font-weight:600; margin-bottom:12px;">Multi-Business Support</h3>
            <p style="color:var(--text3); font-size:14px; line-height:1.6;">Maintain separate tenant accounts and easily toggle between your enterprise subsidiaries seamlessly.</p>
          </div>
          <div class="glass-card" style="padding:32px; background:transparent; border:1px solid rgba(255,255,255,0.05);">
            <div style="font-size:32px; margin-bottom:20px; display:inline-block; padding:12px; background:rgba(255,201,71,0.1); border-radius:16px;">🔒</div>
            <h3 style="font-size:18px; font-weight:600; margin-bottom:12px;">Automated Transactions</h3>
            <p style="color:var(--text3); font-size:14px; line-height:1.6;">With AI categorization and hierarchical approvals, manual transaction mapping is entirely eliminated.</p>
          </div>
        </div>
    </div>

    <!-- Pro Plans -->
    <div id="plans" style="max-width:1200px; margin:0 auto; padding:80px 20px; position:relative; z-index:2;">
      <div style="text-align:center; margin-bottom:50px;">
        <h2 style="font-size:36px; font-family:'Syne',sans-serif; font-weight:800; margin-bottom:16px;">Apex Flow Pricing</h2>
        <p style="color:var(--text2); max-width:600px; margin:0 auto; line-height:1.6;">Basic operations are free unconditionally. However, as your enterprise operations scale, subscribing to our Pro Plans unlocks critical automations, compliance layers, and premium third-party integrations.</p>
      </div>

      <div class="landing-cards" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:24px; align-items:center;">
        
        <!-- Basic -->
        <div class="glass-card" style="padding:40px; border-color:var(--border);">
          <h3 style="font-size:20px; font-weight:600; margin-bottom:8px;">Basic</h3>
          <p style="color:var(--text3); font-size:13px; margin-bottom:24px; min-height:40px;">Essential expense tracking for small teams.</p>
          <div style="margin-bottom:24px;"><span style="font-family:'Syne',sans-serif; font-size:42px; font-weight:700;">$0</span><span style="color:var(--text3);"> /mo</span></div>
          <ul style="list-style:none; padding:0; margin-bottom:32px; display:flex; flex-direction:column; gap:12px; font-size:14px; color:var(--text2);">
            <li>✓ Up to 5 Employees</li>
            <li>✓ Standard Expense Logging</li>
            <li>✓ Basic Reports</li>
            <li style="opacity:0.4;">✗ Automated Approvals</li>
            <li style="opacity:0.4;">✗ Integration Webhooks</li>
          </ul>
          <button class="btn btn-ghost" style="width:100%; justify-content:center;" onclick="navigate('dashboard')">Start Free</button>
        </div>

        <!-- Pro -->
        <div class="glass-card" style="padding:50px 40px; border-color:rgba(0,229,255,0.4); background:rgba(24,24,27,0.9); position:relative; transform:scale(1.03); box-shadow:0 10px 40px rgba(0,229,255,0.06); z-index:5;">
          <div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:var(--text); color:#000; padding:4px 16px; border-radius:20px; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">Most Popular</div>
          <h3 style="font-size:20px; font-weight:600; margin-bottom:8px; color:var(--text);">Pro Member</h3>
          <p style="color:var(--text3); font-size:13px; margin-bottom:24px; min-height:40px;">Advanced insights and automation for scaling teams.</p>
          <div style="margin-bottom:24px;"><span style="font-family:'Syne',sans-serif; font-size:42px; font-weight:700;">$49</span><span style="color:var(--text3);"> /mo /user</span></div>
          <ul style="list-style:none; padding:0; margin-bottom:32px; display:flex; flex-direction:column; gap:12px; font-size:14px; color:var(--text2);">
            <li><span style="color:var(--text);">✓</span> Unlimited Employees</li>
            <li><span style="color:var(--text);">✓</span> AI Receipt Scanning</li>
            <li><span style="color:var(--text);">✓</span> Pro Custom Analytics</li>
            <li><span style="color:var(--text);">✓</span> Automated Approval Tiers</li>
            <li><span style="color:var(--text);">✓</span> Slack & Tally ERP Sync</li>
          </ul>
          <button class="btn btn-primary" style="width:100%; justify-content:center;" onclick="navigate('dashboard')">Subscribe to Pro</button>
        </div>

        <!-- Enterprise -->
        <div class="glass-card" style="padding:40px; border-color:var(--border);">
          <h3 style="font-size:20px; font-weight:600; margin-bottom:8px;">Enterprise</h3>
          <p style="color:var(--text3); font-size:13px; margin-bottom:24px; min-height:40px;">Dedicated architecture for large organizations.</p>
          <div style="margin-bottom:24px;"><span style="font-family:'Syne',sans-serif; font-size:42px; font-weight:700;">Custom</span></div>
          <ul style="list-style:none; padding:0; margin-bottom:32px; display:flex; flex-direction:column; gap:12px; font-size:14px; color:var(--text2);">
            <li>✓ Multi-Business Tenant Support</li>
            <li>✓ Custom API Solutions</li>
            <li>✓ Advanced SSO (SAML)</li>
            <li>✓ Dedicated Success Manager</li>
            <li>✓ On-Premise Add-ons</li>
          </ul>
          <button class="btn btn-ghost" style="width:100%; justify-content:center;" onclick="navigate('contact')">Contact Sales</button>
        </div>

      </div>
    </div>

    <!-- FAQs -->
    <div style="max-width:800px; margin:0 auto; padding:40px 20px 100px 20px; position:relative; z-index:2;">
      <h2 style="font-size:32px; font-family:'Syne',sans-serif; font-weight:800; margin-bottom:40px; text-align:center;">Frequently Asked Questions</h2>
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div class="glass-card" style="padding:24px;">
          <h3 style="font-size:16px; font-weight:600; margin-bottom:10px;">Why do I need a Pro Subscription?</h3>
          <p style="color:var(--text3); font-size:14.5px; line-height:1.6;">While basic transaction tracking is free, modern enterprises require automated guardrails. Subscribing to Pro seamlessly handles GST checks, auto-rejects unapproved spends based on multi-level policies, and unlocks APIs that natively push ledger entries to platforms like Tally or Zoho Books. The human-hour savings pays for itself instantly.</p>
        </div>
        <div class="glass-card" style="padding:24px;">
          <h3 style="font-size:16px; font-weight:600; margin-bottom:10px;">Is my corporate financial data secure?</h3>
          <p style="color:var(--text3); font-size:14.5px; line-height:1.6;">Absolutely. All data transmitted through Apex Flow is 256-bit AES encrypted. In addition, our architecture enforces localized XSS sanitization and CSRF protections, guaranteeing no unauthorized access to organizational balances.</p>
        </div>
        <div class="glass-card" style="padding:24px;">
          <h3 style="font-size:16px; font-weight:600; margin-bottom:10px;">Can multiple businesses run on the same account?</h3>
          <p style="color:var(--text3); font-size:14.5px; line-height:1.6;">Yes, our Enterprise tier natively supports multi-tenant deployments. You can act as an umbrella corp managing cash flow and analytics across distinct divisions seamlessly from one unified dashboard.</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer style="border-top:1px solid rgba(255,255,255,0.05); padding:40px 20px; text-align:center; color:var(--text3); font-size:13px; background:rgba(9,9,11,0.5);">
      <div style="display:flex; justify-content:center; align-items:center; gap:8px; margin-bottom:16px;">
        <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 4L4 28H14L18 20L22 28H32L18 4Z" fill="url(#pfoot)"/>
          <defs><linearGradient id="pfoot" x1="4" y1="4" x2="32" y2="32"><stop stop-color="#71717a"/><stop offset="1" stop-color="#3f3f46"/></linearGradient></defs>
        </svg>
        <span style="font-weight:700; color:var(--text2); letter-spacing:1px;">APEX FLOW</span>
      </div>
      © 2026 Apex Flow Enterprises Pvt. Ltd. All rights reserved.
    </footer>
  </div>`;
}

// ─── APEX FLOW ABOUT"""

js = re.sub(r'// ─── LANDING PAGE ───.*?// ─── APEX FLOW ABOUT', new_landing, js, flags=re.DOTALL)

with open("script.js", "w", encoding="utf-8") as f:
    f.write(js)
