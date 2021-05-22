import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbDeleteCategory } from '@/main/factories/usecases'
import { makeDeleteCategoryValidation, makeCheckExistCategoryValidation } from '@/main/factories/controllers'
import { DeleteCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeleteCategoryController = (): Controller => {
  const controller = new DeleteCategoryController(
    makeDbDeleteCategory(),
    makeCheckExistCategoryValidation(),
    makeDeleteCategoryValidation()
  )
  return makeLogControllerDecorator(controller)
}
