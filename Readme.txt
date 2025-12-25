📅 Task Calendar — React + Vite + Firebase

A modern, cloud-synced task management application built with React + Vite and Firebase. 
Track your monthly tasks and manage daily to-dos with real-time synchronization.

================================================================================
🚀 LIVE DEMO
================================================================================

Hosted on Vercel:
👉 https://to-do-app-iota-beryl.vercel.app/

================================================================================
✨ FEATURES
================================================================================

📅 MONTHLY TASK TRACKING
━━━━━━━━━━━━━━━━━━━━━━
• Create and manage tasks for the entire month
• Calendar grid view showing all days
• Check off tasks as you complete them for each day
• Visual progress graph showing completion rate
• Real-time synchronization across devices

🗓️ DAILY TASKS (NEW!)
━━━━━━━━━━━━━━━━━━━━━
• Dedicated page for managing daily to-dos
• Select any date and add specific tasks
• Mark tasks as complete with checkboxes
• Sidebar-based UI for easy navigation
• Tasks organized by day with month/year navigation

🔐 GOOGLE AUTHENTICATION
━━━━━━━━━━━━━━━━━━━━━━━━
• Secure login using Firebase Authentication
• User-specific cloud data isolation
• Auto-redirect on login/logout

🎨 MODERN UI/UX
━━━━━━━━━━━━━━━
• Dark mode with purple gradient accents
• Smooth animations and transitions
• Responsive design for all screen sizes
• Premium glassmorphism effects
• Intuitive navigation

================================================================================
🛠️ TECH STACK
================================================================================

Frontend:        React 19.2.0 (Vite 7.2.4)
Routing:         React Router DOM 7.1.3
Authentication:  Firebase Auth (Google)
Database:        Firebase Firestore
Styling:         Vanilla CSS with CSS Variables
Fonts:           Google Fonts (Inter)
Deployment:      Vercel

================================================================================
📁 PROJECT STRUCTURE
================================================================================

To-Do-App/task-calender/
│
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Main sidebar with tasks list
│   │   ├── CalendarGrid.jsx      # Monthly calendar grid
│   │   └── ProgressGraph.jsx     # Visual progress chart
│   │
│   ├── pages/
│   │   └── DailyTasks.jsx        # Daily tasks page (NEW!)
│   │
│   ├── context/
│   │   └── AuthContext.jsx       # Firebase authentication
│   │
│   ├── utils/
│   │   └── dateUtils.js          # Date helper functions
│   │
│   ├── App.jsx                   # Main app with routing
│   ├── firebase.js               # Firebase config
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Entry point
│
├── package.json
└── vite.config.js

================================================================================
🔧 INSTALLATION & SETUP
================================================================================

1️⃣ CLONE THE REPOSITORY
   git clone https://github.com/Shubhang0802/To-Do-App.git
   cd To-Do-App/task-calender

2️⃣ INSTALL DEPENDENCIES
   npm install

3️⃣ FIREBASE CONFIGURATION
   Already configured in src/firebase.js:
   {
     apiKey: "AIzaSyANNhveiZXeh84h88PNjXPma-HyEpRRUhA",
     authDomain: "task-calender-57dad.firebaseapp.com",
     projectId: "task-calender-57dad",
     storageBucket: "task-calender-57dad.firebasestorage.app",
     messagingSenderId: "776111971364",
     appId: "1:776111971364:web:73a83a889a378513660cb1"
   }

4️⃣ FIRESTORE SECURITY RULES (CRITICAL!)
   
   ⚠️ MUST ADD IN FIREBASE CONSOLE:
   Firebase Console → Firestore Database → Rules
   
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {

       // Main tasks rule
       match /users/{userId}/months/{monthId}/tasks/{taskId} {
         allow read, write: if request.auth != null
           && request.auth.uid == userId;
       }

       // Daily tasks rule (BEFORE catch-all)
       match /users/{userId}/months/{monthId}/dailyTasks/{dayId}/tasks/{taskId} {
         allow read, write: if request.auth != null 
           && request.auth.uid == userId;
       }

       // Catch-all deny (LAST)
       match /{document=**} {
         allow read, write: if false;
       }
     }
   }

5️⃣ START DEVELOPMENT SERVER
   npm run dev

6️⃣ OPEN BROWSER
   http://localhost:5173/

================================================================================
🔥 FIREBASE SETUP
================================================================================

ENABLE SERVICES:
• Authentication → Google Sign-in
• Firestore Database (production mode)

ADD AUTHORIZED DOMAINS:
• localhost
• localhost:5173
• 127.0.0.1
• your-vercel-domain.vercel.app

================================================================================
🎯 USAGE
================================================================================

MONTHLY TASK MANAGEMENT:
1. Login with Google account
2. Add tasks using sidebar input
3. Mark days complete in calendar grid
4. View progress graph
5. Navigate months with arrows

DAILY TASKS (NEW!):
1. Click "📅 Daily Tasks" button
2. Select month (← →)
3. Choose day from grid (1-31)
4. Add tasks in sidebar
5. Mark complete with checkboxes
6. Delete with × button

================================================================================
📊 FIRESTORE DATA STRUCTURE
================================================================================

MONTHLY TASKS:
users/{uid}/months/{YYYY-MM}/tasks/{taskId}
  - title: string
  - createdAt: timestamp
  - checks: { "01": true, "15": false, ... }

DAILY TASKS (NEW!):
users/{uid}/months/{YYYY-MM}/dailyTasks/{DD}/tasks/{taskId}
  - title: string
  - completed: boolean
  - createdAt: timestamp

================================================================================
🚀 DEPLOYMENT (VERCEL)
================================================================================

1️⃣ Push to GitHub
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main

2️⃣ Import into Vercel
   Root Directory: task-calender

3️⃣ Environment Variables
   Not needed (hardcoded Firebase config)

4️⃣ Deploy
   Vercel auto-builds Vite app

================================================================================
📦 AVAILABLE SCRIPTS
================================================================================

npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint

================================================================================
🧪 FEATURES CHECKLIST
================================================================================

✅ Login with Google
✅ Month navigation
✅ Add/remove monthly tasks
✅ Persistent checkbox states
✅ Real-time Firestore sync
✅ Real-time graph updates
✅ Responsive layout
✅ Dark theme with purple accents
✅ Daily Tasks with sidebar UI (NEW!)
✅ Task completion checkboxes (NEW!)
✅ Multi-page routing (NEW!)
✅ Deployed to Vercel

================================================================================
📝 RECENT UPDATES (v1.0.0)
================================================================================

✅ Added Daily Tasks feature with sidebar-based UI
✅ Implemented task completion checkboxes with strikethrough
✅ Fixed sidebar button layout (horizontal alignment)
✅ Updated text labels for better UX ("Tasks for today")
✅ Fixed Firebase configuration (blank screen issue resolved)
✅ Added React Router for multi-page navigation
✅ Enhanced Firestore security rules
✅ Improved overall UI/UX with modern design

================================================================================
🔒 SECURITY
================================================================================

• User authentication required for all operations
• Firestore rules enforce user-specific data access
• No anonymous access
• Data isolated per user

================================================================================
🛠️ FUTURE IMPROVEMENTS
================================================================================

• Dark/Light mode toggle
• Export monthly report
• Push notifications
• Team task sharing
• Calendar export (iCal)
• Mobile app (React Native)

================================================================================
📄 LICENSE
================================================================================

MIT License — free for personal & commercial use

================================================================================
👤 AUTHOR
================================================================================

Created with ❤️ by Shubhang
Enhanced with Antigravity AI Assistant

================================================================================

Happy Task Managing! 📝✨
