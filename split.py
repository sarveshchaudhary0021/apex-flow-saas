import os

with open("enterprise_expense_management_saas.html", "r", encoding="utf-8") as f:
    html = f.read()

# EXTRACT CSS
css_start = html.find("<style>") + len("<style>")
css_end = html.find("</style>")
css_content = html[css_start:css_end].strip()

# Create style.css
with open("style.css", "w", encoding="utf-8") as f:
    f.write(css_content)

# EXTRACT JS
js_start = html.rfind("<script>\n") + len("<script>\n")
js_end = html.rfind("</script>\n</body>")
js_content = html[js_start:js_end].strip()

# Create script.js
with open("script.js", "w", encoding="utf-8") as f:
    f.write(js_content)

# BUILD NEW HTML
html_new = html[:html.find("<style>")] + '<link rel="stylesheet" href="style.css">\n' + html[css_end+len("</style>"):html.rfind("<script>\n")] + '<script src="script.js"></script>\n' + html[js_end+len("</script>\n"):]

# Write new HTML
with open("enterprise_expense_management_saas.html", "w", encoding="utf-8") as f:
    f.write(html_new)
