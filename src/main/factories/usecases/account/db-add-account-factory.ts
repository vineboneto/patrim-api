import { DbAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/criptography'
import { AccountPostgresRepository } from '@/infra/db/postgres-prisma'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const accountPostgreRepository = new AccountPostgresRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAddAccount(accountPostgreRepository, accountPostgreRepository, bcryptAdapter)
}
