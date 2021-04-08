import { makeDbLoadCategories } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { LoadCategoriesController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadCategoriesController = (): Controller => {
  const controller = new LoadCategoriesController(makeDbLoadCategories())
  return makeLogControllerDecorator(controller)
}
