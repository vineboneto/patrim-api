import { makeUpdateCategoryValidation, makeCheckExistCategoryValidation } from '@/main/factories/controllers'
import { makeDbUpdateCategory } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdateCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateCategoryController = (): Controller => {
  const controller = new UpdateCategoryController(
    makeUpdateCategoryValidation(),
    makeCheckExistCategoryValidation(),
    makeDbUpdateCategory()
  )
  return makeLogControllerDecorator(controller)
}
