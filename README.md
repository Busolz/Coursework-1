# After-School Lessons Marketplace

A full-stack web application that allows users to browse lessons, add them to a cart, register or log in, and place orders.

## 📋 Table of Contents
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Repository Links](#repository-links)

---

## 🛠️ Technology Stack

### Frontend
- **HTML5, CSS3, JavaScript (ES6+)**
- **Vue.js 3** - Progressive JavaScript framework
- **Bootstrap 5** - CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **CORS** - Cross-origin resource sharing

### Deployment
- **Frontend** - GitHub Pages
- **Backend** - Render
- **Database** - MongoDB Atlas

---

## 📁 Project Structure

### Frontend Structure
```
After-School Lessons Marketplace (Vue 3 App)
│
├── Entry Point
│   └── index.html (Vue mount: #app)
│
├── Initialization Layer
│   ├── main/initialization/main.js
│   │   └── Creates Vue app instance
│   └── main/initialization/app.js
│       └── App (Root Component)
│
├── State Management
│   ├── view (login/register/lessons/cart)
│   ├── users, loggedInUser
│   ├── lessons, cart
│   ├── form (name, phone)
│   └── sort, searchQuery
│
├── Component Layer (main/component/)
│   ├── HeaderBar.js - Navigation & user info
│   ├── LoginView.js - Email/Password login
│   ├── RegisterView.js - User registration
│   ├── LessonList.js - Browse & filter lessons
│   └── CartView.js - Cart & checkout
│
└── External APIs
    ├── GET https://coursework-2-t7m3.onrender.com (Fetch lessons)
    ├── POST http://localhost:3000/orders (Submit order)
    └── PUT http://localhost:3000/lessons/{id} (Update spaces)
```

### Backend Structure
```
Backend/
├── index.js                 # Main Express server
├── package.json             # Dependencies & metadata
├── package-lock.json        # Locked versions
├── README.md                # Documentation
├── .env                     # Environment variables
├── .git/                    # Git repository
├── .gitignore               # Git ignore rules
└── node_modules/            # Installed packages
    ├── express
    ├── cors
    ├── dotenv
    └── mongodb
```

---

## 🔄 Data Flow

```
1. User Registration/Login
           ↓
2. Browse Lessons (sorted/filtered)
           ↓
3. Add to Cart
           ↓
4. View Cart & Fill Checkout Form
           ↓
5. Submit Order
           ↓
6. Backend Updates Database & Lesson Spaces
```

---

## 🎨 Frontend Architecture

### Root Component (App.js)
- **State Management**: Handles authentication, cart, lessons, and filters
- **Authentication**: Login, register, logout functionality
- **Cart Operations**: Add/remove lessons from cart
- **Filtering & Sorting**: Search and sort lessons by subject/price
- **Checkout**: Submit orders with name and phone

### Key Components

| Component | Purpose |
|-----------|---------|
| **HeaderBar.js** | Display title, cart count, logout button |
| **LoginView.js** | User login form |
| **RegisterView.js** | User registration form |
| **LessonList.js** | Display lessons with search, filter, and add to cart |
| **CartView.js** | Display cart items and checkout form |

---

## 🔌 Backend Architecture

### Main Server (index.js)
- Express server initialization
- CORS configuration
- Route handlers for lessons and orders
- MongoDB connection

### Environment Variables (.env)
```
MONGODB_URI=<your-mongo-atlas-uri>
PORT=3000
DB_NAME=lessons_marketplace
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/lessons` | Fetch all lessons |
| **GET** | `/lessons?subject=<query>` | Search lessons |
| **POST** | `/orders` | Submit new order |
| **PUT** | `/lessons/:id` | Update lesson spaces |

---

## 🚀 Deployment

### Frontend
- **Hosted on**: GitHub Pages
- **Repository**: https://github.com/Busolz/Coursework-1.git

### Backend
- **Hosted on**: Render
- **URL**: https://coursework-2-t7m3.onrender.com
- **Repository**: https://github.com/Busolz/Coursework-2-.git

### Database
- **Hosted on**: MongoDB Atlas
- **Type**: Cloud NoSQL database

---

## 📚 Testing

All endpoints have been tested and verified with Postman:
- ✅ GET Lessons
- ✅ POST Orders
- ✅ PUT Lessons (Update spaces)
- ✅ Search functionality

---

## 🔗 Repository Links

| Component | URL |
|-----------|-----|
| **Frontend** | https://github.com/Busolz/Coursework-1.git |
| **Backend** | https://github.com/Busolz/Coursework-2-.git |
| **Backend API** | https://coursework-2-t7m3.onrender.com |

---

## 📝 License

This project is part of a Full Stack coursework assignment.