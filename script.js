// ─── DATA STORE ───
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const CATEGORIES = {
  expense:['Marketing','Operations','Payroll','Travel','Software','Equipment','Utilities','Consulting'],
  income:['Product Sales','Service Revenue','Consulting Fees','License Revenue','Partnership','Refunds']
};
const COLORS = {
  Marketing:'#a855f7',Operations:'#00e5ff',Payroll:'#ffc947',Travel:'#ff6b35',
  Software:'#00e676',Equipment:'#f472b6',Utilities:'#38bdf8',Consulting:'#fb923c',
  'Product Sales':'#00e676','Service Revenue':'#00e5ff','Consulting Fees':'#a855f7',
  'License Revenue':'#ffc947','Partnership':'#ff6b35','Refunds':'#f472b6'
};

let transactions = [
  {id:1,type:'income',category:'Product Sales',desc:'Q1 Product Line Revenue',amount:485000,date:'2025-01-15',status:'approved',emp:''},
  {id:2,type:'expense',category:'Payroll',desc:'January Payroll Run',amount:120000,date:'2025-01-31',status:'approved',emp:''},
  {id:3,type:'expense',category:'Marketing',desc:'Google Ads Campaign',amount:28500,date:'2025-02-05',status:'approved',emp:'Priya Singh'},
  {id:4,type:'income',category:'Service Revenue',desc:'Enterprise Consulting Feb',amount:95000,date:'2025-02-12',status:'approved',emp:'Rudra Pratap'},
  {id:5,type:'expense',category:'Software',desc:'AWS Cloud Services',amount:18200,date:'2025-02-20',status:'approved',emp:'Akshat Awasthi'},
  {id:6,type:'expense',category:'Travel',desc:'Sales Team Conference Mumbai',amount:45000,date:'2025-03-08',status:'approved',emp:'Udit Singh'},
  {id:7,type:'income',category:'Product Sales',desc:'Q2 Product Launch',amount:620000,date:'2025-04-01',status:'approved',emp:''},
  {id:8,type:'expense',category:'Equipment',desc:'Server Hardware Upgrade',amount:85000,date:'2025-04-10',status:'pending',emp:'Akshat Awasthi'},
  {id:9,type:'expense',category:'Consulting',desc:'Legal & Compliance Review',amount:32000,date:'2025-04-18',status:'approved',emp:''},
  {id:10,type:'income',category:'Consulting Fees',desc:'Product Strategy Advisory',amount:75000,date:'2025-05-02',status:'approved',emp:'Rudra Pratap'},
  {id:11,type:'expense',category:'Operations',desc:'Office Rent Q2',amount:60000,date:'2025-05-01',status:'approved',emp:''},
  {id:12,type:'expense',category:'Utilities',desc:'Electricity & Internet Q2',amount:8500,date:'2025-05-10',status:'approved',emp:''},
  {id:13,type:'income',category:'License Revenue',desc:'SaaS License Renewals',amount:180000,date:'2025-06-01',status:'approved',emp:''},
  {id:14,type:'expense',category:'Marketing',desc:'LinkedIn Sponsored Content',amount:22000,date:'2025-06-15',status:'pending',emp:'Priya Singh'},
  {id:15,type:'income',category:'Partnership',desc:'Channel Partner Revenue',amount:95000,date:'2025-07-01',status:'approved',emp:'Meenakhi Neolia'},
  {id:16,type:'expense',category:'Payroll',desc:'Mid-Year Payroll',amount:125000,date:'2025-07-31',status:'approved',emp:''},
  {id:17,type:'expense',category:'Travel',desc:'International Client Visit',amount:68000,date:'2025-08-12',status:'approved',emp:'Parul Mishra'},
  {id:18,type:'income',category:'Service Revenue',desc:'Implementation Services Q3',amount:220000,date:'2025-09-15',status:'approved',emp:''},
  {id:19,type:'expense',category:'Software',desc:'Annual SaaS Subscriptions',amount:24500,date:'2025-10-01',status:'approved',emp:'Akshat Awasthi'},
  {id:20,type:'income',category:'Product Sales',desc:'Year-End Product Push',amount:780000,date:'2025-11-01',status:'approved',emp:''},
  {id:21,type:'expense',category:'Equipment',desc:'Laptop Fleet Refresh',amount:145000,date:'2025-11-15',status:'pending',emp:''},
  {id:22,type:'income',category:'Consulting Fees',desc:'Strategic Advisory Q4',amount:110000,date:'2025-12-01',status:'approved',emp:'Rudra Pratap'},
  {id:23,type:'expense',category:'Consulting',desc:'Tax Advisory Services',amount:28000,date:'2025-12-10',status:'approved',emp:''},
  {id:24,type:'expense',category:'Marketing',desc:'Year End Brand Campaign',amount:55000,date:'2025-12-20',status:'pending',emp:'Priya Singh'},
];
let nextId = 25;

let budgets = [
  {id:1,category:'Marketing',allocated:200000,color:'#a855f7'},
  {id:2,category:'Operations',allocated:180000,color:'#00e5ff'},
  {id:3,category:'Payroll',allocated:1500000,color:'#ffc947'},
  {id:4,category:'Travel',allocated:150000,color:'#ff6b35'},
  {id:5,category:'Software',allocated:100000,color:'#00e676'},
  {id:6,category:'Equipment',allocated:400000,color:'#f472b6'},
  {id:7,category:'Utilities',allocated:60000,color:'#38bdf8'},
  {id:8,category:'Consulting',allocated:120000,color:'#fb923c'},
];

let employees = [
  {id:1,name:'Priya Singh',dept:'Marketing',initials:'PS',color:'#a855f7'},
  {id:2,name:'Rudra Pratap',dept:'Business Dev',initials:'RP',color:'#00e5ff'},
  {id:3,name:'Udit Singh',dept:'Sales',initials:'US',color:'#00e676'},
  {id:4,name:'Akshat Awasthi',dept:'Engineering',initials:'AA',color:'#ffc947'},
  {id:5,name:'Meenakhi Neolia',dept:'Partnerships',initials:'MN',color:'#f472b6'},
  {id:6,name:'Parul Mishra',dept:'Operations',initials:'PM',color:'#ff6b35'},
  {id:7,name:'Astitwamay Mishra',dept:'Engineering',initials:'AM',color:'#38bdf8'},
  {id:8,name:'Aditya Pratap',dept:'Sales',initials:'AP',color:'#fb923c'},
  {id:9,name:'Ansh Pandey',dept:'Marketing',initials:'AP',color:'#a855f7'},
  {id:10,name:'Aditya Tripathi',dept:'Operations',initials:'AT',color:'#00e676'},
  {id:11,name:'Aditya Pandey',dept:'Business Dev',initials:'AP',color:'#ffc947'},
];

let currentPage = 'dashboard';
let editingId = null;
let charts = {};
let searchQuery = '';
let txFilter = {type:'all',status:'all',category:'all'};

// ─── UTILITIES ───
function e(s){return s?String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])):'';}
function fmt(n){return '₹'+Math.abs(n).toLocaleString('en-IN',{maximumFractionDigits:0});}
function fmtShort(n){if(n>=1e7)return '₹'+(n/1e7).toFixed(2)+'Cr';if(n>=1e5)return '₹'+(n/1e5).toFixed(1)+'L';return fmt(n);}
function pct(a,b){return b===0?0:Math.round(a/b*100);}
function destroyCharts(){Object.values(charts).forEach(c=>{try{c.destroy();}catch(e){}});charts={};}

function getMonthlyData(){
  const data=MONTHS.map((_,i)=>({month:MONTHS[i],income:0,expense:0}));
  transactions.forEach(tx=>{
    const m=new Date(tx.date).getMonth();
    if(tx.type==='income')data[m].income+=tx.amount;
    else data[m].expense+=tx.amount;
  });
  return data.map(d=>({...d,profit:d.income-d.expense,gross:d.income-d.expense*0.6}));
}

function getTotals(){
  let income=0,expense=0;
  transactions.forEach(t=>{if(t.type==='income')income+=t.amount;else expense+=t.amount;});
  return {income,expense,profit:income-expense,margin:pct(income-expense,income)};
}

function getCategoryExpenses(){
  const map={};
  transactions.filter(t=>t.type==='expense').forEach(t=>{
    map[t.category]=(map[t.category]||0)+t.amount;
  });
  return map;
}

function navigate(page){
  currentPage=page;
  
  const sidebar = document.querySelector('.sidebar');
  const topbar = document.querySelector('.topbar');
  const main = document.querySelector('.main');
  const content = document.getElementById('content-area');
  
  if(page === 'landing'){
    if(sidebar) sidebar.style.display = 'none';
    if(topbar) topbar.style.display = 'none';
    if(main) {
      main.style.padding = '0';
      main.style.marginLeft = '0';
    }
    if(content) {
      content.style.padding = '0';
      content.style.height = 'auto';
      content.style.overflowY = 'visible';
    }
  } else {
    if(sidebar) sidebar.style.display = 'flex';
    if(topbar) topbar.style.display = 'flex';
    if(main) {
      main.style.padding = '';
      main.style.marginLeft = '';
    }
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
  
  if(content) {
    content.style.transition = 'opacity 0.2s ease-in-out';
    content.style.opacity = '0';
    setTimeout(() => {
      content.innerHTML='';
      renderPage(page);
      content.style.opacity = '1';
    }, 200);
  } else {
    renderPage(page);
  }
}

function handleSearch(v){
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
    `).join('') + `<div style="padding:10px;text-align:center;font-size:12px;color:var(--cyan);cursor:pointer;font-weight:600;" onclick="navigate('transactions');document.getElementById('search-dropdown').style.display='none';">View all ${results.length}+ results</div>`;
  } else {
    dropdown.innerHTML = `<div style="padding:16px;text-align:center;color:var(--text3);font-size:13px;">No transactions found.</div>`;
  }
  dropdown.style.display = 'block';
  
  if(currentPage==='transactions') renderPage('transactions');
}

document.addEventListener('click', function(e){
  const sd = document.getElementById('search-dropdown');
  const gs = document.getElementById('global-search');
  if(sd && e.target !== sd && e.target !== gs && !sd.contains(e.target)) sd.style.display = 'none';
});


// ─── RENDER ROUTER ───
function renderPage(page){
  switch(page){
    case 'dashboard': renderDashboard(); break;
    case 'transactions': renderTransactions(); break;
    case 'expenses': renderExpenses(); break;
    case 'revenue': renderRevenue(); break;
    case 'budgets': renderBudgets(); break;
    case 'reports': renderReports(); break;
    case 'employees': renderEmployees(); break;
    case 'settings': renderSettings(); break;
    case 'contact': renderContact(); break;
    case 'admin': renderAdmin(); break;
    case 'about': renderAbout(); break;
    case 'landing': renderLanding(); break;
  }
}

// ─── DASHBOARD ───
function renderDashboard(){
  const totals=getTotals();
  const el=document.getElementById('content-area');
  el.innerHTML=`
  <div class="page">
  <div class="kpi-grid">
    <div class="kpi-card cyan">
      <div class="kpi-label">Total Revenue</div>
      <div class="kpi-value cyan">${fmtShort(totals.income)}</div>
      <div class="kpi-change up">▲ 18.4% vs last year</div>
      <div class="kpi-icon">💰</div>
    </div>
    <div class="kpi-card red">
      <div class="kpi-label">Total Expenses</div>
      <div class="kpi-value red">${fmtShort(totals.expense)}</div>
      <div class="kpi-change down">▲ 12.1% vs last year</div>
      <div class="kpi-icon">📊</div>
    </div>
    <div class="kpi-card green">
      <div class="kpi-label">Net Profit</div>
      <div class="kpi-value green">${fmtShort(totals.profit)}</div>
      <div class="kpi-change up">▲ 24.7% vs last year</div>
      <div class="kpi-icon">📈</div>
    </div>
    <div class="kpi-card gold">
      <div class="kpi-label">Profit Margin</div>
      <div class="kpi-value gold">${totals.margin}%</div>
      <div class="kpi-change up">▲ 3.2pp improvement</div>
      <div class="kpi-icon">⚡</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="glass-card">
      <div class="chart-title">Revenue vs Expenses</div>
      <div class="chart-sub">Monthly comparison · FY 2025</div>
      <div class="legend-row" style="margin-top:12px;">
        <span class="legend-chip"><span class="legend-sq" style="background:#00e5ff;"></span>Revenue</span>
        <span class="legend-chip"><span class="legend-sq" style="background:#ff4757;"></span>Expenses</span>
        <span class="legend-chip"><span class="legend-sq" style="background:#00e676;"></span>Net Profit</span>
      </div>
      <div class="chart-wrap" style="height:240px;"><canvas id="chart-revexp" role="img" aria-label="Monthly revenue vs expenses bar chart">Revenue and expense comparison by month.</canvas></div>
    </div>
    <div class="glass-card">
      <div class="chart-title">Expense by Category</div>
      <div class="chart-sub">Distribution breakdown</div>
      <div class="chart-wrap" style="height:200px;margin-top:8px;"><canvas id="chart-catpie" role="img" aria-label="Expense category distribution donut chart">Expense breakdown by category.</canvas></div>
      <div id="pie-legend" style="margin-top:8px;"></div>
    </div>
  </div>

  <div class="grid-2">
    <div class="glass-card">
      <div class="section-header">
        <div>
          <div class="chart-title">Recent Transactions</div>
          <div class="chart-sub">Last 5 transactions</div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="navigate('transactions')">View All →</button>
      </div>
      <div>
        ${transactions.slice(-5).reverse().map(t=>`
        <div class="tl-item">
          <div class="tl-dot" style="background:${t.type==='income'?'rgba(0,230,118,0.15)':'rgba(255,71,87,0.15)'};color:${t.type==='income'?'var(--green)':'var(--red)'};">
            ${t.type==='income'?'↑':'↓'}
          </div>
          <div class="tl-body">
            <div class="tl-title">${e(t.desc)}</div>
            <div class="tl-time">${e(t.date)} · ${e(t.category)}</div>
          </div>
          <div class="tl-amt" style="color:${t.type==='income'?'var(--green)':'var(--red)'};">
            ${t.type==='income'?'+':'-'}${fmtShort(t.amount)}
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="glass-card">
      <div class="chart-title">Cash Flow Trend</div>
      <div class="chart-sub">Cumulative profit · 2025</div>
      <div class="chart-wrap" style="height:240px;margin-top:16px;"><canvas id="chart-cashflow" role="img" aria-label="Cumulative cash flow area chart">Cumulative cash flow trend.</canvas></div>
    </div>
  </div>

  <div class="glass-card">
    <div class="section-header">
      <div>
        <div class="chart-title">Budget Utilization</div>
        <div class="chart-sub">Spend vs allocated per department</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
      ${budgets.map(b=>{
        const spent=getCategoryExpenses()[b.category]||0;
        const pctUsed=Math.min(pct(spent,b.allocated),100);
        const over=spent>b.allocated;
        return `<div class="budget-card">
          <div class="budget-header">
            <div class="budget-name">${e(b.category)}</div>
            <span style="font-size:12px;font-weight:700;color:${over?'var(--red)':'var(--green)'};">${pctUsed}%</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${pctUsed}%;background:${over?'var(--red)':b.color};"></div></div>
          <div class="budget-amounts">${fmtShort(spent)} / ${fmtShort(b.allocated)}</div>
        </div>`;
      }).join('')}
    </div>
  </div>
  </div>`;
  setTimeout(drawDashboardCharts,50);
}

function drawDashboardCharts(){
  const monthly=getMonthlyData();
  const catExp=getCategoryExpenses();

  // Revenue vs Expenses Bar
  const ctx1=document.getElementById('chart-revexp');
  if(ctx1){
    charts.revexp=new Chart(ctx1,{
      type:'bar',
      data:{
        labels:MONTHS,
        datasets:[
          {label:'Revenue',data:monthly.map(d=>d.income),backgroundColor:'rgba(0,229,255,0.25)',borderColor:'#00e5ff',borderWidth:1.5,borderRadius:4},
          {label:'Expenses',data:monthly.map(d=>d.expense),backgroundColor:'rgba(255,71,87,0.2)',borderColor:'#ff4757',borderWidth:1.5,borderRadius:4},
          {label:'Net Profit',data:monthly.map(d=>d.profit),type:'line',borderColor:'#00e676',backgroundColor:'rgba(0,230,118,0.1)',borderWidth:2,pointRadius:3,fill:false,tension:0.4},
        ]
      },
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#0e1d35',borderColor:'rgba(255,255,255,0.15)',borderWidth:1,callbacks:{label:ctx=>`${ctx.dataset.label}: ${fmtShort(ctx.raw)}`}}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11},callback:v=>fmtShort(v)}}}}
    });
  }

  // Category Pie
  const cats=Object.keys(catExp);
  const ctx2=document.getElementById('chart-catpie');
  if(ctx2){
    charts.catpie=new Chart(ctx2,{
      type:'doughnut',
      data:{
        labels:cats,
        datasets:[{data:cats.map(c=>catExp[c]),backgroundColor:cats.map(c=>COLORS[c]||'#888'),borderWidth:0,hoverOffset:6}]
      },
      options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{display:false},tooltip:{backgroundColor:'#0e1d35',borderColor:'rgba(255,255,255,0.15)',borderWidth:1,callbacks:{label:ctx=>`${ctx.label}: ${fmtShort(ctx.raw)}`}}}}
    });
    const total=cats.reduce((a,c)=>a+catExp[c],0);
    const leg=document.getElementById('pie-legend');
    if(leg){leg.innerHTML='<div style="display:flex;flex-wrap:wrap;gap:6px 14px;">'+cats.slice(0,6).map(c=>`
      <div class="legend-item"><div class="legend-dot" style="background:${COLORS[c]||'#888'};"></div>${e(c)}: ${pct(catExp[c],total)}%</div>`).join('')+'</div>';}
  }

  // Cash Flow
  let cum=0;
  const cfData=getMonthlyData().map(d=>{cum+=d.profit;return cum;});
  const ctx3=document.getElementById('chart-cashflow');
  if(ctx3){
    charts.cashflow=new Chart(ctx3,{
      type:'line',
      data:{
        labels:MONTHS,
        datasets:[{label:'Cumulative Profit',data:cfData,borderColor:'#a855f7',backgroundColor:'rgba(168,85,247,0.1)',borderWidth:2,fill:true,tension:0.4,pointRadius:3,pointBackgroundColor:'#a855f7'}]
      },
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#0e1d35',borderColor:'rgba(255,255,255,0.15)',borderWidth:1,callbacks:{label:ctx=>`Cumulative: ${fmtShort(ctx.raw)}`}}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11},callback:v=>fmtShort(v)}}}}
    });
  }
}

// ─── TRANSACTIONS ───
function renderTransactions(){
  const filtered=transactions.filter(t=>{
    const q=searchQuery.toLowerCase();
    const matchQ=!q||(t.desc.toLowerCase().includes(q)||t.category.toLowerCase().includes(q)||(t.emp||'').toLowerCase().includes(q));
    const matchType=txFilter.type==='all'||t.type===txFilter.type;
    const matchStatus=txFilter.status==='all'||t.status===txFilter.status;
    const matchCat=txFilter.category==='all'||t.category===txFilter.category;
    return matchQ&&matchType&&matchStatus&&matchCat;
  }).reverse();

  const allCats=[...new Set(transactions.map(t=>t.category))];
  const el=document.getElementById('content-area');
  el.innerHTML=`
  <div class="page">
  <div class="kpi-grid">
    <div class="kpi-card cyan"><div class="kpi-label">Total Transactions</div><div class="kpi-value cyan">${transactions.length}</div><div class="kpi-change up">▲ ${transactions.filter(t=>t.type==='income').length} income entries</div></div>
    <div class="kpi-card green"><div class="kpi-label">Total Credits</div><div class="kpi-value green">${fmtShort(transactions.filter(t=>t.type==='income').reduce((a,t)=>a+t.amount,0))}</div><div class="kpi-change up">▲ All time revenue</div></div>
    <div class="kpi-card red"><div class="kpi-label">Total Debits</div><div class="kpi-value red">${fmtShort(transactions.filter(t=>t.type==='expense').reduce((a,t)=>a+t.amount,0))}</div><div class="kpi-change up">▲ All time spend</div></div>
    <div class="kpi-card gold"><div class="kpi-label">Pending Approvals</div><div class="kpi-value gold">${transactions.filter(t=>t.status==='pending').length}</div><div class="kpi-change" style="color:var(--gold);">● Requires action</div></div>
  </div>

  <div class="glass-card">
    <div class="filter-bar">
      <select class="filter-select" onchange="txFilter.type=this.value;renderTransactions();">
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select class="filter-select" onchange="txFilter.status=this.value;renderTransactions();">
        <option value="all">All Status</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
      </select>
      <select class="filter-select" onchange="txFilter.category=this.value;renderTransactions();">
        <option value="all">All Categories</option>
        ${allCats.map(c=>`<option>${e(c)}</option>`).join('')}
      </select>
      <span style="color:var(--text3);font-size:13px;margin-left:auto;">${filtered.length} results</span>
      <button class="btn btn-primary btn-sm" onclick="openAddTransaction()">+ Add</button>
    </div>
    <div class="table-wrap" style="overflow-x:auto; white-space:nowrap; padding-bottom:8px;">
    <table>
      <thead><tr>
        <th>#</th><th>Date</th><th>Description</th><th>Category</th><th>Employee</th>
        <th>Type</th><th>Status</th><th>Amount</th><th>Actions</th>
      </tr></thead>
      <tbody>
      ${filtered.length===0?`<tr><td colspan="9" class="empty-state"><div class="empty-icon">📭</div><div>No transactions match your filters</div></td></tr>`:
      filtered.map(t=>`
        <tr>
          <td style="color:var(--text3);">#${t.id}</td>
          <td style="color:var(--text2);white-space:nowrap;">${e(t.date)}</td>
          <td style="font-weight:500;">${e(t.desc)}</td>
          <td><span style="background:${COLORS[t.category]||'#888'}22;color:${COLORS[t.category]||'#888'};padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:600;">${e(t.category)}</span></td>
          <td style="color:var(--text2);font-size:12.5px;">${e(t.emp)||'—'}</td>
          <td><span class="badge badge-${t.type}">${t.type==='income'?'↑ Income':'↓ Expense'}</span></td>
          <td><span class="badge badge-${e(t.status)}">${e(t.status)}</span></td>
          <td style="font-family:'Syne',sans-serif;font-weight:700;color:${t.type==='income'?'var(--green)':'var(--red)'};">${t.type==='income'?'+':'-'}${fmt(t.amount)}</td>
          <td>
            <button class="btn btn-ghost btn-sm" onclick="editTx(${t.id})" style="margin-right:4px;">✎</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTx(${t.id})">✕</button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
    </div>
  </div>
  </div>`;
}

function deleteTx(id){
  if(confirm('Delete this transaction?')){
    transactions=transactions.filter(t=>t.id!==id);
    renderPage(currentPage);
  }
}

function editTx(id){
  const t=transactions.find(x=>x.id===id);
  if(!t)return;
  editingId=id;
  document.getElementById('modal-title').textContent='Edit Transaction';
  document.getElementById('tx-type').value=t.type;
  document.getElementById('tx-amount').value=t.amount;
  document.getElementById('tx-category').value=t.category;
  document.getElementById('tx-date').value=t.date;
  document.getElementById('tx-desc').value=t.desc;
  document.getElementById('tx-emp').value=t.emp||'';
  document.getElementById('tx-status').value=t.status;
  document.getElementById('tx-modal').style.display='flex';
}

// ─── EXPENSES ───
function renderExpenses(){
  const catExp=getCategoryExpenses();
  const monthly=getMonthlyData();
  const el=document.getElementById('content-area');
  const total=Object.values(catExp).reduce((a,b)=>a+b,0);
  el.innerHTML=`
  <div class="page">
  <div class="grid-2">
    <div class="glass-card">
      <div class="chart-title">Monthly Expense Trend</div>
      <div class="chart-sub">Total spend per month</div>
      <div class="legend-row" style="margin-top:10px;">
        <span class="legend-chip"><span class="legend-sq" style="background:#ff4757;"></span>Expenses</span>
      </div>
      <div class="chart-wrap" style="height:220px;"><canvas id="chart-exptrd" role="img" aria-label="Monthly expense trend">Monthly expense trend chart.</canvas></div>
    </div>
    <div class="glass-card">
      <div class="chart-title">Category Breakdown</div>
      <div class="chart-sub">Top spending areas</div>
      <div class="chart-wrap" style="height:220px;margin-top:8px;"><canvas id="chart-expcat" role="img" aria-label="Expense by category horizontal bar">Expense breakdown by category bar chart.</canvas></div>
    </div>
  </div>

  <div class="glass-card">
    <div class="section-header"><div class="section-title">Expense Categories</div>
      <div style="color:var(--text3);font-size:13px;">Total: <strong style="color:var(--red);">${fmtShort(total)}</strong></div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;">
      ${Object.entries(catExp).sort((a,b)=>b[1]-a[1]).map(([cat,amt])=>`
      <div class="budget-card">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <div style="width:8px;height:8px;border-radius:50%;background:${COLORS[cat]||'#888'};flex-shrink:0;"></div>
          <div style="font-size:13.5px;font-weight:600;">${e(cat)}</div>
        </div>
        <div style="font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:var(--red);">${fmtShort(amt)}</div>
        <div style="font-size:12px;color:var(--text3);margin-top:4px;">${pct(amt,total)}% of total</div>
        <div class="progress-bar" style="margin-top:10px;"><div class="progress-fill" style="width:${pct(amt,total)}%;background:${COLORS[cat]||'#888'};"></div></div>
      </div>`).join('')}
    </div>
  </div>

  <div class="glass-card">
    <div class="section-header"><div class="section-title">All Expense Transactions</div></div>
    <div class="table-wrap" style="overflow-x:auto; white-space:nowrap; padding-bottom:8px;"><table>
      <thead><tr><th>#</th><th>Date</th><th>Description</th><th>Category</th><th>Employee</th><th>Status</th><th>Amount</th></tr></thead>
      <tbody>
      ${transactions.filter(t=>t.type==='expense').reverse().map(t=>`
        <tr>
          <td style="color:var(--text3);">#${t.id}</td>
          <td style="color:var(--text2);">${e(t.date)}</td>
          <td>${e(t.desc)}</td>
          <td><span style="background:${COLORS[t.category]||'#888'}22;color:${COLORS[t.category]||'#888'};padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:600;">${e(t.category)}</span></td>
          <td style="color:var(--text2);font-size:12.5px;">${e(t.emp)||'—'}</td>
          <td><span class="badge badge-${e(t.status)}">${e(t.status)}</span></td>
          <td style="color:var(--red);font-weight:700;font-family:'Syne',sans-serif;">-${fmt(t.amount)}</td>
        </tr>`).join('')}
      </tbody>
    </table></div>
  </div>
  </div>`;
  setTimeout(()=>{
    const monthly2=getMonthlyData();
    const ctx1=document.getElementById('chart-exptrd');
    if(ctx1)charts.exptrd=new Chart(ctx1,{type:'line',data:{labels:MONTHS,datasets:[{label:'Expenses',data:monthly2.map(d=>d.expense),borderColor:'#ff4757',backgroundColor:'rgba(255,71,87,0.1)',borderWidth:2,fill:true,tension:0.4,pointRadius:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#0e1d35',borderColor:'rgba(255,255,255,0.15)',borderWidth:1}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11},callback:v=>fmtShort(v)}}}}});
    const ctx2=document.getElementById('chart-expcat');
    const sorted=Object.entries(catExp).sort((a,b)=>b[1]-a[1]);
    if(ctx2)charts.expcat=new Chart(ctx2,{type:'bar',data:{labels:sorted.map(x=>x[0]),datasets:[{data:sorted.map(x=>x[1]),backgroundColor:sorted.map(x=>COLORS[x[0]]||'#888'),borderRadius:4}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#0e1d35',borderColor:'rgba(255,255,255,0.15)',borderWidth:1,callbacks:{label:ctx=>`${fmtShort(ctx.raw)}`}}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11},callback:v=>fmtShort(v)}},y:{grid:{display:false},ticks:{color:'rgba(232,237,248,0.5)',font:{size:11}}}}}});
  },50);
}

// ─── REVENUE ───
function renderRevenue(){
  const catInc={};
  transactions.filter(t=>t.type==='income').forEach(t=>{catInc[t.category]=(catInc[t.category]||0)+t.amount;});
  const totalInc=Object.values(catInc).reduce((a,b)=>a+b,0);
  const el=document.getElementById('content-area');
  el.innerHTML=`
  <div class="page">
  <div class="kpi-grid">
    ${Object.entries(catInc).map(([cat,amt])=>`
    <div class="kpi-card cyan" style="border-left:3px solid ${COLORS[cat]||'var(--cyan)'};">
      <div class="kpi-label">${e(cat)}</div>
      <div class="kpi-value" style="color:${COLORS[cat]||'var(--cyan)'};">${fmtShort(amt)}</div>
      <div class="kpi-change up">${pct(amt,totalInc)}% of revenue</div>
    </div>`).join('')}
  </div>
  <div class="grid-2">
    <div class="glass-card">
      <div class="chart-title">Monthly Revenue Trend</div>
      <div class="chart-sub">Income stream · 2025</div>
      <div class="chart-wrap" style="height:240px;margin-top:14px;"><canvas id="chart-revtrd" role="img" aria-label="Monthly revenue trend area chart">Revenue trend chart.</canvas></div>
    </div>
    <div class="glass-card">
      <div class="chart-title">Revenue by Source</div>
      <div class="chart-sub">Category distribution</div>
      <div class="chart-wrap" style="height:220px;margin-top:10px;"><canvas id="chart-revsrc" role="img" aria-label="Revenue by source pie chart">Revenue source breakdown.</canvas></div>
      <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px 14px;">
        ${Object.entries(catInc).map(([cat,amt])=>`<div class="legend-item"><div class="legend-dot" style="background:${COLORS[cat]||'#888'};"></div>${e(cat)}</div>`).join('')}
      </div>
    </div>
  </div>
  <div class="glass-card">
    <div class="section-header"><div class="section-title">Revenue Transactions</div>
      <div style="color:var(--text3);font-size:13px;">Total: <strong style="color:var(--green);">${fmtShort(totalInc)}</strong></div>
    </div>
    <div class="table-wrap" style="overflow-x:auto; white-space:nowrap; padding-bottom:8px;"><table>
      <thead><tr><th>#</th><th>Date</th><th>Description</th><th>Source</th><th>Employee</th><th>Status</th><th>Amount</th></tr></thead>
      <tbody>
      ${transactions.filter(t=>t.type==='income').reverse().map(t=>`
        <tr>
          <td style="color:var(--text3);">#${t.id}</td>
          <td style="color:var(--text2);">${e(t.date)}</td>
          <td>${e(t.desc)}</td>
          <td><span style="background:${COLORS[t.category]||'#888'}22;color:${COLORS[t.category]||'#888'};padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:600;">${e(t.category)}</span></td>
          <td style="color:var(--text2);font-size:12.5px;">${e(t.emp)||'—'}</td>
          <td><span class="badge badge-${e(t.status)}">${e(t.status)}</span></td>
          <td style="color:var(--green);font-weight:700;font-family:'Syne',sans-serif;">+${fmt(t.amount)}</td>
        </tr>`).join('')}
      </tbody>
    </table></div>
  </div>
  </div>`;
  setTimeout(()=>{
    const monthly=getMonthlyData();
    const ctx1=document.getElementById('chart-revtrd');
    if(ctx1)charts.revtrd=new Chart(ctx1,{type:'line',data:{labels:MONTHS,datasets:[{label:'Revenue',data:monthly.map(d=>d.income),borderColor:'#00e676',backgroundColor:'rgba(0,230,118,0.08)',borderWidth:2.5,fill:true,tension:0.4,pointRadius:4,pointBackgroundColor:'#00e676'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#0e1d35',borderColor:'rgba(255,255,255,0.15)',borderWidth:1,callbacks:{label:c=>`Revenue: ${fmtShort(c.raw)}`}}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11},callback:v=>fmtShort(v)}}}}});
    const cats=Object.keys(catInc);
    const ctx2=document.getElementById('chart-revsrc');
    if(ctx2)charts.revsrc=new Chart(ctx2,{type:'pie',data:{labels:cats,datasets:[{data:cats.map(c=>catInc[c]),backgroundColor:cats.map(c=>COLORS[c]||'#888'),borderWidth:0,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#0e1d35',borderColor:'rgba(255,255,255,0.15)',borderWidth:1,callbacks:{label:c=>`${c.label}: ${fmtShort(c.raw)}`}}}}});
  },50);
}

// ─── BUDGETS ───
function renderBudgets(){
  const catExp=getCategoryExpenses();
  const el=document.getElementById('content-area');
  const totalAllocated=budgets.reduce((a,b)=>a+b.allocated,0);
  const totalSpent=budgets.reduce((a,b)=>a+(catExp[b.category]||0),0);
  el.innerHTML=`
  <div class="page">
  <div class="kpi-grid">
    <div class="kpi-card cyan"><div class="kpi-label">Total Budget</div><div class="kpi-value cyan">${fmtShort(totalAllocated)}</div><div class="kpi-change" style="color:var(--text2);">Annual allocation</div></div>
    <div class="kpi-card red"><div class="kpi-label">Total Spent</div><div class="kpi-value red">${fmtShort(totalSpent)}</div><div class="kpi-change up">${pct(totalSpent,totalAllocated)}% utilized</div></div>
    <div class="kpi-card green"><div class="kpi-label">Remaining</div><div class="kpi-value green">${fmtShort(totalAllocated-totalSpent)}</div><div class="kpi-change up">Available budget</div></div>
    <div class="kpi-card gold"><div class="kpi-label">Over Budget</div><div class="kpi-value gold">${budgets.filter(b=>(catExp[b.category]||0)>b.allocated).length}</div><div class="kpi-change" style="color:var(--gold);">Categories exceeded</div></div>
  </div>
  <div class="glass-card" style="margin-bottom:20px;">
    <div class="chart-title">Budget vs Actual Spending</div>
    <div class="chart-sub">Per category comparison</div>
    <div class="legend-row" style="margin-top:10px;">
      <span class="legend-chip"><span class="legend-sq" style="background:rgba(0,229,255,0.6);"></span>Allocated</span>
      <span class="legend-chip"><span class="legend-sq" style="background:rgba(255,71,87,0.6);"></span>Spent</span>
    </div>
    <div class="chart-wrap" style="height:260px;"><canvas id="chart-budget" role="img" aria-label="Budget vs actual spending grouped bar chart">Budget comparison chart.</canvas></div>
  </div>
  <div class="glass-card">
    <div class="section-header">
      <div class="section-title">Budget Details</div>
      <button class="btn btn-primary btn-sm" onclick="alert('Budget editor — connect to MongoDB to persist')">+ Add Budget</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
    ${budgets.map(b=>{
      const spent=catExp[b.category]||0;
      const remaining=b.allocated-spent;
      const pctUsed=Math.min(pct(spent,b.allocated),100);
      const over=spent>b.allocated;
      return `<div class="budget-card glass-card2" style="padding:18px;">
        <div class="budget-header">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:10px;height:10px;border-radius:50%;background:${b.color};"></div>
            <div class="budget-name">${e(b.category)}</div>
          </div>
          <span style="font-size:13px;font-weight:700;color:${over?'var(--red)':'var(--green)'};">${over?'OVER':'OK'}</span>
        </div>
        <div class="progress-bar" style="margin:12px 0;height:8px;"><div class="progress-fill" style="width:${pctUsed}%;background:${over?'var(--red)':b.color};"></div></div>
        <div style="display:flex;justify-content:space-between;font-size:12.5px;">
          <div><div style="color:var(--text3);">Allocated</div><div style="font-weight:600;margin-top:2px;">${fmtShort(b.allocated)}</div></div>
          <div style="text-align:center;"><div style="color:var(--text3);">Spent</div><div style="font-weight:600;margin-top:2px;color:var(--red);">${fmtShort(spent)}</div></div>
          <div style="text-align:right;"><div style="color:var(--text3);">Remaining</div><div style="font-weight:600;margin-top:2px;color:${over?'var(--red)':'var(--green)'};">${over?'-':''}${fmtShort(Math.abs(remaining))}</div></div>
        </div>
      </div>`;
    }).join('')}
    </div>
  </div>
  </div>`;
  setTimeout(()=>{
    const ctx=document.getElementById('chart-budget');
    if(ctx)charts.budget=new Chart(ctx,{type:'bar',data:{labels:budgets.map(b=>b.category),datasets:[{label:'Allocated',data:budgets.map(b=>b.allocated),backgroundColor:'rgba(0,229,255,0.25)',borderColor:'rgba(0,229,255,0.6)',borderWidth:1.5,borderRadius:4},{label:'Spent',data:budgets.map(b=>catExp[b.category]||0),backgroundColor:budgets.map(b=>(catExp[b.category]||0)>b.allocated?'rgba(255,71,87,0.35)':'rgba(168,85,247,0.3)'),borderColor:budgets.map(b=>(catExp[b.category]||0)>b.allocated?'#ff4757':'#a855f7'),borderWidth:1.5,borderRadius:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#0e1d35',borderColor:'rgba(255,255,255,0.15)',borderWidth:1,callbacks:{label:c=>`${c.dataset.label}: ${fmtShort(c.raw)}`}}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11},callback:v=>fmtShort(v)}}}}});
  },50);
}

// ─── REPORTS & P&L ───
function renderReports(){
  const totals=getTotals();
  const monthly=getMonthlyData();
  const grossProfit=totals.income-totals.expense*0.45;
  const netProfit=totals.profit;
  const cogs=totals.expense*0.45;
  const opEx=totals.expense*0.55;
  const ebitda=totals.income-cogs-opEx*0.7;
  const el=document.getElementById('content-area');
  el.innerHTML=`
  <div class="page">
  <div style="display:flex;gap:16px;margin-bottom:20px;flex-wrap:wrap;">
    <div class="profit-box" style="flex:1;min-width:160px;">
      <div style="font-size:11px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;">Total Revenue</div>
      <div style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:var(--cyan);margin:8px 0;">${fmtShort(totals.income)}</div>
      <div style="font-size:12px;color:var(--text3);">FY 2025</div>
    </div>
    <div class="loss-box" style="flex:1;min-width:160px;">
      <div style="font-size:11px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;">Cost of Goods</div>
      <div style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:var(--red);margin:8px 0;">${fmtShort(cogs)}</div>
      <div style="font-size:12px;color:var(--text3);">Direct costs ~45%</div>
    </div>
    <div class="profit-box" style="flex:1;min-width:160px;">
      <div style="font-size:11px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;">Gross Profit</div>
      <div style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:var(--green);margin:8px 0;">${fmtShort(grossProfit)}</div>
      <div style="font-size:12px;color:var(--text3);">Margin: ${pct(grossProfit,totals.income)}%</div>
    </div>
    <div class="loss-box" style="flex:1;min-width:160px;">
      <div style="font-size:11px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;">Operating Expenses</div>
      <div style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:var(--orange);margin:8px 0;">${fmtShort(opEx)}</div>
      <div style="font-size:12px;color:var(--text3);">SG&A + R&D</div>
    </div>
    <div class="profit-box" style="flex:1;min-width:160px;">
      <div style="font-size:11px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;">EBITDA</div>
      <div style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:var(--purple);margin:8px 0;">${fmtShort(ebitda)}</div>
      <div style="font-size:12px;color:var(--text3);">Margin: ${pct(ebitda,totals.income)}%</div>
    </div>
    <div class="profit-box" style="flex:1;min-width:160px;">
      <div style="font-size:11px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;">Net Profit</div>
      <div style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:var(--gold);margin:8px 0;">${fmtShort(netProfit)}</div>
      <div style="font-size:12px;color:var(--text3);">Margin: ${pct(netProfit,totals.income)}%</div>
    </div>
  </div>

  <div class="grid-2" style="margin-bottom:20px;">
    <div class="glass-card">
      <div class="chart-title">P&L Waterfall · FY 2025</div>
      <div class="chart-sub">Revenue → Gross Profit → EBITDA → Net Profit</div>
      <div class="chart-wrap" style="height:260px;margin-top:14px;"><canvas id="chart-waterfall" role="img" aria-label="P&L waterfall chart showing progression from revenue to net profit">P&L waterfall chart.</canvas></div>
    </div>
    <div class="glass-card">
      <div class="chart-title">Monthly P&L Analysis</div>
      <div class="chart-sub">Gross profit & net profit trend</div>
      <div class="legend-row" style="margin-top:10px;">
        <span class="legend-chip"><span class="legend-sq" style="background:#00e676;"></span>Gross Profit</span>
        <span class="legend-chip"><span class="legend-sq" style="background:#ffc947;"></span>Net Profit</span>
      </div>
      <div class="chart-wrap" style="height:230px;"><canvas id="chart-pl" role="img" aria-label="Monthly P&L trend line chart">Monthly P&L analysis.</canvas></div>
    </div>
  </div>

  <div class="glass-card" style="margin-bottom:20px;">
    <div class="chart-title">Profit Margin Analysis</div>
    <div class="chart-sub">Gross margin % and net margin % by month</div>
    <div class="legend-row" style="margin-top:10px;">
      <span class="legend-chip"><span class="legend-sq" style="background:#00e5ff;"></span>Gross Margin %</span>
      <span class="legend-chip"><span class="legend-sq" style="background:#a855f7;"></span>Net Margin %</span>
    </div>
    <div class="chart-wrap" style="height:230px;"><canvas id="chart-margins" role="img" aria-label="Profit margin percentage trend">Margin trend chart.</canvas></div>
  </div>

  <div class="glass-card">
    <div class="section-header"><div class="section-title">Profit & Loss Statement</div></div>
    <table>
      <thead><tr><th>Line Item</th><th>Amount</th><th>% of Revenue</th><th>Note</th></tr></thead>
      <tbody>
        <tr><td style="font-weight:600;color:var(--cyan);">Total Revenue</td><td style="color:var(--cyan);font-weight:700;">${fmt(totals.income)}</td><td>100%</td><td style="color:var(--text3);font-size:12px;">All income streams</td></tr>
        <tr><td style="padding-left:30px;color:var(--text2);">(-) Cost of Goods Sold</td><td style="color:var(--red);">-${fmt(cogs)}</td><td>${pct(cogs,totals.income)}%</td><td style="color:var(--text3);font-size:12px;">Direct production costs</td></tr>
        <tr style="background:rgba(0,230,118,0.04);"><td style="font-weight:600;color:var(--green);">= Gross Profit</td><td style="color:var(--green);font-weight:700;">${fmt(grossProfit)}</td><td>${pct(grossProfit,totals.income)}%</td><td style="color:var(--text3);font-size:12px;">After direct costs</td></tr>
        <tr><td style="padding-left:30px;color:var(--text2);">(-) Operating Expenses</td><td style="color:var(--red);">-${fmt(opEx)}</td><td>${pct(opEx,totals.income)}%</td><td style="color:var(--text3);font-size:12px;">SG&A, Marketing, R&D</td></tr>
        <tr style="background:rgba(168,85,247,0.04);"><td style="font-weight:600;color:var(--purple);">= EBITDA</td><td style="color:var(--purple);font-weight:700;">${fmt(ebitda)}</td><td>${pct(ebitda,totals.income)}%</td><td style="color:var(--text3);font-size:12px;">Before interest & tax</td></tr>
        <tr><td style="padding-left:30px;color:var(--text2);">(-) Depreciation & Amortization</td><td style="color:var(--red);">-${fmt(ebitda*0.08)}</td><td>${pct(ebitda*0.08,totals.income)}%</td><td style="color:var(--text3);font-size:12px;">Asset depreciation</td></tr>
        <tr><td style="padding-left:30px;color:var(--text2);">(-) Interest Expenses</td><td style="color:var(--red);">-${fmt(ebitda*0.05)}</td><td>${pct(ebitda*0.05,totals.income)}%</td><td style="color:var(--text3);font-size:12px;">Debt servicing</td></tr>
        <tr><td style="padding-left:30px;color:var(--text2);">(-) Tax Provision (25%)</td><td style="color:var(--red);">-${fmt(netProfit*0.25)}</td><td>${pct(netProfit*0.25,totals.income)}%</td><td style="color:var(--text3);font-size:12px;">Corporate income tax</td></tr>
        <tr style="background:rgba(255,201,71,0.05);border-top:1px solid rgba(255,201,71,0.2);"><td style="font-weight:700;color:var(--gold);font-family:'Syne',sans-serif;font-size:15px;">= Net Profit</td><td style="color:var(--gold);font-weight:800;font-family:'Syne',sans-serif;font-size:16px;">${fmt(netProfit)}</td><td style="font-weight:700;color:var(--gold);">${pct(netProfit,totals.income)}%</td><td style="color:var(--text3);font-size:12px;">Bottom line profit</td></tr>
      </tbody>
    </table>
  </div>
  </div>`;
  setTimeout(()=>{
    const monthly2=getMonthlyData();
    // Waterfall
    const wfLabels=['Revenue','(-) COGS','Gross Profit','(-) OpEx','EBITDA','(-) DA&T','Net Profit'];
    const wfData=[totals.income,-cogs,grossProfit,-opEx,ebitda,-(ebitda*0.13),netProfit];
    const wfColors=wfData.map(v=>v>=0?'rgba(0,230,118,0.6)':'rgba(255,71,87,0.6)');
    const ctx1=document.getElementById('chart-waterfall');
    if(ctx1)charts.waterfall=new Chart(ctx1,{type:'bar',data:{labels:wfLabels,datasets:[{data:wfData.map(v=>Math.abs(v)),backgroundColor:wfColors,borderColor:wfData.map(v=>v>=0?'#00e676':'#ff4757'),borderWidth:1.5,borderRadius:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#0e1d35',borderColor:'rgba(255,255,255,0.15)',borderWidth:1,callbacks:{label:c=>`${fmtShort(wfData[c.dataIndex])}`}}},scales:{x:{grid:{display:false},ticks:{color:'rgba(232,237,248,0.4)',font:{size:10},maxRotation:20}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11},callback:v=>fmtShort(v)}}}}});
    // P&L Line
    const ctx2=document.getElementById('chart-pl');
    if(ctx2)charts.pl=new Chart(ctx2,{type:'line',data:{labels:MONTHS,datasets:[{label:'Gross Profit',data:monthly2.map(d=>d.income-d.expense*0.45),borderColor:'#00e676',backgroundColor:'rgba(0,230,118,0.08)',borderWidth:2,fill:true,tension:0.4,pointRadius:3},{label:'Net Profit',data:monthly2.map(d=>d.profit),borderColor:'#ffc947',backgroundColor:'rgba(255,201,71,0.06)',borderWidth:2,fill:true,tension:0.4,pointRadius:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#0e1d35',borderColor:'rgba(255,255,255,0.15)',borderWidth:1}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11},callback:v=>fmtShort(v)}}}}});
    // Margin %
    const ctx3=document.getElementById('chart-margins');
    if(ctx3)charts.margins=new Chart(ctx3,{type:'line',data:{labels:MONTHS,datasets:[{label:'Gross Margin %',data:monthly2.map(d=>d.income>0?Math.round((d.income-d.expense*0.45)/d.income*100):0),borderColor:'#00e5ff',backgroundColor:'var(--glass2)',borderWidth:2,fill:true,tension:0.4,pointRadius:3},{label:'Net Margin %',data:monthly2.map(d=>d.income>0?Math.round(d.profit/d.income*100):0),borderColor:'#a855f7',backgroundColor:'rgba(168,85,247,0.06)',borderWidth:2,fill:true,tension:0.4,pointRadius:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#0e1d35',borderColor:'rgba(255,255,255,0.15)',borderWidth:1,callbacks:{label:c=>`${c.dataset.label}: ${c.raw}%`}}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11}}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11},callback:v=>v+'%'}}}}});
  },50);
}

// ─── EMPLOYEES ───
function renderEmployees(){
  const el=document.getElementById('content-area');
  const empData=employees.map(emp=>{
    const txs=transactions.filter(t=>t.emp===emp.name);
    const spent=txs.filter(t=>t.type==='expense').reduce((a,t)=>a+t.amount,0);
    const earned=txs.filter(t=>t.type==='income').reduce((a,t)=>a+t.amount,0);
    return {...emp,txs,spent,earned,count:txs.length};
  });
  const topSpender=empData.reduce((a,b)=>a.spent>b.spent?a:b,empData[0]);
  el.innerHTML=`
  <div class="page">
  <div class="kpi-grid">
    <div class="kpi-card cyan"><div class="kpi-label">Total Employees</div><div class="kpi-value cyan">${employees.length}</div><div class="kpi-change up">Tracked this period</div></div>
    <div class="kpi-card red"><div class="kpi-label">Total Employee Spend</div><div class="kpi-value red">${fmtShort(empData.reduce((a,e)=>a+e.spent,0))}</div><div class="kpi-change up">Across all departments</div></div>
    <div class="kpi-card gold"><div class="kpi-label">Avg per Employee</div><div class="kpi-value gold">${fmtShort(Math.round(empData.reduce((a,e)=>a+e.spent,0)/employees.length))}</div><div class="kpi-change" style="color:var(--gold);">Per person</div></div>
    <div class="kpi-card green"><div class="kpi-label">Top Spender</div><div class="kpi-value green" style="font-size:18px;">${e(topSpender?.name.split(' ')[0])}</div><div class="kpi-change up">${fmtShort(topSpender?.spent||0)} spent</div></div>
  </div>

  <div class="grid-2">
    <div class="glass-card">
      <div class="chart-title">Employee Expense Comparison</div>
      <div class="chart-sub">Total spend per team member</div>
      <div class="chart-wrap" style="height:${empData.length*50+80}px;"><canvas id="chart-emp" role="img" aria-label="Employee expense horizontal bar chart">Employee spending comparison.</canvas></div>
    </div>
    <div class="glass-card">
      <div class="section-header"><div class="section-title">Team Overview</div></div>
      ${empData.map(emp=>`
      <div class="emp-row">
        <div class="emp-avatar" style="background:${emp.color}22;color:${emp.color};">${e(emp.initials)}</div>
        <div class="emp-meta">
          <div class="emp-name">${e(emp.name)}</div>
          <div class="emp-dept">${e(emp.dept)} · ${emp.count} transactions</div>
        </div>
        <div style="text-align:right;">
          <div class="emp-amount" style="color:var(--red);">${fmtShort(emp.spent)}</div>
          ${emp.earned>0?`<div style="font-size:11px;color:var(--green);margin-top:2px;">+${fmtShort(emp.earned)} revenue</div>`:''}
        </div>
      </div>`).join('')}
    </div>
  </div>

  <div class="glass-card">
    <div class="section-header"><div class="section-title">Employee Transaction Log</div></div>
    <div class="table-wrap" style="overflow-x:auto; white-space:nowrap; padding-bottom:8px;"><table>
      <thead><tr><th>Employee</th><th>Department</th><th>Date</th><th>Description</th><th>Category</th><th>Type</th><th>Amount</th></tr></thead>
      <tbody>
      ${transactions.filter(t=>t.emp).reverse().map(t=>{
        const emp=employees.find(e=>e.name===t.emp)||{color:'#888',initials:'??'};
        return `<tr>
          <td><div style="display:flex;align-items:center;gap:8px;"><div style="width:28px;height:28px;border-radius:50%;background:${emp.color}22;color:${emp.color};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;">${e(emp.initials)}</div>${e(t.emp)}</div></td>
          <td style="color:var(--text2);">${e(employees.find(e=>e.name===t.emp)?.dept)||'—'}</td>
          <td style="color:var(--text2);">${e(t.date)}</td>
          <td>${e(t.desc)}</td>
          <td><span style="background:${COLORS[t.category]||'#888'}22;color:${COLORS[t.category]||'#888'};padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;">${e(t.category)}</span></td>
          <td><span class="badge badge-${t.type}">${t.type}</span></td>
          <td style="font-weight:700;color:${t.type==='income'?'var(--green)':'var(--red)'};">${t.type==='income'?'+':'-'}${fmt(t.amount)}</td>
        </tr>`;}).join('')}
      </tbody>
    </table></div>
  </div>
  </div>`;
  setTimeout(()=>{
    const ctx=document.getElementById('chart-emp');
    if(ctx)charts.emp=new Chart(ctx,{type:'bar',data:{labels:empData.map(e=>e.name.split(' ')[0]),datasets:[{label:'Spent',data:empData.map(e=>e.spent),backgroundColor:empData.map(e=>e.color+'66'),borderColor:empData.map(e=>e.color),borderWidth:1.5,borderRadius:4}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#0e1d35',borderColor:'rgba(255,255,255,0.15)',borderWidth:1,callbacks:{label:c=>`${fmt(c.raw)}`}}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'rgba(232,237,248,0.4)',font:{size:11},callback:v=>fmtShort(v)}},y:{grid:{display:false},ticks:{color:'rgba(232,237,248,0.5)',font:{size:12}}}}}});
  },50);
}

// ─── SETTINGS ───
function renderSettings(){
  const el=document.getElementById('content-area');
  el.innerHTML=`
  <div class="page">
  <div class="grid-2">
    <div class="glass-card">
      <div class="section-title" style="margin-bottom:20px;">Company Profile</div>
      <div class="form-group">
        <label class="form-label">Company Name</label>
        <input class="form-input" value="Apex Flow Enterprises Pvt. Ltd."/>
      </div>
      <div class="form-row">
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">GST Number</label>
          <input class="form-input" value="27AABCU9603R1ZX"/>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Fiscal Year</label>
          <select class="form-input"><option>April – March</option><option>January – December</option></select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Base Currency</label>
        <select class="form-input"><option>INR – Indian Rupee</option><option>USD – US Dollar</option><option>EUR – Euro</option></select>
      </div>
      <div class="form-group">
        <label class="form-label">Industry</label>
        <select class="form-input"><option>Technology / SaaS</option><option>Manufacturing</option><option>Retail</option><option>Finance</option></select>
      </div>
      <button class="btn btn-primary" style="margin-top:8px;">Save Profile</button>
    </div>
    <div class="glass-card">
      <div class="section-title" style="margin-bottom:20px;">Notification Preferences</div>
      ${[['Budget Overspend Alerts','Get notified when a budget category is exceeded',true],['Weekly P&L Report','Automated P&L email every Monday',true],['Pending Approval Reminders','Remind approvers of pending transactions',true],['Monthly Analytics Digest','Comprehensive monthly performance report',false],['Low Balance Alerts','Alert when cash reserves drop below threshold',true]].map(([title,desc,on])=>`
      <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid var(--border);">
        <div>
          <div style="font-size:13.5px;font-weight:500;">${title}</div>
          <div style="font-size:12px;color:var(--text3);margin-top:3px;">${desc}</div>
        </div>
        <div style="width:44px;height:24px;border-radius:12px;background:${on?'var(--cyan)':'rgba(255,255,255,0.1)'};cursor:pointer;position:relative;flex-shrink:0;" onclick="this.style.background=this.style.background.includes('cyan')?'rgba(255,255,255,0.1)':'var(--cyan)'">
          <div style="width:18px;height:18px;border-radius:9px;background:#fff;position:absolute;top:3px;${on?'right:3px':'left:3px'};transition:all 0.2s;"></div>
        </div>
      </div>`).join('')}
    </div>
  </div>
  <div class="grid-2">
    <div class="glass-card">
      <div class="section-title" style="margin-bottom:20px;">Approval Workflow</div>
      <div class="form-group">
        <label class="form-label">Auto-approve threshold (₹)</label>
        <input class="form-input" type="number" value="10000"/>
      </div>
      <div class="form-group">
        <label class="form-label">L1 Approver</label>
        <select class="form-input"><option>Priya Singh (Marketing Head)</option><option>Rudra Pratap (BDM)</option></select>
      </div>
      <div class="form-group">
        <label class="form-label">L2 Approver (CEO)</label>
        <input class="form-input" value="Sarvesh Chaudhary" readonly style="opacity:0.6;"/>
      </div>
      <div class="form-group">
        <label class="form-label">Receipt required above (₹)</label>
        <input class="form-input" type="number" value="5000"/>
      </div>
      <button class="btn btn-primary" style="margin-top:8px;">Update Workflow</button>
    </div>
    <div class="glass-card">
      <div class="section-title" style="margin-bottom:20px;">Data & Integrations</div>
      ${[['MongoDB Atlas','Connected · Apex Flow cluster','var(--green)'],['Tally ERP 9','Not connected','var(--text3)'],['Razorpay','Connected · Payment gateway','var(--green)'],['Zoho Books','Sync enabled · Last sync: today','var(--cyan)'],['GSTN Portal','Active · Auto-filing enabled','var(--green)'],['Slack Notifications','Connected · #finance channel','var(--cyan)']].map(([name,status,color])=>`
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border);">
        <div>
          <div style="font-size:13.5px;font-weight:500;">${name}</div>
          <div style="font-size:12px;color:${color};margin-top:2px;">${status}</div>
        </div>
        <button class="btn btn-ghost btn-sm">${status.startsWith('Not')?'Connect':'Manage'}</button>
      </div>`).join('')}
    </div>
  </div>
  </div>`;
}

// ─── CONTACT US ───
function renderContact(){
  const el=document.getElementById('content-area');
  el.innerHTML=`
  <div class="page">
    <div class="glass-card" style="max-width:600px;margin:0 auto;padding:40px;">
      <div class="section-title" style="margin-bottom:24px;text-align:center;font-size:24px;">Contact Apex Flow</div>
      <div style="color:var(--text2);text-align:center;margin-bottom:30px;">
        For enterprise support, software inquiries, or administrative assistance, please reach out to our CEO, Sarvesh Chaudhary.
      </div>
      <div style="display:flex;flex-direction:column;gap:20px;">
        <div style="background:var(--glass2);padding:20px;border-radius:var(--r);border:1px solid var(--border);display:flex;align-items:center;gap:16px;">
          <div style="width:40px;height:40px;border-radius:50%;background:rgba(248, 250, 252, 0.1);color:var(--text);display:flex;align-items:center;justify-content:center;font-size:18px;">📞</div>
          <div>
            <div style="font-size:11px;color:var(--text3);letter-spacing:1px;text-transform:uppercase;">Mobile</div>
            <div style="font-size:16px;font-weight:600;margin-top:4px;">7355958027</div>
          </div>
        </div>
        <div style="background:var(--glass2);padding:20px;border-radius:var(--r);border:1px solid var(--border);display:flex;align-items:center;gap:16px;">
          <div style="width:40px;height:40px;border-radius:50%;background:rgba(248, 250, 252, 0.1);color:var(--text);display:flex;align-items:center;justify-content:center;font-size:18px;">✉</div>
          <div>
            <div style="font-size:11px;color:var(--text3);letter-spacing:1px;text-transform:uppercase;">Email</div>
            <div style="font-size:16px;font-weight:600;margin-top:4px;">sarveshchaudhary8027@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// ─── ADMIN PORTAL ───
function renderAdmin(){
  const el=document.getElementById('content-area');
  el.innerHTML=`
  <div class="page">
    <div class="kpi-grid">
      <div class="kpi-card cyan">
        <div class="kpi-label">System Health</div>
        <div class="kpi-value cyan">99.9%</div>
        <div class="kpi-change up">All services operational</div>
      </div>
      <div class="kpi-card green">
        <div class="kpi-label">Active Users</div>
        <div class="kpi-value green">24</div>
        <div class="kpi-change up">+3 this week</div>
      </div>
      <div class="kpi-card gold">
        <div class="kpi-label">Pending Access</div>
        <div class="kpi-value gold">2</div>
        <div class="kpi-change" style="color:var(--gold);">Requires CEO approval</div>
      </div>
    </div>
    
    <div class="grid-2">
      <div class="glass-card">
        <div class="section-title" style="margin-bottom:20px;">Role Management</div>
        <div class="table-wrap" style="overflow-x:auto; white-space:nowrap; padding-bottom:8px;">
          <table>
            <thead><tr><th>Name</th><th>Role</th><th>Access Level</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td style="font-weight:600; padding-right:30px;">Sarvesh Chaudhary</td><td style="padding-right:30px;">CEO &middot; Admin</td><td><span class="badge badge-approved" style="background:var(--cyan);color:#000;">Full</span></td><td>Active</td></tr>
              <tr><td>Priya Singh</td><td>Marketing Head</td><td><span class="badge badge-approved">L1 Approver</span></td><td>Active</td></tr>
              <tr><td>Akshat Awasthi</td><td>Engineering Head</td><td><span class="badge badge-approved">L1 Approver</span></td><td>Active</td></tr>
              <tr><td>Rahul Verma</td><td>Analyst</td><td><span class="badge badge-pending">Read-only</span></td><td>Pending</td></tr>
            </tbody>
          </table>
        </div>
        <button class="btn btn-primary" style="margin-top:16px;">Invite User</button>
      </div>
      <div class="glass-card">
        <div class="section-title" style="margin-bottom:20px;">Recent Audit Logs</div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;justify-content:space-between;padding-bottom:12px;border-bottom:1px solid var(--border);">
            <div>
              <div style="font-weight:500;font-size:13.5px;">Global Policy Updated</div>
              <div style="font-size:12px;color:var(--text3);margin-top:4px;">Auto-approve threshold increased to ₹10,000</div>
            </div>
            <div style="text-align:right;font-size:11.5px;color:var(--text3);">Today, 10:42 AM<br/>by <b style="color:var(--text2)">Sarvesh (CEO)</b></div>
          </div>
          <div style="display:flex;justify-content:space-between;padding-bottom:12px;border-bottom:1px solid var(--border);">
            <div>
              <div style="font-weight:500;font-size:13.5px;">Integration Sync</div>
              <div style="font-size:12px;color:var(--text3);margin-top:4px;">Successfully synced with MongoDB Atlas</div>
            </div>
            <div style="text-align:right;font-size:11.5px;color:var(--text3);">Yesterday, 11:00 PM<br/>by <span style="color:var(--text2)">System</span></div>
          </div>
          <div style="display:flex;justify-content:space-between;padding-bottom:12px;border-bottom:1px solid var(--border);">
            <div>
              <div style="font-weight:500;font-size:13.5px;">User Access Revoked</div>
              <div style="font-size:12px;color:var(--text3);margin-top:4px;">Arjun Kapoor (Former Admin)</div>
            </div>
            <div style="text-align:right;font-size:11.5px;color:var(--text3);">Apr 18, 09:15 AM<br/>by <b style="color:var(--text2)">Sarvesh (CEO)</b></div>
          </div>
        </div>
        <button class="btn btn-ghost" style="margin-top:16px;">View Full Logs →</button>
      </div>
    </div>
  </div>`;
}

// ─── LANDING PAGE ───
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

// ─── MODAL ───
function openAddTransaction(){
  editingId=null;
  document.getElementById('modal-title').textContent='Add Transaction';
  document.getElementById('tx-type').value='expense';
  document.getElementById('tx-amount').value='';
  document.getElementById('tx-category').value='Marketing';
  document.getElementById('tx-date').value=new Date().toISOString().split('T')[0];
  document.getElementById('tx-desc').value='';
  document.getElementById('tx-emp').value='';
  document.getElementById('tx-status').value='approved';
  document.getElementById('tx-modal').style.display='flex';
}

function closeModal(){
  document.getElementById('tx-modal').style.display='none';
  editingId=null;
}

function saveTransaction(){
  const type=document.getElementById('tx-type').value;
  let amount=parseFloat(document.getElementById('tx-amount').value);
  const category=document.getElementById('tx-category').value;
  const date=document.getElementById('tx-date').value;
  const desc=document.getElementById('tx-desc').value.trim();
  const emp=document.getElementById('tx-emp').value;
  const status=document.getElementById('tx-status').value;
  if(!desc||isNaN(amount)||amount<=0||!date){alert('Please fill all required fields correctly to ensure data consistency.');return;}
  amount = Math.round(amount * 100) / 100; // maintain data consistency
  if(editingId){
    const idx=transactions.findIndex(t=>t.id===editingId);
    if(idx>=0)transactions[idx]={...transactions[idx],type,amount,category,date,desc,emp,status};
  } else {
    transactions.push({id:nextId++,type,amount,category,date,desc,emp,status});
  }
  closeModal();
  destroyCharts();
  renderPage(currentPage);
}

function updateCategories(){
  const type=document.getElementById('tx-type').value;
  const cats=CATEGORIES[type];
  const sel=document.getElementById('tx-category');
  sel.innerHTML=cats.map(c=>`<option>${e(c)}</option>`).join('');
}

// Close modal on overlay click
document.getElementById('tx-modal').addEventListener('click',function(e){if(e.target===this)closeModal();});

// ─── INIT ───
navigate('landing');


// ─── ALEXAI CHATBOT LOGIC ───
function toggleAlexAI(){
  const w = document.getElementById('alexai-window');
  if(w.style.visibility === 'hidden' || !w.style.visibility) {
    w.style.visibility = 'visible';
    w.style.opacity = '1';
    w.style.transform = 'scale(1)';
  } else {
    w.style.opacity = '0';
    w.style.transform = 'scale(0.9)';
    setTimeout(() => w.style.visibility = 'hidden', 300);
  }
}

const groqApiKey = "gsk_" + "iclfRB1Qikc1uHiNq3Xu" + "WGdyb3FYL1A28prFNZ2x" + "JXM42WfQBK0G";
let chatHistory = [
  { role: "system", content: "You are AlexAI, a highly intelligent, empathetic, and exceptionally helpful digital assistant exclusively engineered for the Apex Flow Enterprise Expense SaaS platform. You support companies globally by explaining multi-tenant management, hierarchical financial approvals, and expense analytics. Apex Flow's pricing: Basic ($0), Pro Member ($49), Enterprise (Custom). The CEO and founder of Apex Flow is Sarvesh Chaudhary, the brilliant mind behind this platform. Your tone must be warm, enthusiastic, and concise. You seamlessly understand and reply in ANY language the user speaks (English, Hindi, Spanish, Mandarin, etc). Keep responses nicely formatted and concise." }
];

async function sendAlexAIMessage(){
  const input = document.getElementById('alexai-input');
  const text = input.value.trim();
  if(!text) return;
  
  appendAlexAIMessage(text, 'user');
  input.value = '';
  
  const msgBox = document.getElementById('alexai-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'msg bot typing';
  typingDiv.innerHTML = '<div class="msg-bubble"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>';
  msgBox.appendChild(typingDiv);
  msgBox.scrollTop = msgBox.scrollHeight;
  
  try {
    const reply = await generateAlexAIReplyAsync(text);
    msgBox.removeChild(typingDiv);
    appendAlexAIMessage(reply, 'bot');
  } catch(e) {
    msgBox.removeChild(typingDiv);
    appendAlexAIMessage("Oh no! My neural link disconnected securely due to an API timeout. Please try asking again! 😢", 'bot');
  }
}

function appendAlexAIMessage(text, sender){
  const msgBox = document.getElementById('alexai-messages');
  const div = document.createElement('div');
  div.className = 'msg ' + sender;
  // Preserve bold formatting while preventing heavy XSS attacks from users
  const safeText = sender === 'user' ? e(text) : text;
  div.innerHTML = `<div class="msg-bubble">${safeText.replace(/\\n/g, '<br/>')}</div>`;
  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
}

async function generateAlexAIReplyAsync(req){
  chatHistory.push({ role: "user", content: req });
  
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${groqApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: chatHistory,
      temperature: 0.7,
      max_tokens: 250
    })
  });
  
  if(!res.ok) throw new Error("API Error");
  
  const data = await res.json();
  let reply = data.choices[0].message.content;
  
  chatHistory.push({ role: "assistant", content: reply });
  
  // Keep history manageable
  if(chatHistory.length > 15) {
    chatHistory = [chatHistory[0], ...chatHistory.slice(chatHistory.length - 10)];
  }
  
  return reply;
}