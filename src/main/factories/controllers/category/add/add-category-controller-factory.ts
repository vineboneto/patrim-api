import { makeDbAddCategory } from '@/main/factories/usecases'
import { makeLogControllerDecorator, makeValidationRequestDecorator } from '@/main/factories/decorators'
import { AddCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'

export const makeAddCategoryController = (): Controller => {
  const controller = new AddCategoryController(makeDbAddCategory())
  const validationRequest = makeValidationRequestDecorator(controller, new RequiredFieldValidation('name'))
  return makeLogControllerDecorator(validationRequest)
}
