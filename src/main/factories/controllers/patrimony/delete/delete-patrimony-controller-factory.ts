import { makeDbDeletePatrimony } from '@/main/factories/usecases'
import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeCheckAccessDataDecorator, makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { makeValidationId } from '@/main/factories/validation'
import { DeletePatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeletePatrimonyController = (): Controller => {
  const controller = new DeletePatrimonyController(makeDbDeletePatrimony())
  const validationRequest = makeValidationRequestDecorator(controller, makeValidationId())
  const checkAccessData = makeCheckAccessDataDecorator(validationRequest, templateDataAccess())
  return makeLogControllerDecorator(checkAccessData)
}

const templateDataAccess = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'patrimony',
  fieldName: 'id'
}])
