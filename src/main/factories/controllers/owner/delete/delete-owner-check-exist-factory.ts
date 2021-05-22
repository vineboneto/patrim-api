import { CheckExist } from '@/presentation/protocols'
import { CheckExistComposite, CheckExistOwnerId, CheckExistUserId } from '@/validation/checks'
import { makeDbCheckOwnerById } from '@/main/factories/usecases'
import { SharedPostgresRepository } from '@/infra/db/postgres-prisma'
import { DatabaseFields } from '@/data/protocols'

export const makeDeleteCheckExistOwnerValidation = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistUserId(new SharedPostgresRepository(), DatabaseFields.owner))
  checkExists.push(new CheckExistOwnerId(makeDbCheckOwnerById(), 'id'))
  return new CheckExistComposite(checkExists)
}
