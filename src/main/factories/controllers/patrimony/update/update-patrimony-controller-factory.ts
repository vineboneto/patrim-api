import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeUpdatePatrimonyValidation } from '@/main/factories/controllers'
import {
  makeLogControllerDecorator,
  makeCheckAccessDataDecorator,
  makeValidationRequestDecorator
} from '@/main/factories/decorators'
import { makeDbUpdatePatrimony } from '@/main/factories/usecases'
import { UpdatePatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdatePatrimonyController = (): Controller => {
  const controller = new UpdatePatrimonyController(makeDbUpdatePatrimony())
  const checkAccessData = makeCheckAccessDataDecorator(controller, templateDataAccess())
  const validationRequest = makeValidationRequestDecorator(checkAccessData, makeUpdatePatrimonyValidation())
  return makeLogControllerDecorator(validationRequest)
}

const templateDataAccess = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'patrimony',
  fieldName: 'id'
}, {
  databaseName: 'category',
  fieldName: 'categoryId'
}, {
  databaseName: 'owner',
  fieldName: 'ownerId'
}])
