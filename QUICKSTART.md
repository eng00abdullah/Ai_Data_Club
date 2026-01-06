# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:
- Database connection string
- NextAuth secret (generate with `openssl rand -base64 32`)
- API keys (OpenAI, Google OAuth, Resend, Cloudinary)

### 3. Initialize Database
```bash
npx prisma generate
npx prisma db push
```

### 4. Create Admin Account
```bash
npm run setup:admin
```

### 5. Start Development Server
```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

## 📋 Key Features Implemented

✅ **Frontend**
- Bilingual support (Arabic/English) with RTL/LTR
- Dark futuristic design with animations
- Responsive on all devices
- Dark/Light mode toggle

✅ **Sections**
- Hero with animated background
- About, Vision & Mission
- Events with countdown timer
- Team members with social links
- Gallery with lightbox
- Achievements showcase
- Contact form
- Newsletter subscription

✅ **Admin Dashboard** (`/admin`)
- Full CRUD for all content types
- Content management (Hero, About, etc.)
- Event management
- Team management
- Gallery management
- Achievements management
- Newsletter subscribers
- Contact messages

✅ **Special Features**
- AI Chat Assistant (OpenAI powered)
- Event countdown timers
- Newsletter system
- Secure authentication

## 🎨 Design Highlights

- **Color Scheme**: Dark theme with gradient accents (blue → purple → pink)
- **Animations**: Framer Motion for smooth transitions
- **Typography**: Inter (English) + Cairo (Arabic)
- **UI Components**: Custom components with glass morphism effects

## 🔐 Admin Access

- URL: `/admin`
- Email: Set in `ADMIN_EMAIL` env var (default: abdullahhossam414@gmail.com)
- Password: Set during `npm run setup:admin`

## 📝 Next Steps

1. Add your content through the admin dashboard
2. Upload images to Cloudinary
3. Configure email service (Resend)
4. Set up OpenAI API for chat assistant
5. Deploy to Vercel/Netlify

## 🐛 Troubleshooting

- **Database errors**: Check `DATABASE_URL` format
- **Auth issues**: Verify `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
- **Image upload**: Check Cloudinary credentials
- **AI Chat**: Ensure OpenAI API key is valid

For detailed setup, see [SETUP.md](./SETUP.md)

