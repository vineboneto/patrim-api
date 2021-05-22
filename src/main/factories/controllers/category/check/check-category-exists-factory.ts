import { makeDbCheckCategoryById } from '@/main/factories/usecases'
import { CheckExistComposite, CheckExistCategoryId, CheckExistUserId } from '@/validation/checks'
import { CheckExist } from '@/presentation/protocols'
import { SharedPostgresRepository } from '@/infra/db/postgres-prisma'
import { DatabaseFields } from '@/data/protocols'

export const makeCheckExistCategoryValidation = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistUserId(new SharedPostgresRepository(), DatabaseFields.category))
  checkExists.push(new CheckExistCategoryId(makeDbCheckCategoryById(), 'id'))
  return new CheckExistComposite(checkExists)
}
