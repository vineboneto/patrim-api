import { makeDbCheckCategoryById, makeDbCheckOwnerById } from '@/main/factories/usecases'
import { CheckExist } from '@/presentation/protocols'
import { CheckExistCategoryId, CheckExistComposite, CheckExistOwnerId } from '@/validation/checks'

export const makeAddPatrimonyCheckExist = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistOwnerId(makeDbCheckOwnerById(), 'ownerId'))
  checkExists.push(new CheckExistCategoryId(makeDbCheckCategoryById(), 'categoryId'))
  return new CheckExistComposite(checkExists)
}
