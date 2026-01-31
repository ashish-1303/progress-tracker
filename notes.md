# AcadTrack – Progress Tracker Web-App

## 1. Project Overview

**AcadTrack** is a web application designed for students to :

* Register & Login securely
* Add academic works (assignments / projects)
* Track completed & pending works
* Manage marks and calculate percentage
* Visualize progress using charts

---


### BACKEND EXPLANATION

=> The backend is responsible for:

* Authentication & Authorization
* Business logic
* Database interaction
* API creation

---


# Backend Files & Folders

* config/

**Purpose:** Database connection & configuration

1) db.js

  * Connects Node.js server to MongoDB Atlas
  * Uses mongoose

---


* models/

Purpose : Database schema & validation

1) User.js

  * User schema (name, email, password)
  * Password hashing using bcrypt


2) Work.js

  * Assignment/Project schema
  * Fields: title, description, status, user


3) Marks.js

  * Marks schema
  * Fields: subject, totalMarks, obtainedMarks, CGPA, user

---


* controllers/

Purpose : Handles request logic (MVC pattern)

1) authController.js

  * Register user
  * Login user
  * Generate JWT token

2) workController.js

  * Add new work
  * Fetch all works
  * Update status (pending/completed)
  * Delete work

3) marksController.js

  * Add marks
  * Calculate CGPA based on marks

---


* routes/

Purpose : API endpoints mapping

1) authRoutes.js

  * `/api/auth/register`
  * `/api/auth/login`

2) workRoutes.js

  * `/api/work/add`
  * `/api/work/get`

3) marksRoutes.js`

  * `/api/marks/add`
  * `/api/marks/get`

---


* middleware/

Purpose : Request interception

1) authMiddleware.js

  * Verifies JWT token
  * Protects private routes

---


* server.js (main entry-point)

Purpose :Backend entry point

* Initializes Express app
* Uses middleware (CORS, JSON)
* Connects database
* Starts server

---


### FRONTEND EXPLANATION

=> The frontend is responsible for:

* UI rendering
* User interaction
* Calling backend APIs
* Managing app state

---



# Frontend Files & Folders

* api/

Purpose :  Central API configuration

1) api.js

  * Axios instance
  * Base URL for backend
  * Automatically sends token in headers

---


* context/

Purpose : Global authentication state

1) AuthContext.jsx

  * Stores logged‑in user
  * Handles login/logout
  * Protects routes

---

* pages/ 

1) Login.jsx

  * User login form
  * Token storage

2) Register.jsx

  * User registration

3) Dashboard.jsx

  * Main student dashboard
  * Contains AddWork, WorkList, Marks

4) Progress.jsx

  * Displays charts for completed & pending works

5) AddWork.jsx 

  * Add assignment/project
  * Sends data to backend

6) WorkList.jsx 

  * Displays list of works
  * Toggle status

7) Marks.jsx 

  * Enter marks
  * Calculate percentage and CGPA


