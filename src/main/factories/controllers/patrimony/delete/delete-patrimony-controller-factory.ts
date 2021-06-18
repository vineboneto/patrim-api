import { makeDeletePatrimonyValidation } from '@/main/factories/controllers'
import { makeDbDeletePatrimony } from '@/main/factories/usecases'
import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeCheckAccessDataDecorator, makeLogControllerDecorator } from '@/main/factories/decorators'
import { DeletePatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeletePatrimonyController = (): Controller => {
  const controller = new DeletePatrimonyController(
    makeDbDeletePatrimony(),
    makeDeletePatrimonyValidation()
  )
  const checkAccessData = makeCheckAccessDataDecorator(controller, templateDataAccess())
  return makeLogControllerDecorator(checkAccessData)
}

const templateDataAccess = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'patrimony',
  fieldName: 'id'
}])
