import { makeDbDeletePatrimony } from '@/main/factories/usecases'
import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeCheckAccessDataDecorator, makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { makeValidationId } from '@/main/factories/validation'
import { DeletePatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeletePatrimonyController = (): Controller => {
  const controller = new DeletePatrimonyController(makeDbDeletePatrimony())
  const checkAccessData = makeCheckAccessDataDecorator(controller, templateDataAccess())
  const validationRequest = makeValidationRequestDecorator(checkAccessData, makeValidationId())
  return makeLogControllerDecorator(validationRequest)
}

const templateDataAccess = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'patrimony',
  fieldName: 'id'
}])
