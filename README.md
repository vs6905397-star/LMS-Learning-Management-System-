🎓 StudyHub — Learning Management System

StudyHub is a full-stack Learning Management System (LMS) built to provide a smooth and responsive platform for discovering courses, enrolling in them, tracking learning progress, and managing a personal learning profile.

The project focuses on building a practical, production-style LMS with authentication, course discovery, filtering, pagination, reviews, wishlist, enrollment, and lesson progress tracking.

---

🚀 Features

🏠 Home

- Modern landing page
- Course discovery
- Responsive layout
- Navigation to different sections of the platform

📚 Courses

- Browse all available courses
- Search courses
- Filter by category
- Filter by difficulty level
- Pagination
- Dynamic course count
- Loading states
- Error states
- Empty-state handling
- Responsive course layout

📖 Course Details

- Course information
- Course instructor
- Course rating
- Course duration
- Chapter/lesson information
- Learning outcomes
- Requirements
- Enrollment
- Wishlist
- Course reviews
- Add a review
- Star rating system

🎥 Learning / Lesson

- View course lessons
- Lesson video/content
- Course curriculum
- Mark lessons as completed
- Track completed lessons
- Continue learning

👤 Profile

- User information
- Enrolled courses
- Learning progress
- Completed courses
- Wishlist
- Profile editing

🔐 Authentication

- User signup
- User login
- Protected backend routes
- Authentication-based course actions
- Protected user-specific operations

⭐ Reviews

- Create reviews
- Display reviews
- Rating system
- Update reviews
- Delete reviews
- User-specific review protection

❤️ Wishlist

- Add courses to wishlist
- Remove/manage wishlist
- Wishlist state connected with user account

🎓 Enrollment

- Enroll in courses
- User-specific enrollments
- Enrollment protection
- Learning progress associated with enrolled courses

⚡ UX & Error Handling

- Loading states
- Error states
- Retry actions
- Toast notifications
- Disabled buttons during API requests
- Responsive UI
- API error handling

---

🛠️ Tech Stack

Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- React Icons / Lucide Icons
- React Toast Notifications

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- JWT Authentication

Development Tools

- Git & GitHub
- VS Code
- Postman
- Vite

---

🏗️ Project Architecture

StudyHub/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── index.js
│   └── package.json
│
└── README.md

---

🔄 Application Flow

User
 │
 ▼
Authentication
 │
 ├── Login
 └── Signup
      │
      ▼
   Home Page
      │
      ▼
   Course Page
      │
      ├── Search
      ├── Category Filter
      ├── Level Filter
      └── Pagination
      │
      ▼
 Course Details
      │
      ├── Enroll
      ├── Wishlist
      └── Reviews
      │
      ▼
 Learning Page
      │
      ├── Watch Lesson
      └── Mark Complete
      │
      ▼
    Profile
      │
      ├── Enrolled Courses
      ├── Progress
      ├── Completed Courses
      └── Wishlist

---

🔑 Authentication & Authorization

StudyHub uses authentication to protect user-specific operations.

Protected operations include:

- Enrollment
- Wishlist management
- Creating reviews
- Updating/deleting reviews
- User profile operations
- Learning progress operations

The backend validates authenticated requests before allowing access to protected resources.

---

🔍 Course Search & Filtering

The course listing supports:

- Search by course information
- Category filtering
- Difficulty-level filtering
- Pagination

Search requests are handled using debouncing so that unnecessary API requests are avoided while the user is typing.

Example:

User types:
React

Instead of:

R → API
Re → API
Rea → API
Reac → API
React → API

Debouncing waits for the user to stop typing before making the request.

---

📄 Pagination

Courses are loaded page-by-page rather than requesting the complete course collection at once.

The UI provides:

- Previous page
- Next page
- Page numbers
- Active page indication
- Dynamic course count

Example:

Showing 1–12 of 120 courses

<  1  2  3  4  5  >

---

⭐ Review System

Users can submit a review with:

- Star rating
- Review text

The review system supports:

Create
  ↓
Read
  ↓
Update
  ↓
Delete

User authorization is applied so users can only perform permitted actions on their own reviews.

---

🎯 Learning Progress

Once a user enrolls in a course, they can access the course lessons.

Each lesson can be marked as completed.

Example:

Course
 ├── Chapter 1
 │    ├── Lesson 1 ✅
 │    ├── Lesson 2 ✅
 │    └── Lesson 3
 │
 └── Chapter 2
      ├── Lesson 4
      └── Lesson 5

This allows the application to track the learner's progress through the course.

---

📱 Responsive Design

StudyHub is designed to work across:

- 💻 Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Mobile

The course filtering experience adapts to smaller screens with a mobile-friendly filter interface.

---

⚙️ Installation

1. Clone the repository

git clone <YOUR_REPOSITORY_URL>

2. Go to the project directory

cd StudyHub

3. Install frontend dependencies

cd frontend
npm install

4. Install backend dependencies

cd ../backend
npm install

---

🔐 Environment Variables

Create a ".env" file inside the backend directory.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Create the frontend environment file if required:

VITE_API_URL=http://localhost:5000/api

«Never commit ".env" files or secret keys to GitHub.»

---

▶️ Run the Project

Start Backend

cd backend
npm run dev

Start Frontend

Open another terminal:

cd frontend
npm run dev

The application will then be available on the local Vite development server.

---

🧪 API Testing

The backend REST APIs can be tested using Postman.

Main API areas include:

/auth
/courses
/enrollment
/wishlist
/reviews
/profile
/lessons
/progress

---

🛡️ Error Handling

The application handles common API states including:

Loading
   ↓
Success
   ↓
Error
   ↓
Retry

Errors are displayed using user-friendly UI states and toast notifications instead of exposing raw API errors to the user.

---

📸 Screenshots

Home

Add screenshot here

Courses

Add screenshot here

Course Details

Add screenshot here

Learning Page

Add screenshot here

Profile

Add screenshot here

Review Modal

Add screenshot here

---

📈 Future Improvements

Possible future improvements include:

- Course sorting
- Online payments
- Instructor dashboard
- Admin dashboard
- Course creation
- Video hosting
- Certificates
- Advanced progress analytics
- Course recommendations
- Notifications
- Dark mode

---

🎯 What I Learned

While building StudyHub, I worked with:

- Full-stack React application architecture
- REST API integration
- Authentication & authorization
- MongoDB & Mongoose
- Protected routes
- CRUD operations
- Search & filtering
- Debouncing
- Pagination
- Enrollment systems
- Wishlist functionality
- Review systems
- Learning progress tracking
- Responsive UI
- API error handling
- Loading and empty states
- Git/GitHub workflow

---

👨‍💻 Developer

Built with ❤️ as a full-stack development project.

StudyHub — Learn. Track. Grow.

---

📄 License

This project is created for educational and portfolio purposes.
