import { CheckExist } from '@/presentation/protocols'
import {
  makeDbCheckCategoryById,
  makeDbCheckOwnerById,
  makeDbCheckPatrimonyById
} from '@/main/factories/usecases'
import {
  CheckExistCategoryId,
  CheckExistComposite,
  CheckExistOwnerId,
  CheckExistPatrimonyId,
  CheckExistUserId
} from '@/validation/checks'
import { SharedPostgresRepository } from '@/infra/db/postgres-prisma'
import { DatabaseFields } from '@/data/protocols'

export const makeUpdatePatrimonyCheckExist = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistUserId(new SharedPostgresRepository(), DatabaseFields.patrimony))
  checkExists.push(new CheckExistPatrimonyId(makeDbCheckPatrimonyById(), 'id'))
  checkExists.push(new CheckExistOwnerId(makeDbCheckOwnerById(), 'ownerId'))
  checkExists.push(new CheckExistCategoryId(makeDbCheckCategoryById(), 'categoryId'))
  return new CheckExistComposite(checkExists)
}
