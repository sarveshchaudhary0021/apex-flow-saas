import re

with open("enterprise_expense_management_saas.html", "r", encoding="utf-8") as f:
    text = f.read()

# Replace names across the entire file mapping:
mapping = {
    "Priya Sharma": "Priya Singh",
    "Rahul Mehta": "Rudra Pratap",
    "Sneha Patel": "Udit Singh",
    "Vikram Singh": "Akshat Awasthi",
    "Ananya Roy": "Meenakhi Neolia",
    "Karan Joshi": "Parul Mishra"
}

for old_name, new_name in mapping.items():
    text = text.replace(old_name, new_name)

# Add the rest of the options in the select dropdown
new_options = """<option>Priya Singh</option><option>Rudra Pratap</option><option>Udit Singh</option>
          <option>Akshat Awasthi</option><option>Meenakhi Neolia</option><option>Parul Mishra</option>
          <option>Astitwamay Mishra</option><option>Aditya Pratap</option><option>Ansh Pandey</option>
          <option>Aditya Tripathi</option><option>Aditya Pandey</option>"""

# Using regex to find the block
text = re.sub(r'<option>Priya Singh</option>.*?<option>Parul Mishra</option>', new_options, text, flags=re.DOTALL)

new_employees = """let employees = [
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
];"""

text = re.sub(r"let employees = \[.*?\];", new_employees, text, flags=re.DOTALL)

with open("enterprise_expense_management_saas.html", "w", encoding="utf-8") as f:
    f.write(text)
