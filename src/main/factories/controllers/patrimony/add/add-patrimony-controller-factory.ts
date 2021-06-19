import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeAddPatrimonyValidation } from '@/main/factories/controllers'
import { makeCheckAccessDataDecorator, makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { makeDbAddPatrimony } from '@/main/factories/usecases'
import { AddPatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddPatrimonyController = (): Controller => {
  const controller = new AddPatrimonyController(makeDbAddPatrimony())
  const checkAccessData = makeCheckAccessDataDecorator(controller, templateDataAccess())
  const validationRequest = makeValidationRequestDecorator(checkAccessData, makeAddPatrimonyValidation())
  return makeLogControllerDecorator(validationRequest)
}

const templateDataAccess = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'category',
  fieldName: 'categoryId'
}, {
  databaseName: 'owner',
  fieldName: 'ownerId'
}])
