# 🌍 Meet & Go - Local Guide Platform

![Project Status](https://img.shields.io/badge/status-active-success?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)

**Meet & Go** is a localized travel platform that connects inquisitive travelers with passionate local experts. Unlike generic tour agencies, we empower individuals to share their city’s hidden gems, culture, and stories, allowing travelers to experience destinations like a true local.

---

## 🔗 Quick Links

- **🚀 Live Deployment:** [https://meet-and-go-frontend.vercel.app/](https://meet-and-go-frontend.vercel.app/)
- **💻 Repository:** [https://github.com/ashraful2871/Meet-And-Go-Frontend.git](https://github.com/ashraful2871/Meet-And-Go-Frontend.git)

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)

---

## 📝 Project Overview

**Meet & Go** democratizes travel guiding by allowing locals to monetize their knowledge and travelers to access unique, off-the-beaten-path experiences. Whether it's a food crawl, a photography walk, or a historical tour, our platform facilitates secure, authenticated, and personalized connections.

### Core Objectives
1.  **Connect:** Bridge the gap between travelers and local experts.
2.  **Empower:** Enable guides to list services and manage bookings.
3.  **Trust:** Provide detailed profiles, reviews, and identity verification.
4.  **Experience:** Create an engaging, user-friendly UI/UX for seamless discovery.

---

## ✨ Key Features

### 👤 User Roles & Authentication
* **Secure Auth:** JWT-based authentication with secure password hashing.
* **Tourists:** Can search tours, view guide profiles, and book experiences.
* **Guides:** Can create listings, manage availability, and accept/decline bookings.
* **Admins:** comprehensive dashboard for managing users, listings, and platform content.

### 🗺️ Tour Management
* **Detailed Listings:** Guides can post tours with titles, itineraries, pricing, meeting points, and image galleries (Cloudinary/ImgBB).
* **Search & Filter:** Advanced filtering by destination, language, category (Food, Art, Adventure), and price range.

### 📅 Booking & Payments
* **Workflow:** Request -> Accept/Decline -> Payment -> Confirmed.
* **Status Tracking:** Real-time updates on booking status (Pending, Confirmed, Completed, Cancelled).
* **Payments:** Integrated secure payment gateway processing.

### 🌟 Social Proof
* **Reviews & Ratings:** Post-tour feedback system to build trust and community reliability.

---

## 🛠 Tech Stack

This project is built using modern web development standards and a robust frontend ecosystem.

**Core Framework:**
* [Next.js 16](https://nextjs.org/) (App Router)
* [React 19](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)

**Styling & UI:**
* [Tailwind CSS v4](https://tailwindcss.com/)
* [Radix UI](https://www.radix-ui.com/) (Accessible Primitives)
* [Lucide React](https://lucide.dev/) (Icons)
* [Framer Motion](https://www.framer.com/motion/) (Animations)
* `class-variance-authority` & `clsx` (Style composition)

**State & Utilities:**
* `sonner` (Toast notifications)
* `jsonwebtoken` (Auth handling)
* `canvas-confetti` (Visual effects)

---

## 📂 Folder Structure

```bash
frontend/
├── app/
│   ├── (auth)/             # Login, Register routes
│   ├── (public)/           # Explore, Landing, Tour Details
│   ├── (dashboard)/        # Protected routes (Guide, Tourist, Admin)
│   ├── components/         # Reusable UI components
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── public/                 # Static assets
└── ...🚀 Getting Started
Follow these steps to set up the project locally.

Prerequisites
Node.js (v18 or higher recommended)

npm or yarn or pnpm

Installation
Clone the repository:

Bash
git clone [https://github.com/ashraful2871/Meet-And-Go-Frontend.git](https://github.com/ashraful2871/Meet-And-Go-Frontend.git)
cd meet-and-go-frontend
Install dependencies:

Bash
npm install
# or
yarn install
# or
pnpm install
Set up Environment Variables: Create a .env.local file in the root directory and add the necessary variables (see below).

Run the development server:

Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

🔐 Environment Variables
To run this project, you will need to add the following environment variables to your .env.local file:

Code snippet
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Authentication (if handling frontend-side tokens)
NEXT_PUBLIC_AUTH_SECRET=your_auth_secret

# Image Upload (Cloudinary/ImgBB)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset

# Payment Gateway (Public Keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
🛣 Roadmap
[x] Project Setup & Auth: User registration and login (Tourist/Guide).

[x] Core Features: Tour listing creation, searching, and filtering.

[ ] Interactive Map: View tour routes and meeting points on Google/Mapbox.

[ ] Multi-language Support: UI translation for international travelers.

[ ] Advanced Badges: "Super Guide" and "Foodie Expert" gamification.

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or want to report a bug, please feel free to open an issue or submit a pull request.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📞 Contact
Developer: Ashraful Islam

Project Link: https://github.com/ashraful2871/Meet-And-Go-Frontend

<div align="center"> <sub>Built with ❤️ by the Meet & Go Team</sub> </div>
