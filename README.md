# 📖 Blog Website (MERN Stack)

## 📌 Overview

This is a fully functional blog website built using the MERN stack. It allows users to create, edit, delete, and read blogs with rich text editing. The project supports role-based authentication and image uploads using Cloudinary.

## 🚀 Features

- **User Authentication** (JWT-based login and signup)
- **Role-Based Access Control** (Admin & User roles)
- **Rich Text Editor** (Editor.js integration)
- **Image Uploading** (Cloudinary integration)
- **Blog CRUD Operations** (Create, Read, Update, Delete posts)
- **Responsive UI** (Tailwind CSS for styling)
- **Optimized State Management** (React Query & Context API)
- **Secure API** (Protected routes with JWT authentication)

## 🔑 Authentication & Authorization

- Users can register and log in to create and manage blogs.
- **Role-based access:**
  - Admins can delete any blog.
  - Users can edit/delete only their own blogs.
- JWT-based authentication to protect routes.

## 🛠️ Tech Stack

### Frontend:
- React.js
- TanStack Query (React Query)
- Editor.js (for blog content editing)
- Context API (for authentication state)
- Tailwind CSS (for UI styling)
- Cloudinary (for image uploads)

### Backend:
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication

## 📡 API Endpoints

### User API (`/api/user`)

| Method | Endpoint         | Description                        |
|--------|----------------|------------------------------------|
| POST   | `/register`    | Register a new user               |
| POST   | `/login`       | Login user                        |
| GET    | `/`            | Get all users                     |
| GET    | `/me`          | Get logged-in user's details      |
| GET    | `/:username`   | Get user details by username      |
| PATCH  | `/`            | Update user profile (protected)   |
| DELETE | `/`            | Delete user account (protected)   |

### Post API (`/api/post`)

| Method | Endpoint            | Description                          |
|--------|---------------------|--------------------------------------|
| GET    | `/`                 | Get all posts                        |
| GET    | `/posts/:userId`    | Get posts by a specific user        |
| GET    | `/:postId`          | Get post by ID                      |
| POST   | `/`                 | Add a new post (protected)          |
| PATCH  | `/:postId`          | Update a post (protected)           |
| DELETE | `/:postId`          | Delete a post (protected)           |

## 💡 Future Enhancements

- Add comments and likes on posts
- Implement user profiles and followers system
- Enhance SEO optimization for blog posts

## 👨‍💻 Author

Developed by [Ibrarullah23](https://github.com/ibrarullah23) 🚀

## 🌟 Show Your Support!

If you like this project, please ⭐ the repository!
