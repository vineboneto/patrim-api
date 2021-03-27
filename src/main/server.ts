import 'module-alias/register'
import { PrismaHelper } from '@/infra/db/postgres-prisma'
import env from '@/main/config/env'
import app from '@/main/config/app'

PrismaHelper.connect()

app.listen(env.port, () => console.log(`Server is running at http://localhost:${env.port}`))
