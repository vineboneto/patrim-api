import { makeUpdateCategoryValidation, makeCheckAccessDataCategory } from '@/main/factories/controllers'
import { makeDbUpdateCategory } from '@/main/factories/usecases'
import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { UpdateCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateCategoryController = (): Controller => {
  const controller = new UpdateCategoryController(makeDbUpdateCategory())
  const validationRequest = makeValidationRequestDecorator(controller, makeUpdateCategoryValidation())
  return makeLogControllerDecorator(makeCheckAccessDataCategory(validationRequest))
}
