import { makeDbCheckPlaceById } from '@/main/factories/usecases'
import { CheckExist } from '@/presentation/protocols'
import { CheckExistComposite, CheckExistPlaceId } from '@/validation/checks'

export const makeAddAccountPlaceCheckExist = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistPlaceId(makeDbCheckPlaceById(), 'placeId'))
  return new CheckExistComposite(checkExists)
}
