# KeffiRooms — Production Ready Student Housing Platform

KeffiRooms is a specialized room-rental platform for NSUK students in Keffi, featuring the **Setrapay Manual Escrow** trust model.

## Features
- **Production Backend**: Node.js + Express + PostgreSQL.
- **Secure Auth**: JWT-based authentication with role-based access (Seeker, Agent, Admin).
- **Setrapay Flow**: Automated WhatsApp coordination for secure transactions.
- **Real-time Chat**: Socket.IO integration for instant messaging.
- **Mobile First**: Responsive dark-themed UI optimized for student mobile use.
- **Admin Panel**: Management of users, listings, and verification requests.

## Tech Stack
- **Frontend**: HTML5, CSS3 (Syne/Inter Fonts), Vanilla JS.
- **Backend**: Node.js, Express, PostgreSQL.
- **Real-time**: Socket.IO.
- **Security**: Helmet, bcryptjs, express-rate-limit.

## Installation

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your database and JWT credentials
npm start
```

### 2. Frontend Setup
The frontend is served as static files. You can use any static server or let the backend serve it.

### 3. Database
Run the SQL schema provided in `backend/src/models/schema.sql` to initialize your PostgreSQL database.

## Setrapay Escrow Flow
1. Seeker finds a listing and clicks "Contact Agent".
2. System triggers a WhatsApp redirect to the **Setrapay Coordinator** (Admin).
3. Coordinator receives listing and agent details.
4. Coordinator creates a 3-party WhatsApp group: **Seeker + Agent + Coordinator**.
5. Transaction is facilitated manually via the coordinator to ensure trust.

## Deployment
Recommended platforms:
- **Backend**: Railway, Render, or Heroku.
- **Database**: Railway PostgreSQL or Supabase.
- **Frontend**: Vercel, Netlify, or served via Express.
