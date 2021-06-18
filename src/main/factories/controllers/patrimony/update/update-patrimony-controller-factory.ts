import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeUpdatePatrimonyValidation } from '@/main/factories/controllers'
import {
  makeLogControllerDecorator,
  makeUpdatePatrimonyDecorator,
  makeCheckAccessDataDecorator
} from '@/main/factories/decorators'
import { makeDbUpdatePatrimony } from '@/main/factories/usecases'
import { UpdatePatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdatePatrimonyController = (): Controller => {
  const controller = new UpdatePatrimonyController(
    makeUpdatePatrimonyValidation(),
    makeUpdatePatrimonyDecorator(makeDbUpdatePatrimony())
  )
  const checkAccessData = makeCheckAccessDataDecorator(controller, templateDataAccess())
  return makeLogControllerDecorator(checkAccessData)
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
