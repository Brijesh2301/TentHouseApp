# 🏕️ Tent House & Decoration Services — Full Stack MERN App

A premium, production-ready MERN stack website for a Tent House & Event Decoration business.

---

## 📁 Project Structure

```
tent-house/
├── backend/               # Node.js + Express API
│   ├── config/            # Cloudinary config
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── uploads/           # Local file uploads (fallback)
│   ├── server.js          # Entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/              # React + Tailwind CSS + Framer Motion
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── admin/     # Admin layout
    │   │   ├── common/    # Navbar, Footer, etc.
    │   │   └── home/      # Homepage sections
    │   ├── context/       # AuthContext
    │   ├── pages/         # All pages + admin pages
    │   ├── utils/         # Axios API helpers
    │   ├── App.js
    │   └── index.js
    ├── package.json
    ├── tailwind.config.js
    └── .env.example
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (optional, for image uploads)
- Gmail account (for email notifications)

---

### 🔧 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

**Backend runs on:** `http://localhost:5000`

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your settings
npm start
```

**Frontend runs on:** `http://localhost:3000`

---

## 🔐 Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tenthouse
JWT_SECRET=your_super_long_random_secret_key
JWT_EXPIRE=7d

# Cloudinary (for image/video uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Nodemailer (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin@tenthouse.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WHATSAPP_NUMBER=919876543210
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_api_key
```

---

## 👤 Creating an Admin User

After starting the backend, use this curl command or Postman:

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@tenthouse.com","password":"admin123"}'

# Then manually update role to 'admin' in MongoDB:
# db.users.updateOne({email:"admin@tenthouse.com"},{$set:{role:"admin"}})
```

Or use **MongoDB Compass** to set `role: "admin"` on your user document.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |
| GET | `/api/auth/users` | Get all users (admin) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create booking (public) |
| GET | `/api/bookings` | Get all bookings (admin) |
| GET | `/api/bookings/my` | My bookings (auth) |
| GET | `/api/bookings/stats` | Dashboard stats (admin) |
| PUT | `/api/bookings/:id` | Update booking (admin) |
| DELETE | `/api/bookings/:id` | Delete booking (admin) |

### Gallery
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gallery` | Get gallery (public) |
| POST | `/api/gallery` | Upload media (admin) |
| PUT | `/api/gallery/:id` | Update media (admin) |
| DELETE | `/api/gallery/:id` | Delete media (admin) |

### Testimonials
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/testimonials` | Get approved (public) |
| POST | `/api/testimonials` | Submit testimonial (public) |
| GET | `/api/testimonials/all` | Get all (admin) |
| PUT | `/api/testimonials/:id` | Approve/feature (admin) |
| DELETE | `/api/testimonials/:id` | Delete (admin) |

### Contacts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contacts` | Submit contact form (public) |
| GET | `/api/contacts` | Get all messages (admin) |
| PUT | `/api/contacts/:id/read` | Mark as read (admin) |
| DELETE | `/api/contacts/:id` | Delete (admin) |

---

## 🌐 Deployment

### Frontend — Vercel

```bash
cd frontend
npm run build
# Deploy to Vercel via CLI or GitHub integration
vercel --prod
```

Set environment variables in Vercel dashboard.

### Backend — Render / Railway

1. Push backend to GitHub
2. Create new Web Service on [render.com](https://render.com)
3. Set environment variables
4. Build command: `npm install`
5. Start command: `node server.js`

---

## ✨ Features

- ✅ JWT Authentication & Authorization
- ✅ Admin Dashboard with Stats
- ✅ Booking Management (CRUD + Status Updates)
- ✅ Gallery with Cloudinary Upload
- ✅ Testimonials Approval System
- ✅ Contact Form with Email Auto-Reply
- ✅ WhatsApp Integration
- ✅ Google Maps Embed
- ✅ Framer Motion Animations
- ✅ Mobile-First Responsive Design
- ✅ SEO-Friendly Structure
- ✅ Lightbox Image/Video Preview
- ✅ Email Notifications (Nodemailer)
- ✅ Multi-Step Booking Form

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Tailwind CSS, Framer Motion |
| Icons | Ant Design Icons |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| File Upload | Multer + Cloudinary |
| Email | Nodemailer |
| Deployment | Vercel (FE) + Render (BE) |

---

## 📸 Pages

- `/` — Homepage (Hero, Services, Gallery, Testimonials, About, Contact)
- `/services` — Detailed services page
- `/gallery` — Filterable gallery with lightbox
- `/booking` — Multi-step booking form
- `/about` — About us, team, timeline
- `/contact` — Contact form + Google Maps
- `/login` — User login
- `/register` — User registration
- `/admin` — Admin dashboard (protected)
- `/admin/bookings` — Manage bookings
- `/admin/gallery` — Upload & manage media
- `/admin/testimonials` — Approve testimonials
- `/admin/contacts` — View contact messages

---

*Built with ❤️ for premium event decoration businesses*
