import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeAddPatrimonyValidation } from '@/main/factories/controllers'
import { makeCheckAccessDataDecorator, makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { makeDbAddPatrimony } from '@/main/factories/usecases'
import { AddPatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddPatrimonyController = (): Controller => {
  const controller = new AddPatrimonyController(makeDbAddPatrimony())
  const validationRequest = makeValidationRequestDecorator(controller, makeAddPatrimonyValidation())
  const checkAccessData = makeCheckAccessDataDecorator(validationRequest, templateDataAccess())
  return makeLogControllerDecorator(checkAccessData)
}

const templateDataAccess = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'category',
  fieldName: 'categoryId'
}, {
  databaseName: 'owner',
  fieldName: 'ownerId'
}])
