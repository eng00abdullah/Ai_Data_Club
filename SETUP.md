# Setup Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Accounts for:
  - OpenAI (for AI Chat Assistant)
  - Google OAuth (for admin login)
  - Resend (for newsletter emails)
  - Cloudinary (for image storage)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ai_data_club?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI (for AI Chat Assistant)
OPENAI_API_KEY="your-openai-api-key"

# Resend (for Newsletter)
RESEND_API_KEY="your-resend-api-key"
RESEND_FROM_EMAIL="noreply@yourdomain.com"

# Cloudinary (for Image Storage)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Admin
ADMIN_EMAIL="abdullahhossam414@gmail.com"
ADMIN_PASSWORD="your-secure-password"
```

### 3. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output and use it as `NEXTAUTH_SECRET`.

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view/edit data
npx prisma studio
```

### 5. Create Admin User

```bash
npm run setup:admin
```

This creates the first admin user. You can customize the email and password using environment variables.

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 7. Access Admin Dashboard

Visit [http://localhost:3000/admin](http://localhost:3000/admin) and login with your admin credentials.

## Production Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

### Database Migration

For production, use Prisma migrations:

```bash
npx prisma migrate dev --name init
```

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Check `DATABASE_URL` format
- Verify database credentials

### Authentication Issues

- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Ensure Google OAuth credentials are correct

### Image Upload Issues

- Verify Cloudinary credentials
- Check image size limits
- Ensure CORS is configured correctly

## Support

For issues or questions, contact: abdullahhossam414@gmail.com

