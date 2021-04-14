import { Controller } from '@/presentation/protocols'
import { SaveOwnerController } from '@/presentation/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeSaveOwnerValidation } from '@/main/factories/controllers'
import { makeDbSaveOwner } from '@/main/factories/usecases'

export const makeSaveOwnerController = (): Controller => {
  const controller = new SaveOwnerController(makeSaveOwnerValidation(), makeDbSaveOwner())
  return makeLogControllerDecorator(controller)
}
