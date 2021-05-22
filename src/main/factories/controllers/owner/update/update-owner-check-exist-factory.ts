import { CheckExist } from '@/presentation/protocols'
import { CheckExistComposite, CheckExistOwnerId, CheckExistSectorId, CheckExistUserId } from '@/validation/checks'
import { makeDbCheckOwnerById, makeDbCheckSectorById } from '@/main/factories/usecases'
import { SharedPostgresRepository } from '@/infra/db/postgres-prisma'
import { DatabaseFields } from '@/data/protocols'

export const makeCheckExistOwnerValidation = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistUserId(new SharedPostgresRepository(), DatabaseFields.owner))
  checkExists.push(new CheckExistSectorId(makeDbCheckSectorById(), 'sectorId'))
  checkExists.push(new CheckExistOwnerId(makeDbCheckOwnerById(), 'id'))
  return new CheckExistComposite(checkExists)
}
