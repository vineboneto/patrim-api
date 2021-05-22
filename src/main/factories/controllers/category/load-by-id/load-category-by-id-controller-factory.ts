import { makeLoadCategoryByIdValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadCategoryById } from '@/main/factories/usecases'
import { LoadCategoryByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadCategoryByIdController = (): Controller => {
  const controller = new LoadCategoryByIdController(
    makeLoadCategoryByIdValidation(),
    makeDbLoadCategoryById()
  )
  return makeLogControllerDecorator(controller)
}
