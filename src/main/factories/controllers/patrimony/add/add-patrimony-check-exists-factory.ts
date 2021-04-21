import { makeDbCheckCategoryById, makeDbCheckOwnerById, makeDbCheckPlaceById } from '@/main/factories/usecases'
import { CheckExist } from '@/presentation/protocols'
import { CheckExistCategoryId, CheckExistComposite, CheckExistOwnerId, CheckExistPlaceId } from '@/validation/checks'

export const makeAddPatrimonyCheckExist = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistOwnerId(makeDbCheckOwnerById(), 'ownerId'))
  checkExists.push(new CheckExistPlaceId(makeDbCheckPlaceById(), 'placeId'))
  checkExists.push(new CheckExistCategoryId(makeDbCheckCategoryById(), 'categoryId'))
  return new CheckExistComposite(checkExists)
}
