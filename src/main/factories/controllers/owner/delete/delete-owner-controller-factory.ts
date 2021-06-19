import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeValidationId } from '@/main/factories/validation'
import { makeDbDeleteOwner } from '@/main/factories/usecases'
import { makeCheckAccessDataDecorator, makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { DeleteOwnerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeleteOwnerController = (): Controller => {
  const controller = new DeleteOwnerController(makeDbDeleteOwner())
  const checkAccess = makeCheckAccessDataDecorator(controller, templateDataAccess())
  const validationRequest = makeValidationRequestDecorator(checkAccess, makeValidationId())
  return makeLogControllerDecorator(validationRequest)
}

const templateDataAccess = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'owner',
  fieldName: 'id'
}])
