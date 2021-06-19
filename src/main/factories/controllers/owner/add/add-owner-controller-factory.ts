import { makeDbAddOwner } from '@/main/factories/usecases'
import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeAddOwnerValidation } from '@/main/factories/controllers'
import {
  makeCheckAccessDataDecorator,
  makeLogControllerDecorator,
  makeValidationRequestDecorator
} from '@/main/factories/decorators'
import { AddOwnerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddOwnerController = (): Controller => {
  const controller = new AddOwnerController(makeDbAddOwner())
  const validationRequest = makeValidationRequestDecorator(controller, makeAddOwnerValidation())
  const checkAccess = makeCheckAccessDataDecorator(validationRequest, templateDataAccess())
  return makeLogControllerDecorator(checkAccess)
}

const templateDataAccess = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'sector',
  fieldName: 'sectorId'
}])
