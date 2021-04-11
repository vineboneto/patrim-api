import { makeDbSaveCategory, makeDbCheckCategoryById } from '@/main/factories/usecases'
import { makeUpdateCategoryValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdateCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateCategoryController = (): Controller => {
  const controller = new UpdateCategoryController(
    makeUpdateCategoryValidation(),
    makeDbSaveCategory(),
    makeDbCheckCategoryById()
  )
  return makeLogControllerDecorator(controller)
}
