import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeUpdatePatrimonyValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator, makeUpdatePatrimonyDecorator } from '@/main/factories/decorators'
import { makeCheckAccessDataDecorator } from '@/main/factories/decorators/check-access-data-decorator-factory'
import { makeDbUpdatePatrimony } from '@/main/factories/usecases'
import { UpdatePatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdatePatrimonyController = (): Controller => {
  const controller = new UpdatePatrimonyController(
    makeUpdatePatrimonyValidation(),
    makeUpdatePatrimonyDecorator(makeDbUpdatePatrimony())
  )
  const checkAccess = makeCheckAccessDataDecorator(controller, templateDataAccess())
  return makeLogControllerDecorator(checkAccess)
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
