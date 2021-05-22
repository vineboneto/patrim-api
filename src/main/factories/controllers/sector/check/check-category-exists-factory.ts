import { makeDbCheckSectorById } from '@/main/factories/usecases'
import { CheckExistComposite, CheckExistSectorId, CheckExistUserId } from '@/validation/checks'
import { CheckExist } from '@/presentation/protocols'
import { SharedPostgresRepository } from '@/infra/db/postgres-prisma'
import { DatabaseFields } from '@/data/protocols'

export const makeCheckExistSectorValidation = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistUserId(new SharedPostgresRepository(), DatabaseFields.sector))
  checkExists.push(new CheckExistSectorId(makeDbCheckSectorById(), 'id'))
  return new CheckExistComposite(checkExists)
}
