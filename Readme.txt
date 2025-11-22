📅 Task Calendar — React + Vite + Firebase

A modern, cloud-synced Task Manager with Google Authentication, per-day habit tracking, and real-time productivity graphs.

🚀 Live Demo

Hosted on Vercel:
(Add your deployed URL here)
👉 https://to-do-app-iota-beryl.vercel.app/

✨ Features
🔐 Google Authentication

Secure login using Firebase Authentication

User-specific cloud data

Auto-redirect on login/logout

🗓️ Cloud-Synced Calendar

Add/remove daily repeating tasks

Checkboxes for each date of the month

Auto-save to Firestore

Checkboxes persist after page refresh

Month navigation (Previous/Next)

📊 Real-Time Productivity Graph

Calculates daily completion score

Updates instantly when tasks/checkboxes change

Smooth SVG graph with hover tooltips

Purple-blue gradient line

📁 Firestore Cloud Storage

Tasks stored at:

users/{uid}/months/{YYYY-MM}/tasks/{taskId}


Each task contains:

{
  title: "...",
  checks: {
    "01": true,
    "02": false
  }
}

🎨 Clean, Modern UI

Black-Purple premium dark theme

Responsive layout

Sticky sidebar

Smooth animations

Built with plain CSS (no Tailwind)

🏗️ Tech Stack

React (Vite)

Firebase Authentication

Firebase Firestore

Vercel Deployment

Plain CSS

Modern React Hooks (useState, useEffect, useMemo)

📦 Folder Structure
task-calender/
│
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── CalendarGrid.jsx
│   │   └── ProgressGraph.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── utils/
│   │   └── dateUtils.js
│   ├── App.jsx
│   ├── firebase.js
│   ├── index.css
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md

🔧 Installation & Setup
1️⃣ Clone the repo
git clone https://github.com/Shubhang0802/To-Do-App.git
cd task-calender

2️⃣ Install dependencies
npm install

3️⃣ Create .env (use .env.example template)
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx

4️⃣ Start development server
npm run dev

🔥 Firebase Setup
Enable Services:

Authentication → Google Sign-in

Firestore Database (start in test mode)

Add Authorized Domains:

localhost

localhost:5173

127.0.0.1

your-vercel-domain.vercel.app

🚀 Deployment (Vercel)
1️⃣ Push to GitHub
2️⃣ Import repo into Vercel
3️⃣ Set “Root Directory” to:
task-calender

4️⃣ Add Environment Variables (Production)
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx

5️⃣ Deploy

Vercel will auto-build the Vite app.

🧪 Features Checklist

✔ Login with Google
✔ Month navigation
✔ Add/remove tasks
✔ Persistent checkbox states
✔ Real-time Firestore sync
✔ Real-time graph updates
✔ Responsive layout
✔ Dark theme
✔ Deployed to Vercel

🛠️ Future Improvements

Dark/Light mode toggle

Export monthly report

Push notifications

Team task sharing

📝 License

MIT License — free for personal & commercial use.
