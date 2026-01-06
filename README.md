# AI & Data Club - Official Website

A high-end, futuristic website for the AI & Data Club at Innovation University.

## Features

- 🌐 Bilingual support (Arabic & English) with RTL/LTR switching
- 🎨 Dark futuristic design with smooth animations
- 👥 Full admin dashboard for content management
- 🤖 AI Chat Assistant
- 📅 Event management with countdown timers
- 📧 Newsletter subscription system
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **UI Components**: Radix UI, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **AI**: OpenAI API
- **Email**: Resend API
- **Storage**: Cloudinary

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in all required environment variables.

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Create the first admin user:
   ```bash
   npm run setup:admin
   ```
   Or set `ADMIN_PASSWORD` environment variable to set a custom password.

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

The admin dashboard is accessible at `/admin`. Login with:
- **Email**: `abdullahhossam414@gmail.com` (or the email set in `ADMIN_EMAIL`)
- **Password**: The password set during setup (default: `changeme123`)

⚠️ **Important**: Change the default password after first login!

### Admin Features

- **Dashboard**: Overview of all content statistics
- **Content Management**: Edit all website texts (Hero, About, Vision, Mission, etc.)
- **Events**: Add, edit, and delete events
- **Team**: Manage team members
- **Gallery**: Upload and manage gallery images
- **Achievements**: Add and manage achievements
- **Newsletter**: View and manage newsletter subscribers
- **Messages**: View contact form submissions
- **Settings**: Configure website settings

## Project Structure

```
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # Utilities and configurations
├── prisma/          # Database schema
├── public/          # Static assets
└── types/           # TypeScript type definitions
```

## License

Private - AI & Data Club, Innovation University

