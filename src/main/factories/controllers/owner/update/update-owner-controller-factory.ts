import { makeDbUpdateOwner } from '@/main/factories/usecases'
import { makeUpdateOwnerValidation } from '@/main/factories/controllers'
import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeCheckAccessDataDecorator, makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { UpdateOwnerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateOwnerController = (): Controller => {
  const controller = new UpdateOwnerController(makeDbUpdateOwner())
  const validationRequest = makeValidationRequestDecorator(controller, makeUpdateOwnerValidation())
  const checkAccess = makeCheckAccessDataDecorator(validationRequest, templateDataAccess())
  return makeLogControllerDecorator(checkAccess)
}

const templateDataAccess = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'owner',
  fieldName: 'id'
}, {
  databaseName: 'sector',
  fieldName: 'sectorId'
}])
