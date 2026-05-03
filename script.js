// Simple data storage using localStorage
let currentUser = null;
let users = [];
let tasks = [];
let courses = [];
let attendance = [];
let currentQuiz = null;
let currentQuestionIndex = 0;
let quizAnswers = {};
let quizTimer = null;
let timeRemaining = 120;
let communityPosts = [];

// Initialize app on page load
window.onload = function() {
    loadData();
    checkLogin();
};

// Load data from localStorage
function loadData() {
    const savedUsers = localStorage.getItem('studentos_users');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('studentos_users', JSON.stringify(users));
}

// Check if user is already logged in
function checkLogin() {
    const savedSession = localStorage.getItem('studentos_session');
    if (savedSession) {
        const session = JSON.parse(savedSession);
        currentUser = users.find(u => u.email === session.email);
        if (currentUser) {
            showMainApp();
        }
    }
}

// Show signup page
function showSignup() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'block';
}

// Show login page
function showLogin() {
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
}

// Signup function
function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    const errorMsg = document.getElementById('signupErrorMsg');
    
    // Check if fields are empty
    if (!name || !email || !password) {
        errorMsg.textContent = 'Please fill all fields';
        errorMsg.classList.add('show');
        return;
    }
    
    // Check if passwords match
    if (password !== confirm) {
        errorMsg.textContent = 'Passwords do not match';
        errorMsg.classList.add('show');
        return;
    }
    
    // Check if password is long enough
    if (password.length < 6) {
        errorMsg.textContent = 'Password must be at least 6 characters';
        errorMsg.classList.add('show');
        return;
    }
    
    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        errorMsg.textContent = 'Email already registered';
        errorMsg.classList.add('show');
        return;
    }
    
    // Create new user
    const newUser = {
        name: name,
        email: email,
        password: password,
        institute: '',
        tasks: [],
        courses: getDefaultCourses(),
        attendance: []
    };
    
    users.push(newUser);
    saveData();
    
    // Auto login after signup
    currentUser = newUser;
    localStorage.setItem('studentos_session', JSON.stringify({ email: email }));
    showMainApp();
}

// Login function
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorMsg = document.getElementById('errorMsg');
    
    // Check if fields are empty
    if (!email || !password) {
        errorMsg.textContent = 'Please enter email and password';
        errorMsg.classList.add('show');
        return;
    }
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        errorMsg.textContent = 'Invalid email or password';
        errorMsg.classList.add('show');
        return;
    }
    
    // Login successful
    currentUser = user;
    localStorage.setItem('studentos_session', JSON.stringify({ email: email }));
    showMainApp();
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('studentos_session');
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
    
    // Clear input fields
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

// Show main app after login
function showMainApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    
    // Update user name
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('welcomeName').textContent = currentUser.name.split(' ')[0];
    
    // Load user data
    tasks = currentUser.tasks || [];
    courses = currentUser.courses || getDefaultCourses();
    attendance = currentUser.attendance || [];
    communityPosts = currentUser.communityPosts || getDefaultCommunityPosts();
    
    // Show dashboard
    showPage('dashboard');
    loadCourses();
    loadTasks();
    loadAttendance();
    loadCommunityFeed();
}

// Get default courses
function getDefaultCourses() {
    return [
        {
            id: 1,
            title: 'React Mastery',
            instructor: 'CodeWithHarry',
            progress: 0,
            totalLessons: 12,
            embedUrl: 'https://www.youtube.com/embed/-mJFZp84TIY',
            notes: '',
            quiz: {
                title: 'React Basics Quiz',
                questions: [
                    { q: 'What is JSX?', options: ['JavaScript XML', 'Java Syntax', 'JSON Extension'], answer: 'JavaScript XML' },
                    { q: 'What is a component?', options: ['Reusable UI piece', 'A function', 'A class'], answer: 'Reusable UI piece' },
                    { q: 'What hook manages state?', options: ['useState', 'useEffect', 'useRef'], answer: 'useState' }
                ]
            }
        },
        {
            id: 2,
            title: 'DSA Fundamentals',
            instructor: 'Apna College',
            progress: 0,
            totalLessons: 20,
            embedUrl: 'https://www.youtube.com/embed/VbMtiEicv_I',
            notes: '',
            quiz: {
                title: 'Arrays & Complexity',
                questions: [
                    { q: 'Time complexity of linear search?', options: ['O(n)', 'O(log n)', 'O(1)'], answer: 'O(n)' },
                    { q: 'Best sorting algorithm?', options: ['Quick Sort', 'Bubble Sort', 'Selection Sort'], answer: 'Quick Sort' },
                    { q: 'Stack follows?', options: ['LIFO', 'FIFO', 'Random'], answer: 'LIFO' }
                ]
            }
        },
        {
            id: 3,
            title: 'Web Development',
            instructor: 'CodeWithHarry',
            progress: 0,
            totalLessons: 15,
            embedUrl: 'https://www.youtube.com/embed/tVzUXW6csiO',
            notes: '',
            quiz: {
                title: 'HTML & CSS Basics',
                questions: [
                    { q: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style System'], answer: 'Cascading Style Sheets' },
                    { q: 'Which tag for links?', options: ['<a>', '<link>', '<href>'], answer: '<a>' },
                    { q: 'Flexbox container property?', options: ['display: flex', 'flex: 1', 'flexbox: true'], answer: 'display: flex' }
                ]
            }
        }
    ];
}

// Show different pages
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.content-page');
    pages.forEach(page => page.style.display = 'none');
    
    // Remove active class from all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    
    // Show selected page
    document.getElementById('page-' + pageName).style.display = 'block';
    
    // Add active class to selected menu item
    const menuItem = document.getElementById('menu-' + pageName);
    if(menuItem) menuItem.classList.add('active');
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'courses': 'My Courses',
        'todo': 'To-Do List',
        'quiz': 'Quiz',
        'attendance': 'Attendance',
        'settings': 'Settings',
        'learning-hub': 'Learning Hub',
        'community': 'Community'
    };
    if (titles[pageName]) document.getElementById('pageTitle').textContent = titles[pageName];
    
    // Load page specific data
    if (pageName === 'settings') {
        loadSettings();
    }
}

// Load courses
function loadCourses() {
    const coursesList = document.getElementById('coursesList');
    coursesList.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        
        courseCard.innerHTML = `
            <div class="course-header">
                <h4 style="color: white;">${course.title}</h4>
            </div>
            <div class="course-body">
                <h4>${course.title}</h4>
                <p>by ${course.instructor}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${course.progress}%"></div>
                </div>
                <p style="font-size: 12px; margin-bottom: 10px;">${course.progress}% Complete</p>
                <button class="course-btn" onclick="updateProgress(${course.id})">Continue Learning</button>
            </div>
        `;
        
        coursesList.appendChild(courseCard);
    });
    
    // Load quiz courses
    loadQuizCourses();
}

// Update course progress
function updateProgress(courseId) {
    const course = courses.find(c => c.id === courseId);
    
    // Open Learning Hub
    showPage('learning-hub');
    
    // Set active course context
    document.getElementById('hubCourseTitle').textContent = course.title;
    
    // Set iframe src
    const iframe = document.getElementById('hubVideoEmbed');
    if (course.embedUrl) {
        iframe.src = course.embedUrl;
    } else {
        // Fallback to Apna College DSA
        iframe.src = 'https://www.youtube.com/embed/VbMtiEicv_I';
    }
    
    // Load notes
    document.getElementById('hubNotes').value = course.notes || '';
    document.getElementById('hubNotes').dataset.courseId = courseId;
    
    // Update progress
    if (course.progress < 100) {
        course.progress += 10;
        if (course.progress > 100) course.progress = 100;
        currentUser.courses = courses;
        updateUserData();
        loadCourses();
    }
}

// Load tasks
function loadTasks() {
    const taskList = document.getElementById('taskList');
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<p class="empty-msg">No tasks yet. Add your first task!</p>';
        return;
    }
    
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item' + (task.done ? ' completed' : '');
        
        taskItem.innerHTML = `
            <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${index})">
            <label>${task.text}</label>
            <button class="task-delete" onclick="deleteTask(${index})">Delete</button>
        `;
        
        taskList.appendChild(taskItem);
    });
}

// Add new task
function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (!text) {
        alert('Please enter a task');
        return;
    }
    
    tasks.push({
        text: text,
        done: false
    });
    
    input.value = '';
    
    currentUser.tasks = tasks;
    updateUserData();
    loadTasks();
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    
    currentUser.tasks = tasks;
    updateUserData();
    loadTasks();
}

// Delete task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        
        currentUser.tasks = tasks;
        updateUserData();
        loadTasks();
    }
}

// Load quiz courses
function loadQuizCourses() {
    const quizCourseList = document.getElementById('quizCourseList');
    quizCourseList.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'quiz-course-card';
        
        courseCard.innerHTML = `
            <h4>${course.title}</h4>
            <p>${course.quiz.questions.length} questions</p>
            <button class="btn-primary" onclick="startQuiz(${course.id})">Start Quiz</button>
        `;
        
        quizCourseList.appendChild(courseCard);
    });
}

// Start quiz
function startQuiz(courseId) {
    const course = courses.find(c => c.id === courseId);
    currentQuiz = course.quiz;
    currentQuestionIndex = 0;
    quizAnswers = {};
    timeRemaining = 120; // 2 minutes
    
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizActive').style.display = 'block';
    
    loadQuestion();
    startTimer();
}

// Load question
function loadQuestion() {
    const questions = currentQuiz.questions;
    const question = questions[currentQuestionIndex];
    
    document.getElementById('questionNum').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('questionText').textContent = question.q;
    
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';
    
    question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        
        if (quizAnswers[currentQuestionIndex] === option) {
            btn.classList.add('selected');
        }
        
        btn.onclick = function() {
            selectOption(option);
        };
        
        optionsList.appendChild(btn);
    });
    
    // Show/hide navigation buttons
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'block';
    } else {
        document.getElementById('nextBtn').style.display = 'block';
        document.getElementById('submitBtn').style.display = 'none';
    }
}

// Select option
function selectOption(option) {
    quizAnswers[currentQuestionIndex] = option;
    loadQuestion();
}

// Previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Next question
function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

// Start timer
function startTimer() {
    quizTimer = setInterval(function() {
        timeRemaining--;
        
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        document.getElementById('timer').textContent = 
            minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        
        if (timeRemaining <= 0) {
            clearInterval(quizTimer);
            submitQuiz();
        }
    }, 1000);
}

// Submit quiz
function submitQuiz() {
    clearInterval(quizTimer);
    
    let score = 0;
    const questions = currentQuiz.questions;
    
    questions.forEach((q, index) => {
        if (quizAnswers[index] === q.answer) {
            score++;
        }
    });
    
    const percentage = Math.round((score / questions.length) * 100);
    
    document.getElementById('quizActive').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    
    document.getElementById('scorePercent').textContent = percentage + '%';
    document.getElementById('scoreText').textContent = 
        `You scored ${score} out of ${questions.length}`;
}

// Reset quiz
function resetQuiz() {
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizStart').style.display = 'block';
    
    currentQuiz = null;
    currentQuestionIndex = 0;
    quizAnswers = {};
}

// Mark attendance
function markAttendance() {
    const subject = document.getElementById('attendanceSubject').value;
    const status = document.getElementById('attendanceStatus').value;
    
    if (!subject) {
        alert('Please select a subject');
        return;
    }
    
    const record = {
        subject: subject,
        status: status,
        date: new Date().toLocaleDateString()
    };
    
    attendance.push(record);
    
    currentUser.attendance = attendance;
    updateUserData();
    loadAttendance();
    
    alert('Attendance marked successfully!');
}

// Load attendance
function loadAttendance() {
    const attendanceList = document.getElementById('attendanceList');
    
    if (attendance.length === 0) {
        attendanceList.innerHTML = '<p class="empty-msg">No records yet</p>';
        document.getElementById('totalClasses').textContent = '0';
        document.getElementById('presentClasses').textContent = '0';
        document.getElementById('attendancePercent').textContent = '0%';
        return;
    }
    
    attendanceList.innerHTML = '';
    
    // Show recent 10 records
    const recentRecords = attendance.slice(-10).reverse();
    
    recentRecords.forEach(record => {
        const item = document.createElement('div');
        item.className = 'attendance-item';
        
        const badgeClass = record.status === 'present' ? 'badge-present' : 'badge-absent';
        
        item.innerHTML = `
            <div>
                <strong>${record.subject}</strong>
                <p style="font-size: 12px; color: #999;">${record.date}</p>
            </div>
            <span class="attendance-badge ${badgeClass}">${record.status.toUpperCase()}</span>
        `;
        
        attendanceList.appendChild(item);
    });
    
    // Update stats
    const totalClasses = attendance.length;
    const presentClasses = attendance.filter(a => a.status === 'present').length;
    const percent = Math.round((presentClasses / totalClasses) * 100);
    
    document.getElementById('totalClasses').textContent = totalClasses;
    document.getElementById('presentClasses').textContent = presentClasses;
    document.getElementById('attendancePercent').textContent = percent + '%';
}

// Load settings
function loadSettings() {
    document.getElementById('settingsName').value = currentUser.name;
    document.getElementById('settingsEmail').value = currentUser.email;
    document.getElementById('settingsInstitute').value = currentUser.institute || '';
}

// Save settings
function saveSettings() {
    const name = document.getElementById('settingsName').value;
    const email = document.getElementById('settingsEmail').value;
    const institute = document.getElementById('settingsInstitute').value;
    
    if (!name || !email) {
        alert('Name and Email are required');
        return;
    }
    
    currentUser.name = name;
    currentUser.email = email;
    currentUser.institute = institute;
    
    updateUserData();
    
    // Update display
    document.getElementById('userName').textContent = name;
    document.getElementById('welcomeName').textContent = name.split(' ')[0];
    
    alert('Settings saved successfully!');
}

// Update user data in storage
function updateUserData() {
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        saveData();
    }
}

// ============================================
// NEW FEATURES: LEARNING HUB & COURSES
// ============================================

function openAddCourseModal() {
    document.getElementById('addCourseModal').style.display = 'flex';
}

function closeAddCourseModal() {
    document.getElementById('addCourseModal').style.display = 'none';
    document.getElementById('newCourseTitle').value = '';
    document.getElementById('newCourseInstructor').value = '';
    document.getElementById('newCourseLink').value = '';
}

function addNewCourse() {
    const title = document.getElementById('newCourseTitle').value;
    const instructor = document.getElementById('newCourseInstructor').value || 'Self Study';
    const link = document.getElementById('newCourseLink').value;
    
    if(!title) {
        alert("Course title is required!");
        return;
    }
    
    // Extract embed from youtube link if necessary
    let embedUrl = link;
    if(link.includes('youtube.com/watch?v=')) {
        embedUrl = link.replace('watch?v=', 'embed/');
    } else if (link.includes('youtu.be/')) {
        embedUrl = link.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    
    const newCourse = {
        id: Date.now(),
        title: title,
        instructor: instructor,
        progress: 0,
        totalLessons: 10,
        embedUrl: embedUrl || 'https://www.youtube.com/embed/VbMtiEicv_I',
        notes: '',
        quiz: { title: 'Basic Quiz', questions: [] }
    };
    
    courses.push(newCourse);
    currentUser.courses = courses;
    updateUserData();
    loadCourses();
    closeAddCourseModal();
}

function saveCourseNotes() {
    const notesBox = document.getElementById('hubNotes');
    const courseId = parseInt(notesBox.dataset.courseId);
    const course = courses.find(c => c.id === courseId);
    if(course) {
        course.notes = notesBox.value;
        currentUser.courses = courses;
        updateUserData();
        alert('Notes saved successfully!');
    }
}

function searchResearch() {
    const query = document.getElementById('hubSearchInput').value;
    if(query) {
        window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
    }
}

// ============================================
// NEW FEATURES: NOTIFICATIONS & SETTINGS
// ============================================

function toggleNotifications() {
    const dropdown = document.getElementById('notifDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    document.getElementById('notifBadge').style.display = 'none'; // hide badge after viewing
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.notification-container');
    const dropdown = document.getElementById('notifDropdown');
    if (container && dropdown && !container.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('settingsAvatar').src = e.target.result;
            document.getElementById('headerAvatar').src = e.target.result;
            currentUser.avatar = e.target.result;
            updateUserData();
        }
        reader.readAsDataURL(file);
    }
}

function selectAvatar(src) {
    document.getElementById('settingsAvatar').src = src;
    document.getElementById('headerAvatar').src = src;
    currentUser.avatar = src;
    updateUserData();
}

function changePassword() {
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    if (current === currentUser.password) {
        if(newPass.length >= 6) {
            currentUser.password = newPass;
            updateUserData();
            alert("Password updated successfully!");
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
        } else {
            alert("New password must be at least 6 characters.");
        }
    } else {
        alert("Incorrect current password.");
    }
}

function savePreferences() {
    alert("Preferences saved successfully!");
}

function toggleDarkMode() {
    const isDark = document.getElementById('prefDark').checked;
    if(isDark) {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#e5e7eb';
        document.querySelectorAll('.stat-card, .section, .course-card, .welcome-box').forEach(el => {
            el.style.backgroundColor = '#2d3748';
            el.style.color = '#e5e7eb';
        });
        document.querySelectorAll('h1, h2, h3, h4, label, p').forEach(el => el.style.color = '#e5e7eb');
    } else {
        document.body.style.backgroundColor = '#f5f5f5';
        document.body.style.color = '#333';
        document.querySelectorAll('.stat-card, .section, .course-card, .welcome-box').forEach(el => {
            el.style.backgroundColor = 'white';
            el.style.color = '#333';
        });
        document.querySelectorAll('h1, h2, h3, h4, label').forEach(el => el.style.color = '#333');
    }
}

// To-Do Clear function
function clearCompletedTasks() {
    tasks = tasks.filter(t => !t.done);
    currentUser.tasks = tasks;
    updateUserData();
    loadTasks();
}

// ============================================
// NEW FEATURES: COMMUNITY
// ============================================

function getDefaultCommunityPosts() {
    return [
        {
            id: 1,
            author: "System",
            text: "Welcome to the StudentOS Community! Feel free to share your thoughts here.",
            likes: 5,
            likedByMe: false,
            comments: []
        },
        {
            id: 2,
            author: "Jane Smith",
            text: "Does anyone have good resources for learning React Hooks?",
            likes: 12,
            likedByMe: true,
            comments: [
                {
                    id: 201,
                    author: "Alex",
                    text: "Check out CodeWithHarry's latest playlist!",
                    likes: 3,
                    likedByMe: false
                }
            ]
        }
    ];
}

function loadCommunityFeed() {
    const feed = document.getElementById('communityFeed');
    if(!feed) return;
    
    feed.innerHTML = '';
    
    // Sort posts: newest first
    const sortedPosts = [...communityPosts].reverse();
    
    sortedPosts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        let commentsHTML = '';
        if(post.comments && post.comments.length > 0) {
            post.comments.forEach(comment => {
                commentsHTML += `
                    <div class="comment-item">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&background=random" alt="Avatar">
                        <div class="comment-box">
                            <h5>${comment.author}</h5>
                            <p>${comment.text}</p>
                            <div class="comment-actions">
                                <button class="action-btn ${comment.likedByMe ? 'liked' : ''}" onclick="toggleLike(${post.id}, ${comment.id})">
                                    ${comment.likedByMe ? '❤️' : '🤍'} ${comment.likes}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        postCard.innerHTML = `
            <div class="post-header">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=random" alt="Avatar">
                <div>
                    <h4>${post.author}</h4>
                    <small>Just now</small>
                </div>
            </div>
            <div class="post-content">
                ${post.text}
            </div>
            <div class="post-actions">
                <button class="action-btn ${post.likedByMe ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    ${post.likedByMe ? '❤️' : '🤍'} ${post.likes} Likes
                </button>
            </div>
            <div class="comments-section">
                ${commentsHTML}
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <input type="text" id="commentInput_${post.id}" placeholder="Write a comment..." class="input-field" style="margin: 0; flex: 1; padding: 8px; font-size: 13px;">
                    <button onclick="addComment(${post.id})" class="btn-primary" style="margin: 0; width: auto; padding: 8px 15px; font-size: 13px;">Reply</button>
                </div>
            </div>
        `;
        feed.appendChild(postCard);
    });
}

function addPost() {
    const textInput = document.getElementById('newPostText');
    const text = textInput.value.trim();
    if(!text) return;
    
    const newPost = {
        id: Date.now(),
        author: currentUser.name,
        text: text,
        likes: 0,
        likedByMe: false,
        comments: []
    };
    
    communityPosts.push(newPost);
    currentUser.communityPosts = communityPosts;
    updateUserData();
    
    textInput.value = '';
    loadCommunityFeed();
}

function addComment(postId) {
    const input = document.getElementById('commentInput_' + postId);
    const text = input.value.trim();
    if(!text) return;
    
    const post = communityPosts.find(p => p.id === postId);
    if(post) {
        if(!post.comments) post.comments = [];
        post.comments.push({
            id: Date.now(),
            author: currentUser.name,
            text: text,
            likes: 0,
            likedByMe: false
        });
        currentUser.communityPosts = communityPosts;
        updateUserData();
        loadCommunityFeed();
    }
}

function toggleLike(postId, commentId = null) {
    const post = communityPosts.find(p => p.id === postId);
    if(post) {
        if(commentId) {
            const comment = post.comments.find(c => c.id === commentId);
            if(comment) {
                if(comment.likedByMe) {
                    comment.likes--;
                    comment.likedByMe = false;
                } else {
                    comment.likes++;
                    comment.likedByMe = true;
                }
            }
        } else {
            if(post.likedByMe) {
                post.likes--;
                post.likedByMe = false;
            } else {
                post.likes++;
                post.likedByMe = true;
            }
        }
        currentUser.communityPosts = communityPosts;
        updateUserData();
        loadCommunityFeed();
    }
}

// To-Do Enter key support
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
