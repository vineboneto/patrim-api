import { DatabaseFields } from '@/data/protocols'
import { SharedPostgresRepository } from '@/infra/db/postgres-prisma'
import { makeDbCheckPatrimonyById } from '@/main/factories/usecases'
import { CheckExist } from '@/presentation/protocols'
import { CheckExistComposite, CheckExistPatrimonyId, CheckExistUserId } from '@/validation/checks'

export const makeDeletePatrimonyCheckExist = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistUserId(new SharedPostgresRepository(), DatabaseFields.patrimony))
  checkExists.push(new CheckExistPatrimonyId(makeDbCheckPatrimonyById(), 'id'))
  return new CheckExistComposite(checkExists)
}
