import { makeDbAddOwner, makeDbCheckSectorById } from '@/main/factories/usecases'
import { makeAddOwnerValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { AddOwnerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { CheckExistSectorId } from '@/validation/checks'

export const makeAddOwnerController = (): Controller => {
  const controller = new AddOwnerController(
    makeAddOwnerValidation(),
    new CheckExistSectorId(makeDbCheckSectorById(), 'sectorId'),
    makeDbAddOwner()
  )
  return makeLogControllerDecorator(controller)
}
