A full-stack web application that allows users to browse lessons, add them to a cart, register or log in, and place orders.
The application uses:

-Front-End: HTML, CSS, JavaScript, Vue.js

-Back-End: Node.js, Express.js

-Database: MongoDB Atlas

-Hosting: GitHub Pages (frontend) + Render (backend)


Data Flow

User Login/Register
        ↓
View Lessons (sorted/filtered)
        ↓
Add to Cart
        ↓
View Cart & Checkout
        ↓
Submit Order → Update Backend


Frontend Structure:

After-School Lessons Marketplace (Vue 3 App)
│
├── Entry Point
│   └── index.html
│       └── #app (Vue mount point)
│
├── Initialization Layer
│   ├── main/initialization/main.js
│   │   └── Creates Vue app instance
│   │
│   └── main/initialization/app.js
│       └── App (Root Component)
│           ├── State Management
│           │   ├── view (login/register/lessons/cart)
│           │   ├── users, loggedInUser
│           │   ├── lessons, cart
│           │   ├── form (name, phone)
│           │   └── sort, searchQuery
│           │
│           └── Methods & Computed Properties
│               ├── Authentication (login, register, logout)
│               ├── Cart Operations (add, remove)
│               ├── Filtering & Sorting
│               └── Checkout & API calls
│
├── Component Layer (main/component/)
│   ├── HeaderBar.js
│   │   └── Displays title, cart button, logout
│   │
│   ├── LoginView.js
│   │   └── Email/Password login form
│   │
│   ├── RegisterView.js
│   │   └── User registration form
│   │
│   ├── LessonList.js
│   │   ├── Search functionality
│   │   ├── Sort & filter
│   │   └── Add/Remove from cart
│   │
│   └── CartView.js
│       ├── Display cart items
│       ├── Checkout form (name, phone)
│       └── Order submission
│
└── External APIs
    ├── GET https://coursework-2-t7m3.onrender.com (Fetch lessons)
    ├── POST http://localhost:3000/orders (Submit order)
    └── PUT http://localhost:3000/lessons/{id} (Update spaces)

    

Backend Structure:

Backend/
├── index.js                 # Main Express server file
├── package.json            # Project dependencies & metadata
├── package-lock.json       # Locked dependency versions
├── README.md               # Project documentation
├── .env                    # Environment variables (MongoDB URI, Port, DB_NAME)
├── .git/                   # Git repository files
├── .gitignore             # Git ignore rules
└── node_modules/          # Installed dependencies
    ├── express
    ├── cors
    ├── dotenv
    └── mongodb

    

Link to the GitHub Repository - Frontend: https://github.com/Busolz/Coursework-1.git

Link to the GitHub Repository - Backend: https://github.com/Busolz/Coursework-2-.git

Link to the render.com: https://coursework-2-t7m3.onrender.com

MongoDB Atlas screenshot
<img width="2880" height="1798" alt="MongoDB atlas" src="https://github.com/user-attachments/assets/f77f9374-541d-41b2-ad7b-8e58298edd2d" />

Postman Screenshots

Backend running:
<img width="2880" height="1798" alt="Backend running" src="https://github.com/user-attachments/assets/dfb85bb2-fa8e-4b0e-8ae6-3c18ab24fc4c" />

Get Lessons:
<img width="2880" height="1798" alt="Get Lessons" src="https://github.com/user-attachments/assets/32f2622f-e7d1-4bf1-90fb-652bb07b5338" />

Post Orders:
<img width="2880" height="1798" alt="Post Orders" src="https://github.com/user-attachments/assets/e2f8030e-c4ad-4bcc-b6b8-b7bb22ea144d" />

Put Lessons:
<img width="2880" height="1798" alt="Put Lessons" src="https://github.com/user-attachments/assets/6847e2a7-4d0c-409d-9a2b-5288e84c1dbd" />

Get Search bar
<img width="2880" height="1798" alt="Search bar" src="https://github.com/user-attachments/assets/c3455c74-a95b-42ff-beda-3f516f76b842" />
