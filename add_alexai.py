import re

# 1. Update style.css
with open("style.css", "a", encoding="utf-8") as f:
    f.write("""
/* ALEXAI WIDGET */
#alexai-widget {
  position:fixed;bottom:24px;right:24px;z-index:9999;font-family:'DM Sans',sans-serif;
}
#alexai-btn {
  width:60px;height:60px;border-radius:50%;position:absolute;bottom:0;right:0;
  display:flex;align-items:center;justify-content:center;font-size:28px;
  background:var(--cyan);border:none;cursor:pointer;
  box-shadow:0 8px 24px rgba(0,229,255,0.3);transition:transform 0.2s,box-shadow 0.2s;
}
#alexai-btn:hover {
  transform:translateY(-2px);box-shadow:0 12px 30px rgba(0,229,255,0.4);
}
#alexai-window {
  position:absolute;bottom:80px;right:0;width:380px;height:520px;
  background:var(--bg2);border:1px solid var(--border);border-radius:16px;
  box-shadow:0 12px 40px rgba(0,0,0,0.5);display:flex;flex-direction:column;
  overflow:hidden;transform-origin:bottom right;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.msg{display:flex;max-width:85%;}
.msg.bot{align-self:flex-start;}
.msg.user{align-self:flex-end;}
.msg-bubble{padding:12px 16px;font-size:13.5px;line-height:1.5;}
.msg.bot .msg-bubble{background:var(--glass2);border:1px solid var(--border);border-radius:16px 16px 16px 4px;color:var(--text);}
.msg.user .msg-bubble{background:var(--cyan);color:#000;border-radius:16px 16px 4px 16px;font-weight:600;}
.typing-indicator{display:flex;gap:4px;padding:4px 8px;}
.typing-dot{width:6px;height:6px;background:var(--text2);border-radius:50%;animation:typing 1.4s infinite ease-in-out both;}
.typing-dot:nth-child(1){animation-delay:-0.32s;}
.typing-dot:nth-child(2){animation-delay:-0.16s;}
@keyframes typing{0%,80%,100%{transform:scale(0);} 40%{transform:scale(1);}}
""")

# 2. Update HTML
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

alexai_html = """
<!-- ALEXAI WIDGET -->
<div id="alexai-widget">
  <button id="alexai-btn" onclick="toggleAlexAI()">✨</button>
  <div id="alexai-window" style="opacity:0; transform:scale(0.9); visibility:hidden;">
    <div style="background:linear-gradient(135deg,var(--cyan),var(--purple));padding:16px 20px;display:flex;justify-content:space-between;align-items:center;">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:40px;height:40px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;">🤖</div>
        <div>
          <div style="font-weight:800;color:#000;font-size:16px;letter-spacing:0.5px;">AlexAI</div>
          <div style="font-size:12px;color:rgba(0,0,0,0.8);font-weight:600;">Apex Flow Assistant</div>
        </div>
      </div>
      <button class="btn btn-ghost" style="color:#000;border:none;padding:4px;background:transparent;font-size:20px;" onclick="toggleAlexAI()">✕</button>
    </div>
    
    <div id="alexai-messages" style="flex:1;padding:20px;overflow-y:auto;display:flex;flex-direction:column;gap:16px;background:var(--bg);">
      <div class="msg bot">
        <div class="msg-bubble">Hi there! 👋 I'm <b>AlexAI</b>. I'm your global Apex Flow enterprise assistant.<br/><br/>How can I help you manage your cash flows today? <i>(और बताइए, मैं आपकी कैसे मदद कर सकता हूँ?)</i></div>
      </div>
    </div>
    
    <div style="padding:16px;border-top:1px solid var(--border);background:var(--bg2);display:flex;gap:10px;align-items:center;">
      <input type="text" id="alexai-input" class="form-input" placeholder="Ask AlexAI a question..." style="flex:1;border-radius:20px;background:var(--bg);height:42px;padding:0 16px;" onkeypress="if(event.key==='Enter')sendAlexAIMessage()"/>
      <button class="btn btn-primary" style="border-radius:50%;width:42px;height:42px;padding:0;display:flex;align-items:center;justify-content:center;background:var(--cyan);color:#000;border:none;" onclick="sendAlexAIMessage()">🚀</button>
    </div>
  </div>
</div>
"""

html = html.replace('</body>', alexai_html + '\n</body>')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)


# 3. Update JS Logic
with open("script.js", "r", encoding="utf-8") as f:
    js = f.read()

alexai_js = """
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

function sendAlexAIMessage(){
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
  
  setTimeout(() => {
    msgBox.removeChild(typingDiv);
    const reply = generateAlexAIReply(text);
    appendAlexAIMessage(reply, 'bot');
  }, 1000 + Math.random() * 800);
}

function appendAlexAIMessage(text, sender){
  const msgBox = document.getElementById('alexai-messages');
  const div = document.createElement('div');
  div.className = 'msg ' + sender;
  const safeText = sender === 'user' ? e(text) : text;
  div.innerHTML = `<div class="msg-bubble">${safeText.replace(/\\n/g, '<br/>')}</div>`;
  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
}

function generateAlexAIReply(req){
  const text = req.toLowerCase();
  
  // Greetings / Regional Languages
  if(text.includes('hello')||text.includes('hi ')||text.includes('hey')) return "Hello! I'm AlexAI. How can I assist you with Apex Flow today? ✨";
  if(text.includes('namaste')||text.includes('hindi')||text.includes('kaise ho')) return "नमस्ते! मैं AlexAI हूँ। मैं Apex Flow में आपकी कैसे सहायता कर सकता हूँ? (Hello! I'm AlexAI. How can I help you?)";
  if(text.includes('hola')||text.includes('como')) return "¡Hola! Soy AlexAI, tu asistente financiero. ¿En qué te puedo ayudar hoy? 🇪🇸";
  if(text.includes('bonjour')||text.includes('salut')) return "Bonjour! Je suis AlexAI. Comment puis-je vous aider avec vos dépenses aujourd'hui? 🇫🇷";
  if(text.includes('nǐ hǎo')||text.includes('ni hao')||text.includes('chinese')) return "你好! 我是 AlexAI. (Hello! I am AlexAI.) How can I help? 🇨🇳";
  
  // FAQs
  if(text.includes('pricing')||text.includes('cost')||text.includes('plan')) return "We offer three plans: <b>Basic</b> ($0/mo), <b>Pro</b> ($49/mo/user), and <b>Enterprise</b> (Custom). The Pro plan uniquely unlocks AI Scanning and Webhooks! Would you like me to take you to the Pricing page?";
  if(text.includes('multi')||text.includes('business')||text.includes('multiple')) return "Yes! Our Enterprise tier perfectly supports multi-tenant accounts, allowing you to manage multiple business identities and subsidiaries under a single Apex Flow dashboard.";
  if(text.includes('gst')||text.includes('tax')) return "With a Pro subscription, Apex Flow seamlessly handles GST calculations and syncs all tax compliance directly to your external systems like Tally.";
  if(text.includes('approval')||text.includes('hierarchy')||text.includes('manager')) return "Apex Flow features dynamic L1 & L2 hierarchical approvals. Once a budget threshold is exceeded, I will automatically route the expense to the relevant manager!";
  if(text.includes('secure')||text.includes('security')||text.includes('safe')) return "Apex Flow employs 256-bit AES encryption across all API transactions. We also enforce absolute protection against XSS and CSRF threats.";
  
  // Features / General
  if(text.includes('expense')||text.includes('transaction')) return "You can easily add new expenses by clicking <b>+ Add Transaction</b> on the top bar! The system categorizes it automatically.";
  if(text.includes('report')||text.includes('analytics')) return "Our Analytics tab gives you deep insights. We leverage real-time charts to visualize P&L statements, burn rates, and department budgets.";
  if(text.includes('who are you')||text.includes('name')) return "I am <b>AlexAI</b>! 🌟 The friendly digital assistant built straight into Apex Flow to save you time and powerfully manage your finances.";
  
  // Custom Interaction
  if(text.includes('good')||text.includes('great')||text.includes('awesome')) return "Thank you! I strive to be as friendly and helpful as possible. 😊";
  if(text.includes('sarvesh')) return "Sarvesh Chaudhary is our visionary CEO & Admin! He actively develops Apex Flow to empower global businesses.";

  // Default intelligent fallback
  return "That's an excellent question! As AlexAI, I'm constantly learning new regional and operational contexts. While I don't have the exact answer right now, our Enterprise Support headed by Sarvesh Chaudhary can definitely help. You can easily reach out via the 'Contact Us' page. 🤝";
}
"""

js = js + "\n\n" + alexai_js

with open("script.js", "w", encoding="utf-8") as f:
    f.write(js)
