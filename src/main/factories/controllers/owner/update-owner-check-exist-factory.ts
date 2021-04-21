import { CheckExist } from '@/presentation/protocols'
import { CheckExistComposite, CheckExistOwnerId, CheckExistSectorId } from '@/validation/checks'
import { makeDbCheckOwnerById, makeDbCheckSectorById } from '@/main/factories/usecases'

export const makeCheckExistOwnerValidation = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistSectorId(makeDbCheckSectorById(), 'sectorId'))
  checkExists.push(new CheckExistOwnerId(makeDbCheckOwnerById(), 'id'))
  return new CheckExistComposite(checkExists)
}
