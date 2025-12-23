# 🎓 EduBoard – Student Management System (MERN Stack)

EduBoard is a full-stack Student Management System built using the MERN stack.  
It provides secure, role-based access for Admins and Students with authentication, dashboards, and CRUD functionality.

This project is designed to demonstrate real-world MERN architecture, authentication flows, pagination, and responsive UI.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Secure password hashing with bcrypt
- Role-based access control (Admin / Student)
- Protected routes
- Persistent login on refresh

### 👨‍💼 Admin Dashboard
- View all students
- Add new students
- Edit student details
- Delete students
- Search students
- Client-side pagination
- View admin profile (read-only)

### 👨‍🎓 Student Dashboard
- View personal profile
- Edit profile details
- Change password
- Secure access to own data only
- Read-only profile view

### 📱 UI & UX
- Fully responsive design
- Mobile-friendly layouts
- Clean modern UI with Tailwind CSS
- Smooth client-side routing using React Router
- Icons powered by Lucide React 

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Context API
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Bcrypt.js

### Deployment
- Frontend: Vercel
- Backend: Node.js server
- Database: MongoDB Atlas / Local MongoDB

---

## 🔑 Demo Credentials

### Admin Login
Email: tyagiaryan469@gmail.com  
Password: 12345678

### Student Login
Email: akshit@gmail.com  
Password: 989795

---

## 📂 Project Structure

EduBoard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── routes/
│   ├── public/
│   ├── vercel.json
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── config/
│   └── package.json

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/Aryantvats/EduBoard.git  
cd EduBoard

---

### 2️⃣ Backend Setup

cd backend  
npm install  
npm run server

Create a `.env` file in the backend folder:

PORT=5000  
MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_jwt_secret  

---

### 3️⃣ Frontend Setup

cd frontend  
npm install  
npm run dev  

Create a `.env` file in the frontend folder:

VITE_API_BASE_URL=http://localhost:5000
---

## 🌐 Deployment Notes

- React Router reload issue fixed using `vercel.json`
- SPA routing works correctly on page refresh
- `vercel.json` is placed inside the frontend folder
- Backend APIs are protected using JWT middleware
- Pagination is applied after filtering for correct UX

---

## 🧠 Key Learnings

- Role-based authentication and dashboards
- Secure JWT authentication flow
- Context API for global state management
- Client-side pagination with search
- Proper React Router deployment configuration
- Clean separation of frontend and backend logic
- Real-world MERN project structure

---

## 📌 Future Improvements

- Server-side pagination
- Email verification
- Forgot password functionality
- Admin analytics dashboard
- Activity logs
- Soft delete and restore students

---

## 👤 Author

Aryan Tyagi  
Full-Stack MERN Developer  
Email: aryantvats@gmail.com  

---

⭐ If you like this project, please give it a star on GitHub!
