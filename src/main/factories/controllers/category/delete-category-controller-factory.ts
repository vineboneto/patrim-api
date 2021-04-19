import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbCheckCategoryById, makeDbDeleteCategory } from '@/main/factories/usecases'
import { makeDeleteCategoryValidation } from '@/main/factories/controllers'
import { DeleteCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { CheckExistCategoryId } from '@/validation/checks'

export const makeDeleteCategoryController = (): Controller => {
  const controller = new DeleteCategoryController(
    makeDbDeleteCategory(),
    new CheckExistCategoryId(makeDbCheckCategoryById(), 'id'),
    makeDeleteCategoryValidation()
  )
  return makeLogControllerDecorator(controller)
}
