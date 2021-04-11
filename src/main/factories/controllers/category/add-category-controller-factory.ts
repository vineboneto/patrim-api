import { makeDbSaveCategory } from '@/main/factories/usecases'
import { makeAddCategoryValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { AddCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddCategoryController = (): Controller => {
  const controller = new AddCategoryController(makeDbSaveCategory(), makeAddCategoryValidation())
  return makeLogControllerDecorator(controller)
}
