# UniHub
A campus web app for UTRGV College of Engineering and Computer Science (CECS) students 
to find study partners, discover clubs, stay updated on campus events, and connect with peers.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [CRUD Convention](#crud-convention)
- [Tech Stack](#tech-stack)
- [How to Run the App](#how-to-run-the-app)
- [Agile Planning](#agile-planning)
- [Contributors](#contributors)

---

## Overview
UniHub is built specifically for UTRGV CECS students. The app is designed to make campus 
life easier by helping students find academic support, get involved, and stay connected.

| Focus | Description |
|-------|-------------|
| Study Partners | Connect with classmates by course or subject |
| Campus Events | Browse and RSVP to CECS and campus events |
| Clubs | Find and join UTRGV CECS student organizations |
| Meet People | Connect with students who share your major or interests |

---

## Features

### General Features
| Feature | Description |
|---------|-------------|
| User Registration and Login | Students can create an account and log in securely |
| Student Profile | Each student has a profile with their major, year, and courses |
| Study Partner Matching | Find classmates by course or subject to study with |
| Club Directory | Browse and join UTRGV CECS student organizations |
| Event Board | View and RSVP to upcoming CECS and campus events |
| Announcements | Stay updated with school-wide and club announcements |

### Role-Based Features

#### Student
| Feature | Description |
|---------|-------------|
| Browse Events | View and RSVP to campus and CECS events |
| Find Study Partners | Search for classmates by course or subject |
| Join Clubs | Browse and join student organizations |
| View Announcements | See school-wide and club announcements |

#### Club Officer
| Feature | Description |
|---------|-------------|
| Post Club Events | Create and publish events for their club |
| Post Club Announcements | Send announcements to club members |
| Edit Club Profile | Update the club name, description, and details |

#### Admin
| Feature | Description |
|---------|-------------|
| Toggle Mode | Switch between admin control panel and standard member view |
| School-Wide Announcements | Post announcements visible to all users |
| Manage Users | View, edit, and remove user accounts |
| Manage Clubs and Events | Oversee and moderate all clubs and events on the platform |

---

## CRUD Convention
| Operation | Description |
|-----------|-------------|
| Create | Register an account, build a profile, create groups, and post events |
| Read | Browse other students profiles, view events, and read posts |
| Update | Edit your profile, update your posts and events |
| Delete | Remove your posts, events, or groups |

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React + Vite (JavaScript) |
| Backend | Django (Python) |
| Styling | HTML + CSS |
| Database | SQLite |
| Authentication | Django Built-in Auth System |
| Version Control | Git and GitHub |

---

## How to Run the App

### Prerequisites
| Requirement | Version |
|-------------|---------|
| Node.js | v18+ |
| Python | 3.x |

### Terminal 1 — Frontend (React)
1. Clone the repository: `git clone https://github.com/DanielAguilar25/UniHub.git`
2. Navigate into the project: `cd UniHub`
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`

Frontend runs at: `http://localhost:5173`

### Terminal 2 — Backend (Django)
1. Navigate into the backend folder: `cd UniHub/backend`
2. Install Django: `pip install django`
3. Run migrations: `python manage.py migrate`
4. Start the server: `python manage.py runserver`

Backend runs at: `http://localhost:8000`

> Both terminals must be running at the same time for the app to work.

---

## Agile Planning

UniHub is developed using an Agile methodology, broken into 6 sprints across the semester.

| Sprint | Timeline | Goal |
|--------|----------|------|
| Sprint 1 | Feb - Mar 6 | Environment setup, project planning, and requirements |
| Sprint 2 | Mar - Apr 10 | Wireframes, user stories, home view, and user management |
| Sprint 3 | Apr | Study partner matching and club directory |
| Sprint 4 | Apr | Event board and announcements system |
| Sprint 5 | Late Apr | Frontend and backend integration |
| Sprint 6 | Early May | Testing, bug fixes, polish, and final documentation |

> Note: Sprint goals and timelines are subject to change as the project evolves.


---

## Contributors
| Name | GitHub | Contribution |
|------|--------|--------------|
| Daniel Aguilar | @DanielAguilar25 | Project setup and frontend development |
| Victor Chairez | @victorabiezer | Frontend & backend development |
| Elyssa Guajardo | @nyoomitsellie | Frontend & backend development |