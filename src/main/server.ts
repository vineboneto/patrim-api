import { PrismaHelper } from '@/infra/db/postgres-prisma'
import app from '@/main/config/app'

PrismaHelper.connect()

app.listen(3000, () => console.log('Server is running at http://localhost:3000'))
