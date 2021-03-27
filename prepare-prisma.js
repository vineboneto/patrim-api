const { execSync } = require('child_process')

const scripts = [
  'npx prisma migrate deploy --schema=./src/infra/db/postgres-prisma/prisma/schema.prisma',
  'npx prisma generate --schema=./src/infra/db/postgres-prisma/prisma/schema.prisma'
]

for (script of scripts) {
  try {
    console.log(script + ' 👀')
    execSync(script)
    console.log('✔')
  } catch (error) {
    console.error
  }
}
