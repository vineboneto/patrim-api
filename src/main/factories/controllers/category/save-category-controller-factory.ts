import { makeDbSaveCategory } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { SaveCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'

export const makeSaveCategoryController = (): Controller => {
  const controller = new SaveCategoryController(makeDbSaveCategory(), new RequiredFieldValidation('name'))
  return makeLogControllerDecorator(controller)
}
