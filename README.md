# Task Calendar - Cloud-Synced Task Manager

A modern, cloud-synced task management application built with React + Vite and Firebase. Track your monthly tasks and manage daily to-dos with real-time synchronization.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.0-61dafb)
![Firebase](https://img.shields.io/badge/Firebase-11.0.2-orange)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff)

## 🚀 Live Demo

Hosted on Vercel:
👉 https://to-do-app-iota-beryl.vercel.app/

## ✨ Features

### � Monthly Task Tracking
- Create and manage tasks for the entire month
- Calendar grid view showing all days
- Check off tasks as you complete them for each day
- Visual progress graph showing completion rate
- Real-time synchronization across devices

### �️ Daily Tasks (NEW!)
- Dedicated page for managing daily to-dos
- Select any date and add specific tasks
- Mark tasks as complete with checkboxes
- Sidebar-based UI for easy navigation
- Tasks organized by day with month/year navigation

### 🔐 Google Authentication
- Secure login using Firebase Authentication
- User-specific cloud data isolation
- Auto-redirect on login/logout

### 🎨 Modern UI/UX
- Dark mode with purple gradient accents
- Smooth animations and transitions
- Responsive design for all screen sizes
- Premium glassmorphism effects
- Intuitive navigation

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0 (Vite)
- **Routing**: React Router DOM 7.1.3
- **Authentication**: Firebase Auth (Google)
- **Database**: Firebase Firestore
- **Styling**: Vanilla CSS with CSS Variables
- **Fonts**: Google Fonts (Inter)
- **Deployment**: Vercel

## � Project Structure

```
To-Do-App/task-calender/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Main sidebar with tasks list
│   │   ├── CalendarGrid.jsx      # Monthly calendar grid
│   │   └── ProgressGraph.jsx     # Visual progress chart
│   ├── pages/
│   │   └── DailyTasks.jsx        # Daily tasks management page (NEW!)
│   ├── context/
│   │   └── AuthContext.jsx       # Firebase authentication context
│   ├── utils/
│   │   └── dateUtils.js          # Date helper functions
│   ├── App.jsx                   # Main app with routing
│   ├── firebase.js               # Firebase configuration
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Entry point
├── package.json
└── vite.config.js
```

## 🔧 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Shubhang0802/To-Do-App.git
cd To-Do-App/task-calender
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Firebase Configuration

The project uses hardcoded Firebase config:
```javascript
{
  apiKey: "AIzaSyANNhveiZXeh84h88PNjXPma-HyEpRRUhA",
  authDomain: "task-calender-57dad.firebaseapp.com",
  projectId: "task-calender-57dad",
  storageBucket: "task-calender-57dad.firebasestorage.app",
  messagingSenderId: "776111971364",
  appId: "1:776111971364:web:73a83a889a378513660cb1"
}
```

### 4️⃣ Set up Firestore Security Rules

⚠️ **CRITICAL**: Add these rules in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Main tasks rule
    match /users/{userId}/months/{monthId}/tasks/{taskId} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId;
    }

    // Daily tasks rule (MUST BE BEFORE catch-all)
    match /users/{userId}/months/{monthId}/dailyTasks/{dayId}/tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Catch-all deny rule (LAST)
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 5️⃣ Start development server
```bash
npm run dev
```

### 6️⃣ Open browser
Navigate to: **http://localhost:5173/**

## 🔥 Firebase Setup

### Enable Services:
- **Authentication** → Google Sign-in
- **Firestore Database** (production mode with security rules)

### Add Authorized Domains:
- localhost
- localhost:5173
- 127.0.0.1
- your-vercel-domain.vercel.app

## 🎯 Usage

### Monthly Task Management
1. Login with your Google account
2. Add tasks using the sidebar input
3. Mark days complete by clicking checkboxes in the calendar
4. View progress in the graph below
5. Navigate months using arrow buttons

### Daily Tasks
1. Click **📅 Daily Tasks** button in sidebar
2. Select month using navigation arrows
3. Choose a day from the day grid (1-31)
4. Add tasks for that specific day
5. Mark tasks complete using checkboxes
6. Delete tasks with × button

## 📊 Firestore Data Structure

### Monthly Tasks
```
users/{uid}/months/{YYYY-MM}/tasks/{taskId}
  - title: string
  - createdAt: timestamp
  - checks: { "01": true, "15": false, ... }
```

### Daily Tasks (NEW!)
```
users/{uid}/months/{YYYY-MM}/dailyTasks/{DD}/tasks/{taskId}
  - title: string
  - completed: boolean
  - createdAt: timestamp
```

## 🚀 Deployment (Vercel)

### 1️⃣ Push to GitHub
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

### 2️⃣ Import repo into Vercel
- Set **Root Directory** to: `task-calender`

### 3️⃣ Environment Variables (Optional - using hardcoded config)
No environment variables needed (Firebase config is hardcoded)

### 4️⃣ Deploy
Vercel will auto-build the Vite app

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🎨 Design Features

- **Color Scheme**: Dark mode with purple gradient accents
- **Typography**: Inter font family
- **Animations**: Smooth transitions and hover effects
- **Components**: Reusable, modular design
- **Responsive**: Mobile-first approach

## 🧪 Features Checklist

✅ Login with Google  
✅ Month navigation  
✅ Add/remove monthly tasks  
✅ Persistent checkbox states  
✅ Real-time Firestore sync  
✅ Real-time graph updates  
✅ Responsive layout  
✅ Dark theme with purple accents  
✅ **Daily Tasks with sidebar UI (NEW!)**  
✅ **Task completion checkboxes (NEW!)**  
✅ **Multi-page routing (NEW!)**  
✅ Deployed to Vercel  

## � Recent Updates (v1.0.0)

- ✅ Added Daily Tasks feature with sidebar-based UI
- ✅ Implemented task completion checkboxes with strikethrough
- ✅ Fixed sidebar button layout (horizontal alignment)
- ✅ Updated text labels for better UX ("Tasks for today")
- ✅ Fixed Firebase configuration (resolved blank screen issue)
- ✅ Added React Router for multi-page navigation
- ✅ Improved overall UI/UX with modern design
- ✅ Enhanced Firestore security rules

## 🔒 Security

- User authentication required for all operations
- Firestore security rules enforce user-specific data access
- No anonymous access allowed
- Data isolated per user

## �🛠️ Future Improvements

- Dark/Light mode toggle
- Export monthly report
- Push notifications
- Team task sharing
- Calendar export (iCal format)
- Mobile app (React Native)

## � License

MIT License — free for personal & commercial use.

## 👤 Author

Created with ❤️ by Shubhang  
Enhanced with Antigravity AI Assistant

---

**Happy Task Managing! 📝✨**
