📬 Gmail → SMS Relay via Google Voice
A neon-styled Google Apps Script that monitors your Gmail for Google Voice messages and forwards them to your phone via email-to-SMS—without OAuth, servers, or third-party services.

Created by Dhruv Gowda. ⚡️

🚀 Features
🔎 Scans Gmail for Google Voice texts (label:GV-SMS)

📨 Extracts and forwards only the message content

📱 Sends messages via carrier email gateway (e.g. 1234567890@vtext.com)

💾 Saves your number & carrier in Google Apps Script storage

👋 Built-in opt-out and manual forwarding

💡 Stylized UI with a typewriter badge, corner watermark (C09), and neon vibes

⚙️ Setup
Create a Google Apps Script

New project → paste in Code.gs and index.html

Deploy as Web App

Deploy → New deployment → Web App

Set access to Anyone or Anyone with Google account

Copy the public link

Set up Gmail

Create a Gmail filter:

Matches: "New text message from"

Apply label: GV-SMS

Set time-based trigger

In Apps Script Editor: Triggers → Add new → checkNewGVText() every 1 min

💻 Local Wrapper (optional)
You can embed the hosted script with an iframe by deploying this site to Vercel:

html
<iframe src="https://YOUR_SCRIPT_DEPLOYMENT_LINK" style="width:100%;height:100vh;border:none;"></iframe>
Add a vercel.json:

json
{
  "rewrites": [
    { "source": "/", "destination": "/index.html" }
  ]
}
🧠 How It Works
Labels incoming GV emails

Parses message text after "Google Voice"

Detects senders like "New text message from 555-123" or "from 62642"

Formats and forwards: Forwarded by C09 by DG8AB:\n{message}

Marks messages as read to avoid duplicates

🙌 Thanks
Open source, clean, and visually slick. Built for simplicity and extensibility.

You want to build neon web utilities on Google infra with no backend? Dhruv did.
