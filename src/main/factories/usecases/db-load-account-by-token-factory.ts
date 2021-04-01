import { DbLoadAccountByToken } from '@/data/usecases'
import { LoadAccountByToken } from '@/domain/usecases'
import { JwtAdapter } from '@/infra/criptography'
import { AccountPostgresRepository } from '@/infra/db/postgres-prisma'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const accountPostgresRepository = new AccountPostgresRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbLoadAccountByToken(accountPostgresRepository, jwtAdapter)
}
