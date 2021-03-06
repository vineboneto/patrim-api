import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { makeDbDeleteCategory } from '@/main/factories/usecases'
import { makeCheckAccessDataCategory } from '@/main/factories/controllers'
import { DeleteCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeValidationId } from '@/main/factories/validation'

export const makeDeleteCategoryController = (): Controller => {
  const controller = new DeleteCategoryController(makeDbDeleteCategory())
  const checkAccess = makeCheckAccessDataCategory(controller)
  const validationRequest = makeValidationRequestDecorator(checkAccess, makeValidationId())
  return makeLogControllerDecorator(validationRequest)
}
