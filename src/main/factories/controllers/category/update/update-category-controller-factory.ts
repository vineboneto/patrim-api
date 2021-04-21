import { makeDbCheckCategoryById, makeDbUpdateCategory } from '@/main/factories/usecases'
import { makeUpdateCategoryValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdateCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { CheckExistCategoryId } from '@/validation/checks'

export const makeUpdateCategoryController = (): Controller => {
  const controller = new UpdateCategoryController(
    makeUpdateCategoryValidation(),
    new CheckExistCategoryId(makeDbCheckCategoryById(), 'id'),
    makeDbUpdateCategory()
  )
  return makeLogControllerDecorator(controller)
}
