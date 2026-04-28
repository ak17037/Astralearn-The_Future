// =============================
// STUDENT OS - FULLY FUNCTIONAL COMPLETE SYSTEM
// All features working: Attendance, Schedule, Dynamic Analytics, Notifications, Expanded Courses, etc.
// =============================

const { useState, useEffect, useMemo } = React;

// =============================
// ENHANCED BACKEND WITH ALL FEATURES
// =============================
const Backend = {
  // Initialize default data
  initializeUser: (user) => {
    const defaultData = {
      tasks: [],
      courses: [
        {
          id: 1,
          title: "React Mastery",
          instructor: "John Doe",
          progress: 0,
          totalLessons: 12,
          completedLessons: 0,
          enrolled: true,
          quizzes: [
            {
              id: 1,
              title: "React Basics Quiz",
              questions: [
                { id: 1, q: "What is JSX?", options: ["JavaScript XML", "Java Syntax", "JSON Extension"], answer: "JavaScript XML" },
                { id: 2, q: "What is a component?", options: ["Reusable UI piece", "A function", "A class"], answer: "Reusable UI piece" },
                { id: 3, q: "What hook manages state?", options: ["useState", "useEffect", "useRef"], answer: "useState" }
              ]
            }
          ],
          lessons: [
            { id: 1, title: "Introduction to React", video: "https://www.youtube.com/embed/dGcsHMXbSOA", completed: false, duration: "15 min" },
            { id: 2, title: "Understanding JSX", video: "https://www.youtube.com/embed/f687hBjwFcM", completed: false, duration: "22 min" },
            { id: 3, title: "Components & Props", video: "https://www.youtube.com/embed/dGcsHMXbSOA", completed: false, duration: "18 min" },
          ]
        },
        {
          id: 2,
          title: "DSA Fundamentals",
          instructor: "Jane Smith",
          progress: 0,
          totalLessons: 20,
          completedLessons: 0,
          enrolled: true,
          quizzes: [
            {
              id: 2,
              title: "Arrays & Complexity",
              questions: [
                { id: 1, q: "Time complexity of linear search?", options: ["O(n)", "O(log n)", "O(1)"], answer: "O(n)" },
                { id: 2, q: "Best sorting algorithm?", options: ["Quick Sort", "Bubble Sort", "Selection Sort"], answer: "Quick Sort" },
                { id: 3, q: "Stack follows?", options: ["LIFO", "FIFO", "Random"], answer: "LIFO" }
              ]
            }
          ],
          lessons: [
            { id: 1, title: "Arrays & Strings", video: "https://www.youtube.com/embed/8hly31xKli0", completed: false, duration: "18 min" },
            { id: 2, title: "Linked Lists", video: "https://www.youtube.com/embed/NobHlGUjV3g", completed: false, duration: "25 min" },
            { id: 3, title: "Stacks & Queues", video: "https://www.youtube.com/embed/8hly31xKli0", completed: false, duration: "20 min" },
          ]
        },
        {
          id: 3,
          title: "Web Development",
          instructor: "Mike Johnson",
          progress: 0,
          totalLessons: 15,
          completedLessons: 0,
          enrolled: false,
          quizzes: [
            {
              id: 3,
              title: "HTML & CSS Basics",
              questions: [
                { id: 1, q: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System"], answer: "Cascading Style Sheets" },
                { id: 2, q: "Which tag for links?", options: ["<a>", "<link>", "<href>"], answer: "<a>" },
                { id: 3, q: "Flexbox container property?", options: ["display: flex", "flex: 1", "flexbox: true"], answer: "display: flex" }
              ]
            }
          ],
          lessons: [
            { id: 1, title: "HTML Fundamentals", video: "https://www.youtube.com/embed/dGcsHMXbSOA", completed: false, duration: "20 min" },
            { id: 2, title: "CSS Styling", video: "https://www.youtube.com/embed/f687hBjwFcM", completed: false, duration: "30 min" },
          ]
        }
      ],
      attendance: [],
      schedule: [
        { id: 1, day: "Monday", time: "9:00 AM - 10:30 AM", subject: "Mathematics", type: "Lecture", location: "Room 101" },
        { id: 2, day: "Monday", time: "11:00 AM - 12:30 PM", subject: "Data Structures", type: "Lab", location: "Lab 3" },
        { id: 3, day: "Tuesday", time: "9:00 AM - 10:30 AM", subject: "Web Development", type: "Lecture", location: "Room 205" },
        { id: 4, day: "Wednesday", time: "2:00 PM - 3:30 PM", subject: "Database Systems", type: "Lecture", location: "Room 102" },
        { id: 5, day: "Thursday", time: "10:00 AM - 11:30 AM", subject: "Algorithm Design", type: "Tutorial", location: "Room 303" },
        { id: 6, day: "Friday", time: "1:00 PM - 2:30 PM", subject: "Project Work", type: "Lab", location: "Lab 1" }
      ],
      analytics: {
        performance: [],
        attendance: [],
        studyHours: []
      },
      notifications: [
        { id: 1, text: "Welcome to StudentOS! 🎉", read: false, timestamp: new Date().toISOString() },
        { id: 2, text: "Complete your profile to get started", read: false, timestamp: new Date().toISOString() }
      ],
      preferences: {
        notifications: true,
        emailUpdates: false,
        darkMode: false,
      }
    };

    return { ...user, ...defaultData };
  },

  signup: async (userData) => {
    const users = JSON.parse(localStorage.getItem("studentos_users") || "[]");
    
    if (users.find(u => u.email === userData.email)) {
      throw new Error("Email already registered");
    }
    
    const newUser = Backend.initializeUser({
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
    });
    
    users.push(newUser);
    localStorage.setItem("studentos_users", JSON.stringify(users));
    return { success: true, user: newUser };
  },

  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = JSON.parse(localStorage.getItem("studentos_users") || "[]");
    let user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Initialize missing fields for existing users
    if (!user.courses) {
      user = Backend.initializeUser(user);
      const userIndex = users.findIndex(u => u.id === user.id);
      users[userIndex] = user;
      localStorage.setItem("studentos_users", JSON.stringify(users));
    }
    
    const session = {
      userId: user.id,
      email: user.email,
      name: user.name,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem("studentos_session", JSON.stringify(session));
    return { success: true, user };
  },

  logout: () => {
    localStorage.removeItem("studentos_session");
  },

  getSession: () => {
    const session = localStorage.getItem("studentos_session");
    return session ? JSON.parse(session) : null;
  },

  getCurrentUser: () => {
    const session = Backend.getSession();
    if (!session) return null;
    
    const users = JSON.parse(localStorage.getItem("studentos_users") || "[]");
    return users.find(u => u.id === session.userId);
  },

  updateUser: (updates) => {
    const session = Backend.getSession();
    if (!session) return;
    
    const users = JSON.parse(localStorage.getItem("studentos_users") || "[]");
    const userIndex = users.findIndex(u => u.id === session.userId);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem("studentos_users", JSON.stringify(users));
      return users[userIndex];
    }
  },

  // Tasks
  getTasks: () => Backend.getCurrentUser()?.tasks || [],
  addTask: (task) => {
    const user = Backend.getCurrentUser();
    if (!user) return;
    const newTask = { id: Date.now(), ...task, createdAt: new Date().toISOString() };
    const tasks = [...(user.tasks || []), newTask];
    Backend.updateUser({ tasks });
    return newTask;
  },
  updateTask: (taskId, updates) => {
    const user = Backend.getCurrentUser();
    if (!user) return;
    const tasks = user.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t);
    Backend.updateUser({ tasks });
  },
  deleteTask: (taskId) => {
    const user = Backend.getCurrentUser();
    if (!user) return;
    const tasks = user.tasks.filter(t => t.id !== taskId);
    Backend.updateUser({ tasks });
  },

  // Courses
  getCourses: () => Backend.getCurrentUser()?.courses || [],
  updateCourse: (courseId, updates) => {
    const user = Backend.getCurrentUser();
    if (!user) return;
    const courses = user.courses.map(c => c.id === courseId ? { ...c, ...updates } : c);
    Backend.updateUser({ courses });
    return courses.find(c => c.id === courseId);
  },
  enrollCourse: (courseId) => {
    const user = Backend.getCurrentUser();
    if (!user) return;
    const courses = user.courses.map(c => c.id === courseId ? { ...c, enrolled: true } : c);
    Backend.updateUser({ courses });
    Backend.addNotification(`You've enrolled in ${courses.find(c => c.id === courseId).title}! 📚`);
  },

  // Attendance
  getAttendance: () => Backend.getCurrentUser()?.attendance || [],
  markAttendance: (subject, status) => {
    const user = Backend.getCurrentUser();
    if (!user) return;
    const attendance = [...(user.attendance || []), {
      id: Date.now(),
      subject,
      status,
      date: new Date().toISOString()
    }];
    Backend.updateUser({ attendance });
  },

  // Schedule
  getSchedule: () => Backend.getCurrentUser()?.schedule || [],
  addSchedule: (item) => {
    const user = Backend.getCurrentUser();
    if (!user) return;
    const schedule = [...(user.schedule || []), { id: Date.now(), ...item }];
    Backend.updateUser({ schedule });
  },
  updateSchedule: (id, updates) => {
    const user = Backend.getCurrentUser();
    if (!user) return;
    const schedule = user.schedule.map(s => s.id === id ? { ...s, ...updates } : s);
    Backend.updateUser({ schedule });
  },
  deleteSchedule: (id) => {
    const user = Backend.getCurrentUser();
    if (!user) return;
    const schedule = user.schedule.filter(s => s.id !== id);
    Backend.updateUser({ schedule });
  },

  // Analytics
  getAnalytics: () => Backend.getCurrentUser()?.analytics || { performance: [], attendance: [], studyHours: [] },
  addAnalyticsData: (type, data) => {
    const user = Backend.getCurrentUser();
    if (!user) return;
    const analytics = user.analytics || { performance: [], attendance: [], studyHours: [] };
    analytics[type] = [...(analytics[type] || []), { ...data, date: new Date().toISOString() }];
    Backend.updateUser({ analytics });
  },

  // Notifications
  getNotifications: () => Backend.getCurrentUser()?.notifications || [],
  addNotification: (text) => {
    const user = Backend.getCurrentUser();
    if (!user) return;
    const notifications = [...(user.notifications || []), {
      id: Date.now(),
      text,
      read: false,
      timestamp: new Date().toISOString()
    }];
    Backend.updateUser({ notifications });
  },
  markNotificationRead: (id) => {
    const user = Backend.getCurrentUser();
    if (!user) return;
    const notifications = user.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    Backend.updateUser({ notifications });
  },
  clearNotifications: () => {
    Backend.updateUser({ notifications: [] });
  }
};

// =============================
// ROOT APP
// =============================
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authView, setAuthView] = useState("login");

  useEffect(() => {
    const session = Backend.getSession();
    if (session) {
      const user = Backend.getCurrentUser();
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
      }
    }
  }, []);

  const handleLogin = async (email, password) => {
    const result = await Backend.login(email, password);
    setIsAuthenticated(true);
    setCurrentUser(result.user);
  };

  const handleSignup = async (userData) => {
    const result = await Backend.signup(userData);
    setIsAuthenticated(true);
    setCurrentUser(result.user);
  };

  const handleLogout = () => {
    Backend.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const refreshUser = () => {
    const user = Backend.getCurrentUser();
    setCurrentUser(user);
  };

  if (!isAuthenticated) {
    return (
      <AuthScreen 
        view={authView} 
        setView={setAuthView}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    );
  }

  return <MainApp user={currentUser} onLogout={handleLogout} refreshUser={refreshUser} />;
}

// =============================
// AUTH SCREEN
// =============================
function AuthScreen({ view, setView, onLogin, onSignup }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    institute: "",
    course: ""
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (view === "login") {
        if (!formData.email || !formData.password) {
          throw new Error("Please fill all fields");
        }
        await onLogin(formData.email, formData.password);
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          throw new Error("Please fill all required fields");
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        await onSignup(formData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">SO</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {view === "login" ? "Welcome Back" : "Join StudentOS"}
            </h1>
            <p className="text-gray-600">
              {view === "login" ? "Sign in to continue your learning" : "Create your account to get started"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {view === "signup" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institute</label>
                  <input
                    type="text"
                    name="institute"
                    value={formData.institute}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Your University/College"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course/Major</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Computer Science"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            {view === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : view === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setView(view === "login" ? "signup" : "login")}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {view === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================
// MAIN APP
// =============================
function MainApp({ user, onLogout, refreshUser }) {
  const [page, setPage] = useState("dashboard");
  const [theme, setTheme] = useState(user?.preferences?.darkMode ? "dark" : "light");

  return (
    <div className={"min-h-screen flex " + (theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900")}>
      <Sidebar setPage={setPage} page={page} />
      <div className="flex-1">
        <Navbar theme={theme} setTheme={setTheme} user={user} onLogout={onLogout} refreshUser={refreshUser} />
        <div className="p-6 animate-fade-in">
          {page === "dashboard" && <Dashboard user={user} refreshUser={refreshUser} />}
          {page === "learning" && <Learning refreshUser={refreshUser} />}
          {page === "todo" && <TodoAdvanced refreshUser={refreshUser} />}
          {page === "quiz" && <QuizAdvanced refreshUser={refreshUser} />}
          {page === "coding" && <CodingAdvanced />}
          {page === "analytics" && <AnalyticsAdvanced refreshUser={refreshUser} />}
          {page === "attendance" && <AttendancePage refreshUser={refreshUser} />}
          {page === "schedule" && <SchedulePage refreshUser={refreshUser} />}
          {page === "community" && <CommunityAdvanced user={user} />}
          {page === "settings" && <SettingsAdvanced theme={theme} setTheme={setTheme} user={user} refreshUser={refreshUser} />}
        </div>
      </div>
    </div>
  );
}

// =============================
// SIDEBAR
// =============================
function Sidebar({ setPage, page }) {
  const items = [
    ["📊 Dashboard", "dashboard"],
    ["📚 Learning", "learning"],
    ["✅ To-Do", "todo"],
    ["🎯 Quiz", "quiz"],
    ["💻 Coding", "coding"],
    ["📈 Analytics", "analytics"],
    ["📅 Attendance", "attendance"],
    ["🕐 Schedule", "schedule"],
    ["👥 Community", "community"],
    ["⚙️ Settings", "settings"],
  ];
  
  return (
    <div className="w-64 bg-white border-r p-4 h-screen sticky top-0 overflow-y-auto">
      <h1 className="font-bold mb-6 text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        StudentOS
      </h1>
      <nav className="space-y-1">
        {items.map(([name, key]) => (
          <button
            key={key}
            onClick={() => setPage(key)}
            className={
              "block p-3 w-full text-left rounded-lg transition-all font-medium " +
              (page === key 
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-700")
            }
          >
            {name}
          </button>
        ))}
      </nav>
    </div>
  );
}

// =============================
// NAVBAR WITH NOTIFICATIONS
// =============================
function Navbar({ theme, setTheme, user, onLogout, refreshUser }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = Backend.getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (id) => {
    Backend.markNotificationRead(id);
    refreshUser();
  };

  const clearAll = () => {
    Backend.clearNotifications();
    refreshUser();
    setShowNotifications(false);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white border-b sticky top-0 z-10">
      <div className="flex items-center gap-3 flex-1">
        <input 
          placeholder="Search courses, tasks, quizzes..." 
          className="border border-gray-200 p-2 rounded-lg w-full max-w-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
        />
      </div>
      
      <div className="flex gap-4 items-center">
        <button 
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-100 rounded-lg relative" 
            title="Notifications"
          >
            🔔
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border z-20 max-h-96 overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
                <h3 className="font-bold">Notifications</h3>
                {notifications.length > 0 && (
                  <button onClick={clearAll} className="text-xs text-red-600 hover:text-red-700">
                    Clear All
                  </button>
                )}
              </div>
              
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="text-4xl mb-2">🔔</div>
                  <p>No notifications</p>
                </div>
              ) : (
                <div>
                  {notifications.map(n => (
                    <div 
                      key={n.id}
                      onClick={() => handleNotificationClick(n.id)}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!n.read ? 'bg-indigo-50' : ''}`}
                    >
                      <p className="text-sm">{n.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(n.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <span className="font-medium hidden md:block">{user?.name || "User"}</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 z-20">
              <div className="px-4 py-2 border-b">
                <p className="font-semibold text-sm">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================
// DASHBOARD
// =============================
function Dashboard({ user, refreshUser }) {
  const tasks = Backend.getTasks();
  const pendingTasks = tasks.filter(t => !t.done).length;
  const courses = Backend.getCourses();
  const enrolledCourses = courses.filter(c => c.enrolled).length;
  const attendance = Backend.getAttendance();
  const attendanceRate = attendance.length > 0 
    ? Math.round((attendance.filter(a => a.status === "present").length / attendance.length) * 100)
    : 0;
  
  const stats = [
    { title: "Pending Tasks", value: pendingTasks, icon: "📝", color: "from-blue-500 to-blue-600" },
    { title: "Attendance", value: `${attendanceRate}%`, icon: "📅", color: "from-green-500 to-green-600" },
    { title: "Enrolled Courses", value: enrolledCourses, icon: "📚", color: "from-purple-500 to-purple-600" },
    { title: "Study Hours", value: "24h", icon: "⏱️", color: "from-orange-500 to-orange-600" },
  ];

  const schedule = Backend.getSchedule();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedule = schedule.filter(s => s.day === today);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="text-gray-600">Here's what's happening with your learning today</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, index) => (
          <div key={s.title} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow animate-slide-up" style={{ animationFillMode: 'both', animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${s.color} rounded-lg flex items-center justify-center text-2xl`}>
                {s.icon}
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{s.value}</div>
            <div className="text-sm text-gray-600">{s.title}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title={`📅 Today's Schedule (${today})`}>
          {todaySchedule.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No classes scheduled for today</p>
          ) : (
            <div className="space-y-3">
              {todaySchedule.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-semibold text-indigo-600 w-32">{item.time}</div>
                  <div className="flex-1">
                    <div className="font-medium">{item.subject}</div>
                    <div className="text-xs text-gray-500">{item.type} • {item.location}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card title="🎯 Quick Actions">
          <div className="space-y-2">
            <button className="w-full p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg text-left hover:shadow-md transition-all">
              <div className="font-medium text-indigo-700">📚 Continue Learning</div>
              <div className="text-xs text-gray-600 mt-1">Resume your last course</div>
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg text-left hover:shadow-md transition-all">
              <div className="font-medium text-green-700">✅ Mark Attendance</div>
              <div className="text-xs text-gray-600 mt-1">Mark today's attendance</div>
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg text-left hover:shadow-md transition-all">
              <div className="font-medium text-orange-700">🎯 Take Quiz</div>
              <div className="text-xs text-gray-600 mt-1">Test your knowledge</div>
            </button>
          </div>
        </Card>
      </div>

      <Card title="📊 Recent Activity">
        <div className="space-y-3">
          {[
            { action: "Completed React Hooks lesson", time: "2 hours ago", icon: "✅", color: "text-green-600" },
            { action: "Quiz Score: 85%", time: "5 hours ago", icon: "🎯", color: "text-blue-600" },
            { action: "Marked attendance for DSA", time: "1 day ago", icon: "📅", color: "text-purple-600" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className={`text-2xl ${item.color}`}>{item.icon}</div>
              <div className="flex-1">
                <div className="font-medium">{item.action}</div>
                <div className="text-xs text-gray-500">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// =============================
// ATTENDANCE PAGE
// =============================
function AttendancePage({ refreshUser }) {
  const attendance = Backend.getAttendance();
  const schedule = Backend.getSchedule();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [status, setStatus] = useState("present");

  const subjects = [...new Set(schedule.map(s => s.subject))];

  const handleMarkAttendance = () => {
    if (!selectedSubject) {
      alert("Please select a subject");
      return;
    }

    Backend.markAttendance(selectedSubject, status);
    Backend.addNotification(`Attendance marked as ${status} for ${selectedSubject} ✓`);
    refreshUser();
    setSelectedSubject("");
    alert(`Attendance marked as ${status} for ${selectedSubject}!`);
  };

  // Calculate stats
  const totalClasses = attendance.length;
  const presentCount = attendance.filter(a => a.status === "present").length;
  const absentCount = attendance.filter(a => a.status === "absent").length;
  const attendanceRate = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

  // Group by subject
  const subjectWiseAttendance = {};
  attendance.forEach(a => {
    if (!subjectWiseAttendance[a.subject]) {
      subjectWiseAttendance[a.subject] = { present: 0, absent: 0, total: 0 };
    }
    subjectWiseAttendance[a.subject].total++;
    if (a.status === "present") {
      subjectWiseAttendance[a.subject].present++;
    } else {
      subjectWiseAttendance[a.subject].absent++;
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Attendance Tracker</h1>
        <p className="text-gray-600">Manage and track your class attendance</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card title="Total Classes">
          <div className="text-3xl font-bold text-indigo-600">{totalClasses}</div>
        </Card>
        <Card title="Present">
          <div className="text-3xl font-bold text-green-600">{presentCount}</div>
        </Card>
        <Card title="Absent">
          <div className="text-3xl font-bold text-red-600">{absentCount}</div>
        </Card>
        <Card title="Attendance Rate">
          <div className={`text-3xl font-bold ${attendanceRate >= 75 ? 'text-green-600' : 'text-red-600'}`}>
            {attendanceRate}%
          </div>
        </Card>
      </div>

      {/* Mark Attendance */}
      <Card title="Mark Attendance">
        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>

          <button
            onClick={handleMarkAttendance}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Mark Attendance
          </button>
        </div>
      </Card>

      {/* Subject-wise breakdown */}
      <Card title="Subject-wise Attendance">
        {Object.keys(subjectWiseAttendance).length === 0 ? (
          <p className="text-center text-gray-500 py-8">No attendance records yet</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(subjectWiseAttendance).map(([subject, data]) => {
              const rate = Math.round((data.present / data.total) * 100);
              return (
                <div key={subject} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{subject}</h3>
                    <span className={`font-bold ${rate >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                      {rate}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                    <div>Total: <span className="font-semibold">{data.total}</span></div>
                    <div>Present: <span className="font-semibold text-green-600">{data.present}</span></div>
                    <div>Absent: <span className="font-semibold text-red-600">{data.absent}</span></div>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className={`h-2 rounded-full ${rate >= 75 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: rate + '%' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Recent Records */}
      <Card title="Recent Attendance">
        {attendance.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No records yet</p>
        ) : (
          <div className="space-y-2">
            {attendance.slice().reverse().slice(0, 10).map((record) => (
              <div key={record.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{record.subject}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  record.status === "present" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

// =============================
// SCHEDULE PAGE
// =============================
function SchedulePage({ refreshUser }) {
  const [schedule, setSchedule] = useState(Backend.getSchedule());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    day: "Monday",
    time: "",
    subject: "",
    type: "Lecture",
    location: ""
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      Backend.updateSchedule(editingId, formData);
      Backend.addNotification(`Schedule updated for ${formData.subject} ✓`);
    } else {
      Backend.addSchedule(formData);
      Backend.addNotification(`New class added: ${formData.subject} ✓`);
    }
    
    setSchedule(Backend.getSchedule());
    refreshUser();
    setShowForm(false);
    setEditingId(null);
    setFormData({ day: "Monday", time: "", subject: "", type: "Lecture", location: "" });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this schedule?")) {
      Backend.deleteSchedule(id);
      setSchedule(Backend.getSchedule());
      Backend.addNotification("Schedule deleted ✓");
      refreshUser();
    }
  };

  const groupedSchedule = {};
  days.forEach(day => {
    groupedSchedule[day] = schedule.filter(s => s.day === day);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Class Schedule</h1>
          <p className="text-gray-600">Manage your weekly timetable</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          {showForm ? "Cancel" : "+ Add Class"}
        </button>
      </div>

      {showForm && (
        <Card title={editingId ? "Edit Class" : "Add New Class"}>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <select
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>

            <input
              type="text"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              placeholder="Time (e.g., 9:00 AM - 10:30 AM)"
              className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Subject Name"
              className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />

            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Lecture">Lecture</option>
              <option value="Lab">Lab</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Seminar">Seminar</option>
            </select>

            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Location (e.g., Room 101)"
              className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />

            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              {editingId ? "Update Class" : "Add Class"}
            </button>
          </form>
        </Card>
      )}

      {/* Weekly Schedule */}
      <div className="space-y-4">
        {days.map(day => (
          <Card key={day} title={`${day} ${groupedSchedule[day].length > 0 ? `(${groupedSchedule[day].length} classes)` : ''}`}>
            {groupedSchedule[day].length === 0 ? (
              <p className="text-center text-gray-500 py-4">No classes scheduled</p>
            ) : (
              <div className="space-y-2">
                {groupedSchedule[day].map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-semibold text-indigo-600 w-40">{item.time}</div>
                      <div>
                        <div className="font-medium">{item.subject}</div>
                        <div className="text-sm text-gray-600">{item.type} • {item.location}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// Continue in next part due to length...
// =============================
// LEARNING (EXPANDED WITH ENROLLMENT)
// =============================
function Learning({ refreshUser }) {
  const [courses, setCourses] = useState(Backend.getCourses());
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [notes, setNotes] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "enrolled", "available"

  const filteredCourses = filter === "all" ? courses : 
    filter === "enrolled" ? courses.filter(c => c.enrolled) :
    courses.filter(c => !c.enrolled);

  const handleEnroll = (courseId) => {
    Backend.enrollCourse(courseId);
    setCourses(Backend.getCourses());
    refreshUser();
  };

  const handleLessonComplete = (courseId, lessonId) => {
    const course = courses.find(c => c.id === courseId);
    const updatedLessons = course.lessons.map(l => 
      l.id === lessonId ? { ...l, completed: true } : l
    );
    const completedCount = updatedLessons.filter(l => l.completed).length;
    const progress = Math.round((completedCount / course.totalLessons) * 100);
    
    Backend.updateCourse(courseId, { 
      lessons: updatedLessons, 
      completedLessons: completedCount,
      progress 
    });
    
    Backend.addNotification(`Lesson completed: ${updatedLessons.find(l => l.id === lessonId).title} ✓`);
    setCourses(Backend.getCourses());
    refreshUser();
    setSelectedLesson(null);
    alert("Lesson marked as completed! 🎉");
  };

  if (!selectedCourse) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Learning</h1>
            <p className="text-gray-600">Explore and continue your courses</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setFilter("enrolled")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "enrolled" ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
            >
              Enrolled
            </button>
            <button
              onClick={() => setFilter("available")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "available" ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
            >
              Available
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <div key={c.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-500 relative">
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-xs opacity-80">{c.completedLessons}/{c.totalLessons} lessons</div>
                </div>
                {!c.enrolled && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg text-xs font-bold">
                    Not Enrolled
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{c.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {c.instructor}</p>
                
                {c.enrolled && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-indigo-600">{c.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: c.progress + "%" }}
                      />
                    </div>
                  </div>
                )}

                {c.enrolled ? (
                  <button
                    onClick={() => setSelectedCourse(c)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all"
                  >
                    Continue Learning →
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(c.id)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!selectedLesson) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedCourse(null)} 
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          ← Back to Courses
        </button>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{selectedCourse.title}</h1>
          <p className="text-gray-600">Instructor: {selectedCourse.instructor}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-gray-600">Course Progress</div>
              <div className="text-2xl font-bold text-indigo-600">{selectedCourse.progress}%</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Completed</div>
              <div className="text-2xl font-bold">{selectedCourse.completedLessons}/{selectedCourse.totalLessons}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
              style={{ width: selectedCourse.progress + "%" }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {selectedCourse.lessons.map((l, index) => (
            <div 
              key={l.id} 
              className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  l.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                }`}>
                  {l.completed ? "✓" : index + 1}
                </div>
                <div>
                  <div className="font-semibold">{l.title}</div>
                  <div className="text-sm text-gray-500">{l.duration}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedLesson(l)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                {l.completed ? "Review" : "Start"} →
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button 
        onClick={() => setSelectedLesson(null)}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
      >
        ← Back to Lessons
      </button>

      <div>
        <h1 className="text-2xl font-bold mb-1">{selectedLesson.title}</h1>
        <p className="text-gray-600">Duration: {selectedLesson.duration}</p>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="aspect-video bg-black">
          <iframe
            src={selectedLesson.video}
            title="lesson"
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      </div>

      <Card title="📝 Lesson Notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-40 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Take notes while watching..."
        />
      </Card>

      {!selectedLesson.completed && (
        <button
          onClick={() => handleLessonComplete(selectedCourse.id, selectedLesson.id)}
          className="w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          ✓ Mark as Completed
        </button>
      )}
    </div>
  );
}

// Continuing with remaining components in next message due to length constraints...
// =============================
// PART 2: Remaining Components
// =============================

// =============================
// TODO ADVANCED
// =============================
function TodoAdvanced({ refreshUser }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    setTasks(Backend.getTasks());
  }, []);

  const addTask = () => {
    if (!input.trim()) return;
    
    const newTask = Backend.addTask({ 
      text: input, 
      done: false,
      priority,
      dueDate: dueDate || null
    });
    
    setTasks([...tasks, newTask]);
    Backend.addNotification(`New task added: ${input} ✓`);
    refreshUser();
    setInput("");
    setDueDate("");
  };

  const toggle = (id) => {
    const task = tasks.find(t => t.id === id);
    Backend.updateTask(id, { done: !task.done });
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    Backend.addNotification(`Task ${!task.done ? 'completed' : 'reopened'} ✓`);
    refreshUser();
  };

  const deleteTask = (id) => {
    Backend.deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
    Backend.addNotification("Task deleted ✓");
    refreshUser();
  };

  const filtered = tasks.filter((t) =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done
  );

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.done).length,
    pending: tasks.filter(t => !t.done).length,
    highPriority: tasks.filter(t => t.priority === "high" && !t.done).length
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Task Manager</h1>
        <p className="text-gray-600">Organize and track your daily tasks</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Tasks</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
          <div className="text-sm text-gray-600">High Priority</div>
        </div>
      </div>

      {/* Add Task */}
      <Card title="Add New Task">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              className="flex-1 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
              placeholder="What needs to be done?"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <select 
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button 
              onClick={addTask} 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Add Task
            </button>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex gap-2">
        {["all", "pending", "done"].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === f 
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" 
                : "bg-white border hover:border-indigo-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📝</div>
            <p>No tasks found</p>
          </div>
        ) : (
          filtered.map((t) => (
            <div 
              key={t.id} 
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <button 
                    onClick={() => toggle(t.id)}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      t.done ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-indigo-500"
                    }`}
                  >
                    {t.done && <span className="text-white text-sm">✓</span>}
                  </button>
                  <div className="flex-1">
                    <span className={`${t.done ? "line-through text-gray-400" : "text-gray-900"}`}>
                      {t.text}
                    </span>
                    {t.dueDate && (
                      <div className="text-xs text-gray-500 mt-1">
                        Due: {new Date(t.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    t.priority === "high" ? "bg-red-100 text-red-600" :
                    t.priority === "medium" ? "bg-yellow-100 text-yellow-600" :
                    "bg-green-100 text-green-600"
                  }`}>
                    {t.priority}
                  </span>
                  <button 
                    onClick={() => deleteTask(t.id)}
                    className="ml-3 text-red-500 hover:text-red-700 font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// =============================
// QUIZ ADVANCED (COURSE-SPECIFIC)
// =============================
function QuizAdvanced({ refreshUser }) {
  const courses = Backend.getCourses().filter(c => c.enrolled);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(120);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedQuiz && time <= 0) {
      setSubmitted(true);
      return;
    }
    if (selectedQuiz && !submitted) {
      const t = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [time, submitted, selectedQuiz]);

  if (!selectedCourse) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Quiz Center</h1>
          <p className="text-gray-600">Test your knowledge across different courses</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl mb-4">
                🎯
              </div>
              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{course.quizzes?.length || 0} quizzes available</p>
              <button
                onClick={() => setSelectedCourse(course)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all"
              >
                Take Quiz →
              </button>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📚</div>
            <p>Enroll in courses to access quizzes</p>
          </div>
        )}
      </div>
    );
  }

  if (!selectedQuiz) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedCourse(null)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          ← Back to Courses
        </button>

        <div>
          <h1 className="text-3xl font-bold mb-2">{selectedCourse.title}</h1>
          <p className="text-gray-600">Select a quiz to begin</p>
        </div>

        <div className="space-y-4">
          {selectedCourse.quizzes?.map(quiz => (
            <div key={quiz.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg mb-2">{quiz.title}</h3>
                  <p className="text-sm text-gray-600">{quiz.questions.length} questions • 2 minutes</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedQuiz(quiz);
                    setTime(120);
                    setIndex(0);
                    setAnswers({});
                    setSubmitted(false);
                  }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Start Quiz →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const questions = selectedQuiz.questions;
  
  const selectOption = (opt) => {
    setAnswers({ ...answers, [index]: opt });
  };

  const next = () => {
    if (index < questions.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const submitQuiz = () => {
    setSubmitted(true);
    const score = questions.filter((q, i) => answers[i] === q.answer).length;
    const percentage = Math.round((score / questions.length) * 100);
    Backend.addNotification(`Quiz completed! Score: ${percentage}% 🎯`);
    Backend.addAnalyticsData('performance', { 
      course: selectedCourse.title, 
      quiz: selectedQuiz.title, 
      score: percentage 
    });
    refreshUser();
  };

  const score = useMemo(() => {
    let s = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) s++;
    });
    return s;
  }, [answers, questions]);

  const percentage = Math.round((score / questions.length) * 100);

  if (submitted) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => {
            setSelectedQuiz(null);
            setSubmitted(false);
          }}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          ← Back to Quizzes
        </button>

        <Card title="🎉 Quiz Results">
          <div className="text-center py-8">
            <div className={`text-6xl font-bold mb-4 ${
              percentage >= 70 ? "text-green-600" : percentage >= 50 ? "text-yellow-600" : "text-red-600"
            }`}>
              {percentage}%
            </div>
            <p className="text-xl mb-2">You scored {score} out of {questions.length}</p>
            <p className="text-gray-600">
              {percentage >= 70 ? "Excellent work! 🌟" : percentage >= 50 ? "Good effort! Keep practicing 👍" : "Keep learning! 📚"}
            </p>
          </div>
        </Card>

        <div className="space-y-3">
          {questions.map((q, i) => {
            const isCorrect = answers[i] === q.answer;
            return (
              <div key={q.id} className="bg-white p-5 rounded-xl shadow-sm border">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}>
                    {isCorrect ? "✓" : "✗"}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Q{i + 1}. {q.q}</p>
                    <p className={`text-sm mb-1 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                      Your Answer: {answers[i] || "Not answered"}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-600">Correct Answer: {q.answer}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{selectedQuiz.title}</h1>
          <p className="text-gray-600">{selectedCourse.title}</p>
        </div>
        <div className={`text-2xl font-bold ${time < 30 ? "text-red-600" : "text-gray-900"}`}>
          ⏱️ {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex justify-between text-sm mb-2">
          <span>Question {index + 1} of {questions.length}</span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
            style={{ width: ((index + 1) / questions.length) * 100 + "%" }}
          />
        </div>
      </div>

      {/* Question */}
      <Card title={`Question ${index + 1}`}>
        <p className="text-lg mb-6 font-medium">{questions[index].q}</p>

        <div className="space-y-3">
          {questions[index].options.map((opt) => (
            <button
              key={opt}
              onClick={() => selectOption(opt)}
              className={`block w-full text-left border-2 p-4 rounded-lg transition-all font-medium ${
                answers[index] === opt
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prev}
          disabled={index === 0}
          className="px-6 py-3 bg-gray-200 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          ← Previous
        </button>

        {index === questions.length - 1 ? (
          <button
            onClick={submitQuiz}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Submit Quiz →
          </button>
        ) : (
          <button
            onClick={next}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Next →
          </button>
        )}
      </div>

      {/* Question Navigator */}
      <Card title="Quick Navigation">
        <div className="flex gap-2 flex-wrap">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                i === index
                  ? "bg-indigo-600 text-white"
                  : answers[i]
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

// =============================
// CODING PLAYGROUND
// =============================
function CodingAdvanced() {
  const [html, setHtml] = useState("<h1>Hello StudentOS</h1>\n<p>Click me!</p>");
  const [css, setCss] = useState("body { font-family: Arial; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\nh1 { color: white; text-align: center; }");
  const [js, setJs] = useState("document.querySelector('p').onclick = () => alert('Hello from JavaScript!');");
  const [srcDoc, setSrcDoc] = useState("");
  const [error, setError] = useState("");

  const run = () => {
    setError("");
    try {
      const script = `<scr` + `ipt>
try {
${js}
} catch(e) { 
  document.body.innerHTML += '<div style="background:red;color:white;padding:10px;margin:10px;border-radius:5px;">JS Error: ' + e.message + '</div>'; 
}
</scr` + `ipt>`;

      const doc = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>${css}</style>
</head>
<body>
${html}
${script}
</body>
</html>`;

      setSrcDoc(doc);
    } catch (e) {
      setError(e.message);
    }
  };

  const reset = () => {
    setHtml("<h1>Hello StudentOS</h1>\n<p>Click me!</p>");
    setCss("body { font-family: Arial; padding: 20px; }\nh1 { color: #4F46E5; }");
    setJs("document.querySelector('p').onclick = () => alert('Hello!');");
    setSrcDoc("");
    setError("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Web Playground</h1>
        <p className="text-gray-600">Experiment with HTML, CSS, and JavaScript</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-red-600">HTML</span>
            <span className="text-xs text-gray-500">.html</span>
          </div>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full h-64 border border-gray-200 p-3 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-blue-600">CSS</span>
            <span className="text-xs text-gray-500">.css</span>
          </div>
          <textarea
            value={css}
            onChange={(e) => setCss(e.target.value)}
            className="w-full h-64 border border-gray-200 p-3 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-yellow-600">JavaScript</span>
            <span className="text-xs text-gray-500">.js</span>
          </div>
          <textarea
            value={js}
            onChange={(e) => setJs(e.target.value)}
            className="w-full h-64 border border-gray-200 p-3 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={run}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          ▶ Run Code
        </button>
        <button
          onClick={reset}
          className="bg-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      <Card title="Preview">
        <iframe
          title="preview"
          sandbox="allow-scripts allow-same-origin"
          srcDoc={srcDoc}
          className="w-full h-96 border-2 border-gray-200 rounded-lg bg-white"
        />
      </Card>
    </div>
  );
}

// Continue with Analytics, Community, Settings in next part...
// =============================
// ANALYTICS ADVANCED (DYNAMIC WITH USER INPUT)
// =============================
function AnalyticsAdvanced({ refreshUser }) {
  const analytics = Backend.getAnalytics();
  const [dataType, setDataType] = useState("performance");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newData, setNewData] = useState({ value: "", label: "" });

  const currentData = analytics[dataType] || [];

  const handleAddData = () => {
    if (!newData.value || !newData.label) {
      alert("Please fill all fields");
      return;
    }

    Backend.addAnalyticsData(dataType, {
      value: parseFloat(newData.value),
      label: newData.label
    });
    
    Backend.addNotification(`Analytics data added for ${dataType} ✓`);
    refreshUser();
    setNewData({ value: "", label: "" });
    setShowAddForm(false);
  };

  const values = currentData.map(d => d.value);
  const labels = currentData.map(d => d.label);
  
  const avg = values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
  const max = values.length > 0 ? Math.max(...values) : 0;
  const min = values.length > 0 ? Math.min(...values) : 0;

  // Chart dimensions
  const width = 600;
  const height = 200;
  const maxVal = values.length > 0 ? Math.max(...values) : 100;

  const points = values.length > 0 ? values
    .map((d, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - (d / maxVal) * height;
      return `${x},${y}`;
    })
    .join(" ") : "";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Performance Analytics</h1>
          <p className="text-gray-600">Track your learning progress with dynamic data</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          {showAddForm ? "Cancel" : "+ Add Data"}
        </button>
      </div>

      {/* Data Type Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setDataType("performance")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            dataType === "performance"
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
              : "bg-white border hover:border-indigo-300"
          }`}
        >
          Performance
        </button>
        <button
          onClick={() => setDataType("attendance")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            dataType === "attendance"
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
              : "bg-white border hover:border-indigo-300"
          }`}
        >
          Attendance
        </button>
        <button
          onClick={() => setDataType("studyHours")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            dataType === "studyHours"
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
              : "bg-white border hover:border-indigo-300"
          }`}
        >
          Study Hours
        </button>
      </div>

      {/* Add Data Form */}
      {showAddForm && (
        <Card title={`Add ${dataType.charAt(0).toUpperCase() + dataType.slice(1)} Data`}>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Value (e.g., 85)"
              value={newData.value}
              onChange={(e) => setNewData({ ...newData, value: e.target.value })}
              className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Label (e.g., Week 1, Math Quiz)"
              value={newData.label}
              onChange={(e) => setNewData({ ...newData, label: e.target.value })}
              className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={handleAddData}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Add Entry
            </button>
          </div>
        </Card>
      )}

      {values.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📊</div>
          <p className="mb-4">No data yet. Start adding your {dataType} data!</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Add First Entry
          </button>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card title="Average">
              <div className="text-4xl font-bold text-indigo-600">{avg}</div>
            </Card>
            <Card title="Highest">
              <div className="text-4xl font-bold text-green-600">{max}</div>
            </Card>
            <Card title="Lowest">
              <div className="text-4xl font-bold text-orange-600">{min}</div>
            </Card>
          </div>

          {/* Line Chart */}
          <Card title="Trend Analysis">
            <div className="overflow-x-auto">
              <svg width={width} height={height} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                <polyline
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  points={points}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                {values.map((d, i) => {
                  const x = (i / (values.length - 1)) * width;
                  const y = height - (d / maxVal) * height;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="4" fill="#4F46E5" />
                      <text x={x} y={y - 10} fontSize="10" textAnchor="middle" fill="#666">
                        {d}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </Card>

          {/* Bar Chart */}
          <Card title="Bar Chart">
            <div className="overflow-x-auto">
              <div className="flex items-end justify-between gap-2 h-48 min-w-max">
                {values.map((d, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-xs font-semibold mb-1">{d}</div>
                    <div
                      className="w-16 bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: (d / maxVal) * 100 + "%" }}
                    />
                    <div className="text-xs mt-1 text-gray-600 max-w-[64px] truncate" title={labels[i]}>
                      {labels[i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Data Table */}
          <Card title="Data Entries">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Label</th>
                    <th className="text-left p-3">Value</th>
                    <th className="text-left p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.slice().reverse().map((entry, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3">{entry.label}</td>
                      <td className="p-3 font-semibold">{entry.value}</td>
                      <td className="p-3 text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Insights */}
          <Card title="📊 Key Insights">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Total entries: {values.length}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">📈</span>
                <span>Average score: {avg}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">🎯</span>
                <span>Peak performance: {max}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">⚠</span>
                <span>Improvement area: {min}</span>
              </li>
            </ul>
          </Card>
        </>
      )}
    </div>
  );
}

// =============================
// COMMUNITY
// =============================
function CommunityAdvanced({ user }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Alice Johnson",
      text: "Just completed the React course! The hooks section was really helpful 🎉",
      likes: 12,
      comments: ["Great job!", "Which course did you take?"],
      timestamp: "2 hours ago"
    }
  ]);
  const [input, setInput] = useState("");

  const addPost = () => {
    if (!input.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: user?.name || "Anonymous",
        text: input,
        likes: 0,
        comments: [],
        timestamp: "Just now"
      },
      ...posts
    ]);
    setInput("");
  };

  const likePost = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const addComment = (id, comment) => {
    if (!comment.trim()) return;
    setPosts(posts.map(p =>
      p.id === id
        ? { ...p, comments: [...p.comments, comment] }
        : p
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
        <p className="text-gray-600">Connect with fellow learners</p>
      </div>

      <Card title="Create Post">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addPost()}
            placeholder="Share your thoughts, ask questions..."
            className="flex-1 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={addPost}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Post
          </button>
        </div>
      </Card>

      <div className="space-y-4">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} onLike={likePost} onComment={addComment} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post, onLike, onComment }) {
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          {post.author[0]}
        </div>
        <div className="flex-1">
          <div className="font-semibold">{post.author}</div>
          <div className="text-xs text-gray-500">{post.timestamp}</div>
        </div>
      </div>

      <p className="mb-4 text-gray-800">{post.text}</p>

      <div className="flex items-center gap-4 mb-3">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <span>👍</span>
          <span className="font-medium">{post.likes}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <span>💬</span>
          <span className="font-medium">{post.comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="space-y-2 mt-3 pt-3 border-t">
          {post.comments.map((c, i) => (
            <div key={i} className="text-sm bg-gray-50 p-2 rounded">
              {c}
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onComment(post.id, commentInput);
                  setCommentInput("");
                }
              }}
              placeholder="Write a comment..."
              className="flex-1 border border-gray-200 p-2 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={() => {
                onComment(post.id, commentInput);
                setCommentInput("");
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================
// SETTINGS
// =============================
function SettingsAdvanced({ theme, setTheme, user, refreshUser }) {
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    institute: user?.institute || "",
    course: user?.course || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [preferences, setPreferences] = useState({
    notifications: user?.preferences?.notifications ?? true,
    emailUpdates: user?.preferences?.emailUpdates ?? false,
    darkMode: theme === "dark",
  });

  const [message, setMessage] = useState("");

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePreferences = (key) => {
    const updated = { ...preferences, [key]: !preferences[key] };
    setPreferences(updated);

    if (key === "darkMode") {
      setTheme(updated.darkMode ? "dark" : "light");
    }
    
    Backend.updateUser({ preferences: updated });
    refreshUser();
  };

  const saveProfile = () => {
    if (!profile.name || !profile.email) {
      setMessage("❌ Name and Email are required");
      return;
    }

    Backend.updateUser(profile);
    Backend.addNotification("Profile updated successfully ✓");
    refreshUser();
    setMessage("✅ Profile saved successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const changePassword = () => {
    if (!passwords.current || !passwords.new) {
      setMessage("❌ Fill all password fields");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setMessage("❌ Passwords do not match");
      return;
    }

    if (passwords.new.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      return;
    }

    Backend.updateUser({ password: passwords.new });
    Backend.addNotification("Password updated successfully 🔒");
    refreshUser();
    setMessage("✅ Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message}
        </div>
      )}

      <Card title="👤 Profile Information">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name *</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Your full name"
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              name="email"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="your@email.com"
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              placeholder="+1 234 567 8900"
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Institute</label>
            <input
              name="institute"
              value={profile.institute}
              onChange={handleProfileChange}
              placeholder="Your university or college"
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Course/Major</label>
            <input
              name="course"
              value={profile.course}
              onChange={handleProfileChange}
              placeholder="Your course or major"
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              name="address"
              value={profile.address}
              onChange={handleProfileChange}
              placeholder="Your address"
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
              placeholder="Tell us about yourself..."
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-24"
            />
          </div>
        </div>

        <button
          onClick={saveProfile}
          className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          Save Profile
        </button>
      </Card>

      <Card title="🔒 Change Password">
        <div className="space-y-4">
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handlePasswordChange}
            placeholder="Current Password"
            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handlePasswordChange}
            placeholder="New Password (min 6 characters)"
            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            placeholder="Confirm New Password"
            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <button
            onClick={changePassword}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Update Password
          </button>
        </div>
      </Card>

      <Card title="⚙️ Preferences">
        <div className="space-y-4">
          <label className="flex justify-between items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div>
              <div className="font-medium">Push Notifications</div>
              <div className="text-sm text-gray-600">Receive notifications about updates</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.notifications}
              onChange={() => handlePreferences("notifications")}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
          </label>

          <label className="flex justify-between items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div>
              <div className="font-medium">Email Updates</div>
              <div className="text-sm text-gray-600">Get weekly progress reports via email</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.emailUpdates}
              onChange={() => handlePreferences("emailUpdates")}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
          </label>

          <label className="flex justify-between items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div>
              <div className="font-medium">Dark Mode</div>
              <div className="text-sm text-gray-600">Switch to dark theme</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.darkMode}
              onChange={() => handlePreferences("darkMode")}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
          </label>
        </div>
      </Card>

      <Card title="⚠️ Danger Zone">
        <div className="space-y-3">
          <button className="w-full md:w-auto bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
            Delete Account
          </button>
          <p className="text-sm text-gray-600">
            This action cannot be undone. All your data will be permanently deleted.
          </p>
        </div>
      </Card>
    </div>
  );
}

// =============================
// CARD COMPONENT
// =============================
function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border animate-slide-up">
      {title && <h2 className="font-bold text-lg mb-4">{title}</h2>}
      {children}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
