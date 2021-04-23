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
  CheckExistPatrimonyId
} from '@/validation/checks'

export const makeUpdatePatrimonyCheckExist = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistPatrimonyId(makeDbCheckPatrimonyById(), 'id'))
  checkExists.push(new CheckExistOwnerId(makeDbCheckOwnerById(), 'ownerId'))
  checkExists.push(new CheckExistCategoryId(makeDbCheckCategoryById(), 'categoryId'))
  return new CheckExistComposite(checkExists)
}
