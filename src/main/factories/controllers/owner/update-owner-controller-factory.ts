import { makeDbCheckOwnerById, makeDbUpdateOwner } from '@/main/factories/usecases'
import { makeUpdateOwnerValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdateOwnerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { CheckExistOwnerId } from '@/validation/checks'

export const makeUpdateOwnerController = (): Controller => {
  const controller = new UpdateOwnerController(
    makeUpdateOwnerValidation(),
    new CheckExistOwnerId(makeDbCheckOwnerById(), 'id'),
    makeDbUpdateOwner()
  )
  return makeLogControllerDecorator(controller)
}
