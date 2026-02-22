1. 📌 Project Overview

Smart Study Planner is a full-stack web application that allows users to manage their study workflow efficiently by organizing subjects, tasks, and progress in a secure and interactive dashboard.

The system provides user authentication, task tracking, and navigation-based access control, ensuring that each user can manage their personal study plan securely.

This application is built using Next.js, NextAuth, Prisma, MySQL, and Tailwind CSS.

2. 🎯 Objectives

The main objectives of the project are:

Provide secure user authentication

Allow users to create and manage tasks

Organize tasks under subjects

Track progress through dashboard

Provide easy navigation across all pages

Ensure secure access control

3. 🧑‍💻 Tech Stack
Frontend
Technology	Purpose
Next.js (App Router)	Full stack framework
Tailwind CSS	UI Styling
React	UI Components
Backend
Technology	Purpose
Next.js API Routes	Backend logic
NextAuth.js	Authentication
Prisma ORM	Database interaction
Database
Technology	Purpose
MySQL	Data storage
4. 🏗️ System Architecture
User
 ↓
Frontend (Next.js)
 ↓
NextAuth Authentication
 ↓
API Routes
 ↓
Prisma ORM
 ↓
MySQL Database
5. 📁 Project Structure
smart-study-planner/

app/
 ├── api/
 │   ├── auth/
 │   ├── users/
 │   ├── tasks/
 │   └── subjects/
 │
 ├── dashboard/
 ├── tasks/
 ├── subjects/
 ├── page.js
 ├── layout.js

components/
 ├── navbar.js

lib/
 ├── auth.js
 ├── prisma.js

prisma/
 ├── schema.prisma

.env
package.json
6. 🔐 Authentication Module

Authentication is implemented using NextAuth.js Credentials Provider.

Features:

User Registration

User Login

Session Management

Route Protection

7. 👤 User Module

Users can:

Register account

Login securely

Logout

User data stored in database:

User Table

id
name
email
password
8. 📚 Subject Module

Users can:

Create subject

View subjects

Delete subjects

Database:

Subject Table

id
name
userId
9. ✅ Task Module

Users can:

Create tasks

Mark tasks completed

Delete tasks

View all tasks

Database:

Task Table

id
title
status
deadline
subjectId
10. 📊 Dashboard Module

Dashboard displays:

Total Tasks

Completed Tasks

Pending Tasks

Progress %

Progress formula:

Progress = (Completed / Total) × 100
11. 🧭 Navigation System

Navigation is implemented using:

Global Navbar

Dashboard Buttons

Protected Routes

Pages accessible:

Dashboard
Tasks
Subjects
Logout
12. 🔒 Security Features

Security implemented using:

NextAuth session

Protected routes

Password hashing using bcrypt

JWT authentication

13. 🗄️ Database Schema
User
id
name
email
password
Subject
id
name
userId
Task
id
title
status
deadline
subjectId
14. 🎨 User Interface Features

UI features include:

Modern Tailwind design

Dashboard cards

Navigation menu

Responsive layout

Interactive buttons

15. ⚙️ Installation Guide
Step 1

Clone project

git clone repository-link
Step 2

Install dependencies

npm install
Step 3

Setup environment file

.env

Add:

DATABASE_URL=
NEXTAUTH_SECRET=
Step 4

Run database migration

npx prisma migrate dev
Step 5

Run project

npm run dev
16. 🚀 Application Flow
User opens app
 ↓
Login/Register
 ↓
Dashboard
 ↓
Navigate to Tasks / Subjects
 ↓
Manage Tasks
 ↓
Logout
17. 📸 Screens Included

System contains:

Login Page

Dashboard

Tasks Page

Subjects Page

18. ⭐ Key Features

Main features:

Secure login

Task management

Subject management

Dashboard analytics

Protected routes

Modern UI

19. 🎯 Advantages

Advantages:

Improves productivity

Easy to use

Secure

Organized workflow

20. 🔮 Future Enhancements

Future scope:

Email reminders

Notifications

Dark mode

Mobile app version

Charts and analytics

21. 📌 Conclusion

The Smart Study Planner is a complete full-stack application that demonstrates:

Authentication

Database management

API development

Frontend design

Secure architecture

This project is suitable for:

Academic submission

Portfolio

Resume


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
