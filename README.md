# Meet & Go

**Live Site:** [https://meet-and-go-frontend.vercel.app/](https://meet-and-go-frontend.vercel.app/)  
**Frontend Repo:** [https://github.com/ashraful2871/Meet-And-Go-Frontend.git](https://github.com/ashraful2871/Meet-And-Go-Frontend.git)

## 🗺️ Project Overview

**Meet & Go** is a Local Guide Platform that connects curious travelers with passionate local experts for personalized, off-the-beaten-path experiences. Whether it's a food crawl, photography walk, or cultural tour, users can explore cities like a true local. The platform empowers everyday locals to monetize their knowledge while providing tourists with authentic, interest-matched adventures.

---

## 📋 Table of Contents

- [Project Overview](#️project-overview)
- [Features](#features)
- [Tech Stack](#️tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Pages & Routing](#pages--routing)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Optional Features](#optional-features)
- [License](#license)

---

## ✨ Features

### 🔐 User Authentication & Roles
- Email/password-based signup/login
- Role-based access: `Tourist`, `Guide`, `Admin`
- JWT authentication with secure password hashing

### 👤 User Profile Management
- Edit profile: name, bio, languages, image
- Guides: add expertise, daily rates
- Tourists: set travel preferences

### 🧭 Tour Listing System (CRUD)
- Create/edit listings with:
  - Title, description, itinerary
  - Duration, pricing, meeting points, max group size
  - Tour categories and photos (Cloudinary/ImgBB)
- Guides can activate/deactivate listings

### 🔍 Search & Filters
- Destination/city
- Language
- Tour category (Food, Art, Adventure, etc.)
- Price range

### 📅 Booking System
- Travelers request bookings (date/time)
- Guides accept/reject requests
- Booking statuses: `Pending`, `Confirmed`, `Completed`, `Cancelled`

### 💬 Ratings & Reviews
- Tourists can rate/review guides post-tour
- Reviews visible on guide profile & listings

### 💳 Payment Integration
- Booking fee payment system
- Guides get paid post-tour
- Stripe/SSLCommerz or other payment gateway integration

---

## 🛠️ Tech Stack

| Category         | Technology                               |
|------------------|-------------------------------------------|
| Frontend         | React (Next.js), Tailwind CSS             |
| State & Routing  | App Router (Next.js 14)                   |
| Auth & Security  | JWT, bcrypt, cookies                      |
| Animations       | Framer Motion                             |
| Component UI     | Radix UI, Lucide Icons                    |
| Storage          | Local Storage, Cloudinary/ImgBB (media)  |
| Backend (Planned)| Node.js, Express.js, MongoDB             |
| Payments         | Stripe / SSLCommerz (integrated)          |

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/ashraful2871/Meet-And-Go-Frontend.git
cd Meet-And-Go-Frontend

📱 Usage

Register as a Tourist or Guide

Explore available tours and filter based on preferences

Tourists request bookings

Guides manage and confirm bookings

Both parties leave post-tour feedback

Payments processed securely for confirmed tours

📄 Pages & Routing
Page	Path	Description
Landing Page	/	Hero, featured tours, CTA
Explore Tours	/explore	Search and filter tours
Listing Details	/tours/[id]	View detailed info and request booking
Register / Login	/register, /login	Auth pages
Profile Page	/profile/[id]	View/edit user profile
Dashboard (Tourist)	/dashboard	My bookings, wishlist
Dashboard (Guide)	/dashboard	My listings, bookings
Listing Management	/dashboard/listings	Add/edit tour listings
Admin Dashboard	/dashboard/admin	Manage users, listings, bookings
# Install dependencies
npm install

# Run development server
npm run dev
