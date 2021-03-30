import { DbAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'
import { JwtAdapter, BcryptAdapter } from '@/infra/criptography'
import { AccountPostgresRepository } from '@/infra/db/postgres-prisma'
import env from '@/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const accountPostgresRepository = new AccountPostgresRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAuthentication(accountPostgresRepository, accountPostgresRepository, bcryptAdapter, jwtAdapter)
}
