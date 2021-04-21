import { makeDbUpdateOwner } from '@/main/factories/usecases'
import { makeUpdateOwnerValidation, makeCheckExistOwnerValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdateOwnerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateOwnerController = (): Controller => {
  const controller = new UpdateOwnerController(
    makeUpdateOwnerValidation(),
    makeCheckExistOwnerValidation(),
    makeDbUpdateOwner()
  )
  return makeLogControllerDecorator(controller)
}
