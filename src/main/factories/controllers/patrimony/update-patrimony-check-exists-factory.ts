import {
  makeDbCheckCategoryById,
  makeDbCheckOwnerById,
  makeDbCheckPatrimonyById,
  makeDbCheckPlaceById
} from '@/main/factories/usecases'
import { CheckExist } from '@/presentation/protocols'
import { CheckExistCategoryId, CheckExistComposite, CheckExistOwnerId, CheckExistPatrimonyId, CheckExistPlaceId } from '@/validation/checks'

export const makeUpdatePatrimonyCheckExist = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistPatrimonyId(makeDbCheckPatrimonyById(), 'id'))
  checkExists.push(new CheckExistOwnerId(makeDbCheckOwnerById(), 'ownerId'))
  checkExists.push(new CheckExistPlaceId(makeDbCheckPlaceById(), 'placeId'))
  checkExists.push(new CheckExistCategoryId(makeDbCheckCategoryById(), 'categoryId'))
  return new CheckExistComposite(checkExists)
}
