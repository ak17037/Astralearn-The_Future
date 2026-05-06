# Astrlearn – Student Management & Learning Platform

## Overview

StudentOS is a frontend-based Student Management and Learning Platform built using HTML, CSS, and Vanilla JavaScript. It provides students with a centralized dashboard to manage courses, tasks, schedules, attendance, quizzes, notes, and community interactions.

The application is designed as a Single Page Application (SPA) and uses browser localStorage for persistent data storage without requiring a backend.

---

# Features

## Authentication System

* User Signup & Login
* Session Persistence using localStorage
* Auto Login on Refresh
* Logout Functionality
* Form Validation
* Password Validation

---

## Dashboard

* Personalized Welcome Section
* Live Statistics:

  * Pending Tasks
  * Total Courses
  * Attendance Percentage
  * Study Hours
* Recent Activity Section
* Dynamic Data Updates

---

## Course Management

* View All Courses
* Add Custom Courses
* Track Course Progress
* Continue Learning Feature
* Embedded YouTube Video Support
* Course Notes System
* Research Search Tool
* Course-specific Quiz Integration

---

## To-Do Task Manager

* Add Tasks
* Mark Tasks as Complete
* Delete Tasks
* Priority Levels:

  * High
  * Medium
  * Low
* Due Dates
* Task Filters:

  * All
  * Active
  * Completed
* Clear Completed Tasks

---

## Weekly Scheduler

* Add Weekly Events
* Color-coded Schedule Events
* Day-wise Weekly Grid
* Delete Events
* Dynamic Schedule Rendering

---

## Quiz System

* Course-based Quizzes
* Multiple Choice Questions
* Timer-based Quiz Engine
* Navigation Between Questions
* Auto Submission on Timeout
* Score Calculation
* Result Display

---

## Attendance Tracker

* Mark Attendance
* Subject-wise Attendance
* Attendance Percentage Calculation
* Recent Attendance Records
* Present/Absent Status Tracking

---

## Community System

* Create Posts
* Like Posts
* Add Comments
* Like Comments
* Category-based Posts
* Real-time Feed Rendering
* Time Ago System

---

## Settings & Profile

* Update Profile Information
* Avatar Upload Support
* Default Avatar Selection
* Change Password
* User Preferences
* Dark Mode Toggle

---

## Notifications & UI Enhancements

* Toast Notification System
* Notification Dropdown
* Profile Dropdown Menu
* Dynamic UI Updates
* Responsive Layout

---

# Technologies Used

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| HTML5            | Structure               |
| CSS3             | Styling                 |
| JavaScript (ES6) | Application Logic       |
| localStorage     | Persistent Data Storage |
| Flexbox/Grid     | Responsive Layout       |
| DOM Manipulation | Dynamic UI Rendering    |

---

# Project Structure

```text
StudentOS/
│
├── index.html
├── sd2.css
├── as2.js
└── README.md
```

---

# Application Architecture

## High-Level Flow

```text
User Action
    ↓
JavaScript Function
    ↓
Update State Arrays
    ↓
Update currentUser
    ↓
Save to localStorage
    ↓
Re-render UI
```

---

## State Management

The application maintains state using global JavaScript arrays and objects.

### Core State Variables

```javascript
let currentUser = null;
let users = [];
let tasks = [];
let courses = [];
let attendance = [];
let schedule = [];
let communityPosts = [];
```

---

# Authentication Flow

## Signup Process

```text
User fills form
    ↓
Validate Inputs
    ↓
Create User Object
    ↓
Save to users[]
    ↓
Store in localStorage
    ↓
Auto Login
```

---

## Login Process

```text
User enters credentials
    ↓
Validate Inputs
    ↓
Search user in users[]
    ↓
Create Session
    ↓
Show Main Application
```

---

# Data Persistence

StudentOS uses browser localStorage to store:

* Registered Users
* Login Session
* Tasks
* Courses
* Attendance
* Community Posts
* Schedule Events
* User Preferences

## Storage Keys

```text
studentos_users
studentos_session
```

---

# Dynamic Rendering System

The application dynamically generates UI elements using JavaScript.

Examples include:

* Task Cards
* Course Cards
* Community Posts
* Attendance Records
* Weekly Scheduler Grid
* Quiz Questions

---

# Major Functional Modules

## 1. Authentication Module

Handles:

* Signup
* Login
* Logout
* Session Persistence
* Validation

Key Functions:

```javascript
signup()
login()
logout()
checkLogin()
showMainApp()
```

---

## 2. Course Management Module

Handles:

* Course Rendering
* Progress Tracking
* Learning Hub
* Notes Saving
* YouTube Embeds

Key Functions:

```javascript
loadCourses()
updateProgress()
addNewCourse()
saveCourseNotes()
```

---

## 3. Task Management Module

Handles:

* Task CRUD Operations
* Filters
* Priorities
* Due Dates

Key Functions:

```javascript
loadTasks()
addTask()
toggleTask()
deleteTask()
clearCompletedTasks()
```

---

## 4. Scheduler Module

Handles:

* Weekly Events
* Grid Rendering
* Event Colors
* Event Deletion

Key Functions:

```javascript
loadScheduler()
renderWeekGrid()
addScheduleEvent()
deleteScheduleEvent()
```

---

## 5. Quiz Module

Handles:

* Quiz Navigation
* Timer System
* Score Calculation
* Results

Key Functions:

```javascript
startQuiz()
loadQuestion()
submitQuiz()
resetQuiz()
```

---

## 6. Attendance Module

Handles:

* Attendance Marking
* Percentage Calculation
* Record Display

Key Functions:

```javascript
markAttendance()
loadAttendance()
```

---

## 7. Community Module

Handles:

* Posts
* Likes
* Comments
* Feed Rendering

Key Functions:

```javascript
loadCommunityFeed()
addPost()
addComment()
toggleLike()
```

---

# User Interface Features

## Responsive Design

The application uses:

* CSS Flexbox
* CSS Grid
* Responsive Containers
* Adaptive Layouts

---

## Interactive Components

* Modals
* Dropdown Menus
* Toast Notifications
* Dynamic Cards
* Progress Bars
* Filters
* Toggles

---

# Security Notes

This project is frontend-only and intended for learning purposes.

Current limitations:

* Passwords stored in plain text
* No backend authentication
* No database encryption
* No JWT/session security

---

# Future Improvements

## Backend Integration

Potential upgrades:

* Node.js Backend
* Express API
* MongoDB Database
* JWT Authentication
* Cloud Storage

---

## Advanced Features

* Real-time Chat
* Push Notifications
* AI Study Assistant
* Analytics Dashboard
* Drag & Drop Scheduler
* Calendar Sync
* File Uploads
* Admin Panel

---

# Learning Concepts Used

This project demonstrates practical usage of:

* DOM Manipulation
* Event Handling
* JavaScript Arrays & Objects
* State Management
* Dynamic Rendering
* Form Validation
* Conditional Rendering
* Local Storage APIs
* Timers & Intervals
* SPA Architecture

---

# How to Run

## Method 1 – Directly Open

1. Download the project
2. Open `index.html` in a browser

---

## Method 2 – Live Server (Recommended)

1. Open project in VS Code
2. Install Live Server Extension
3. Right-click `index.html`
4. Click `Open with Live Server`

---

# Screens Included

Main application modules:

* Login Page
* Signup Page
* Dashboard
* Courses
* To-Do List
* Scheduler
* Quiz
* Attendance
* Community
* Settings
* Learning Hub

---

# Author

Developed by 
* Arjun Kumar
* Jyot Mehta
* Moksh Nagpal
* Ishant Singla

---

# License

This project is developed for educational and learning purposes.

---

# Final Note

Astralearn demonstrates how a complete frontend application can be built using Vanilla JavaScript without external frameworks. The project combines multiple real-world features such as authentication, task management, scheduling, quizzes, attendance tracking, and social interaction into a unified student productivity platform.
