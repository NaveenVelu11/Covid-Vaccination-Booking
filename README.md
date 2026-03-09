# 💉 VaxBook - COVID Vaccination Booking System

A modern, full-stack web application for managing COVID-19 vaccination appointments with real-time slot availability, analytics dashboard, and user-friendly interface.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC)

## ✨ Features

### User Features
- 🔐 **Secure Authentication** - JWT-based login/registration with password encryption
- 📅 **Smart Slot Booking** - Real-time availability checking with capacity management (2 slots per time)
- 🗓️ **Booking Management** - View, track, and cancel appointments
- 💉 **Multi-Dose Support** - Book Dose 1, Dose 2, or Booster shots
- 🏥 **Vaccine Selection** - Choose from Covishield, Covaxin, Sputnik V, Moderna, or Pfizer
- 📍 **Location-Based** - Country, State, and City selection for vaccination centers

### Admin Features
- 📊 **Analytics Dashboard** - Visual insights with charts and graphs
- 👥 **User Statistics** - Gender-wise and COVID history distribution
- 📈 **Booking Trends** - Monthly dose-wise vaccination tracking
- 📋 **User Management** - View registered users and their bookings

### Technical Features
- ⚡ **Real-time Updates** - Live slot capacity checking
- 🎨 **Modern UI/UX** - Responsive design with Tailwind CSS
- 🔒 **Security** - Helmet.js, rate limiting, input validation
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🎯 **Form Validation** - Client and server-side validation with Yup & Express-validator

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **React Router DOM** - Navigation
- **Tailwind CSS** - Styling
- **Formik + Yup** - Form handling & validation
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Country-State-City** - Location data

### Backend
- **Node.js + Express** - Server framework
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **Express Rate Limit** - API protection
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/covid-vaccination-booking.git
cd covid-vaccination-booking
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` file in server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

Seed admin user:
```bash
npm run seed
```

Start server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Create `.env` file in client directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start client:
```bash
npm start
```

## 🎯 Usage

### Default Admin Credentials
```
Email: admin@vaxbook.com
Password: admin123
```

### User Flow
1. **Register** - Create account with personal details
2. **Login** - Access your dashboard
3. **Book Slot** - Select location, date, time, and vaccine type
4. **View Bookings** - Track your appointments
5. **Cancel** - Cancel bookings if needed

### Admin Flow
1. Login with admin credentials
2. View analytics dashboard
3. Monitor booking trends
4. Check user statistics

## 📁 Project Structure

```
covid-vaccination-booking/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Page components
│   │   ├── utils/         # API utilities
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                # Node.js backend
│   ├── config/           # Database config
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Auth & validation
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── utils/            # Helper functions
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Slots
- `POST /api/slots/capacity` - Check slot availability
- `POST /api/slots/book` - Book a slot
- `GET /api/slots/my-bookings` - Get user bookings
- `PATCH /api/slots/cancel/:id` - Cancel booking

### Analytics (Admin)
- `GET /api/analytics/overall` - Overall statistics
- `GET /api/analytics/gender` - Gender distribution
- `GET /api/analytics/covid` - COVID history stats
- `POST /api/analytics/dose` - Dose-wise trends


## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet.js security headers
- MongoDB injection prevention



