import { Controller } from '@/presentation/protocols/controller'
import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeCheckAccessDataDecorator } from '@/main/factories/decorators'

export const makeCheckAccessDataSector = (controller: Controller): Controller => {
  return makeCheckAccessDataDecorator(controller, templateDataAccess())
}

const templateDataAccess = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'sector',
  fieldName: 'id'
}])
