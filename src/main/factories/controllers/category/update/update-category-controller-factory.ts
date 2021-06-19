import { makeUpdateCategoryValidation, makeCheckAccessDataCategory } from '@/main/factories/controllers'
import { makeDbUpdateCategory } from '@/main/factories/usecases'
import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { UpdateCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateCategoryController = (): Controller => {
  const controller = new UpdateCategoryController(makeDbUpdateCategory())
  const checkAccess = makeCheckAccessDataCategory(controller)
  const validationRequest = makeValidationRequestDecorator(checkAccess, makeUpdateCategoryValidation())
  return makeLogControllerDecorator(validationRequest)
}
