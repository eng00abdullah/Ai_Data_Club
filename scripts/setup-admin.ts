import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'abdullahhossam414@gmail.com'
  const password = process.env.ADMIN_PASSWORD || 'changeme123'

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      name: 'Admin',
    },
  })

  console.log('Admin user created/updated:', user.email)
  console.log('Password:', password)
  console.log('⚠️  Please change the default password after first login!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

