import { makeDbAddOwner } from '@/main/factories/usecases'
import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeAddOwnerValidation } from '@/main/factories/controllers'
import { makeCheckAccessDataDecorator, makeLogControllerDecorator } from '@/main/factories/decorators'
import { AddOwnerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddOwnerController = (): Controller => {
  const controller = new AddOwnerController(
    makeAddOwnerValidation(),
    makeDbAddOwner()
  )
  const checkAccess = makeCheckAccessDataDecorator(controller, templateDataAccess())
  return makeLogControllerDecorator(checkAccess)
}

const templateDataAccess = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'sector',
  fieldName: 'sectorId'
}])
