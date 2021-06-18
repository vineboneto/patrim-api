import { makeLogControllerDecorator, makeCheckAccessDataDecorator } from '@/main/factories/decorators'
import { makeDbDeleteCategory } from '@/main/factories/usecases'
import { makeDeleteCategoryValidation } from '@/main/factories/controllers'
import { CheckAccessDataDecorator } from '@/main/decorators'
import { DeleteCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeleteCategoryController = (): Controller => {
  const controller = new DeleteCategoryController(
    makeDbDeleteCategory(),
    makeDeleteCategoryValidation()
  )
  const checkAccess = makeCheckAccessDataDecorator(controller, templateDataAccess())
  return makeLogControllerDecorator(checkAccess)
}

const templateDataAccess = (): CheckAccessDataDecorator.Template[] => ([{
  databaseName: 'category',
  fieldName: 'id'
}])
