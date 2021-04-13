import { makeDbSaveCategory } from '@/main/factories/usecases'
import { makeSaveCategoryValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { SaveCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSaveCategoryController = (): Controller => {
  const controller = new SaveCategoryController(makeDbSaveCategory(), makeSaveCategoryValidation())
  return makeLogControllerDecorator(controller)
}