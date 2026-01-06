# Technical Documentation

## Architecture Overview

This is a full-stack Next.js 14 application built with TypeScript, featuring a modern admin dashboard and a bilingual public website.

## Tech Stack Decisions

### Frontend Framework: Next.js 14 (App Router)
- **Why**: Latest App Router provides better performance, server components, and improved routing
- **Benefits**: Server-side rendering, API routes, optimized images, built-in optimizations

### Styling: Tailwind CSS
- **Why**: Utility-first CSS for rapid development and consistent design
- **Custom Theme**: Dark futuristic theme with CSS variables for easy theming
- **RTL Support**: Built-in support for Arabic RTL layout

### Animations: Framer Motion
- **Why**: Declarative animations, smooth performance, easy to use
- **Usage**: Page transitions, scroll animations, micro-interactions

### Database: PostgreSQL + Prisma ORM
- **Why**: PostgreSQL for reliability and Prisma for type-safe database access
- **Schema**: Comprehensive schema covering all content types
- **Migrations**: Prisma migrations for version control

### Authentication: NextAuth.js
- **Why**: Industry-standard, supports multiple providers
- **Providers**: Email/Password + Google OAuth
- **Session**: JWT-based sessions

### AI Integration: OpenAI API
- **Model**: GPT-4o-mini for cost-effectiveness
- **Context**: System prompt includes club information
- **Features**: Context-aware responses, bilingual support

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── admin/             # Admin components
│   ├── layout/            # Navigation, Footer
│   ├── providers/         # Context providers
│   ├── sections/          # Page sections
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and configs
│   ├── auth.ts            # NextAuth configuration
│   ├── i18n.ts            # Internationalization
│   ├── prisma.ts          # Prisma client
│   └── utils.ts           # Helper functions
├── prisma/
│   └── schema.prisma      # Database schema
└── types/                 # TypeScript definitions
```

## Key Features Implementation

### 1. Bilingual Support (i18n)
- **Implementation**: Custom locale provider with React Context
- **Storage**: localStorage for persistence
- **RTL**: Automatic direction switching for Arabic
- **Translation**: JSON-based translation system

### 2. Admin Dashboard
- **Authentication**: Protected routes with NextAuth
- **CRUD Operations**: Full create, read, update, delete for all content
- **Role-Based**: Ready for role expansion (ADMIN, SUPER_ADMIN)
- **UI**: Clean, modern interface with sidebar navigation

### 3. AI Chat Assistant
- **Widget**: Floating chat button with slide-up window
- **API**: OpenAI GPT-4o-mini integration
- **Context**: Club-specific information in system prompt
- **History**: Conversation history maintained

### 4. Event Countdown Timer
- **Real-time**: Updates every second
- **Visual**: Animated countdown cards
- **Multi-event**: Supports multiple upcoming events

### 5. Image Management
- **Storage**: Cloudinary integration ready
- **Optimization**: Next.js Image component for optimization
- **Gallery**: Lightbox with smooth transitions

## Database Schema Highlights

### Content Management
- **Content Model**: Key-value pairs for all website texts
- **Bilingual**: Separate fields for English and Arabic
- **Versioning**: UpdatedAt tracking

### Events
- **Status**: UPCOMING, ONGOING, COMPLETED, CANCELLED
- **Relations**: Linked to gallery images

### Team Members
- **Social Links**: LinkedIn, GitHub, Twitter, Email
- **Ordering**: Custom order field for display
- **Active Status**: Soft delete with isActive flag

## Security Considerations

1. **Authentication**: NextAuth.js with secure session management
2. **Password Hashing**: bcryptjs for password storage
3. **API Protection**: Server-side session checks for admin routes
4. **Input Validation**: Zod schemas for API inputs
5. **Environment Variables**: Sensitive data in .env

## Performance Optimizations

1. **Image Optimization**: Next.js Image component
2. **Code Splitting**: Automatic with Next.js
3. **Server Components**: Where possible for better performance
4. **Lazy Loading**: Components loaded on demand
5. **Database Indexing**: Unique constraints and indexes

## Future Enhancements

1. **Email Notifications**: Event reminders, newsletter
2. **File Upload**: Direct Cloudinary integration
3. **Analytics**: Track page views and events
4. **SEO**: Meta tags, sitemap, structured data
5. **PWA**: Progressive Web App features
6. **Multi-admin**: Role management UI
7. **Content Versioning**: History of content changes

## Environment Variables

All sensitive configuration is done through environment variables:
- Database credentials
- API keys (OpenAI, Google, Resend, Cloudinary)
- Authentication secrets
- Admin credentials

## Deployment

### Recommended: Vercel
- Automatic deployments from GitHub
- Built-in environment variable management
- PostgreSQL integration available

### Database Options
- **Vercel Postgres**: Integrated with Vercel
- **Supabase**: Free tier available
- **Railway**: Easy PostgreSQL hosting
- **Neon**: Serverless PostgreSQL

## Maintenance

### Regular Tasks
1. Update dependencies: `npm update`
2. Database backups: Regular backups recommended
3. Monitor API usage: OpenAI, Resend quotas
4. Review logs: Check for errors

### Adding New Features
1. Update Prisma schema if needed
2. Run migrations: `npx prisma migrate dev`
3. Add API routes in `app/api/`
4. Create components in `components/`
5. Update admin dashboard if needed

## Support & Documentation

- **Setup Guide**: See SETUP.md
- **Quick Start**: See QUICKSTART.md
- **API Documentation**: Check `app/api/` routes
- **Component Documentation**: Check component files

