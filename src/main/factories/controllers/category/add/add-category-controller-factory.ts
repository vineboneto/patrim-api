import { makeDbAddCategory } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { AddCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'

export const makeAddCategoryController = (): Controller => {
  const controller = new AddCategoryController(makeDbAddCategory(), new RequiredFieldValidation('name'))
  return makeLogControllerDecorator(controller)
}
