import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadCategoryById } from '@/main/factories/usecases'
import { makeValidationId } from '@/main/factories/validation'
import { LoadCategoryByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadCategoryByIdController = (): Controller => {
  const controller = new LoadCategoryByIdController(
    makeValidationId(),
    makeDbLoadCategoryById()
  )
  return makeLogControllerDecorator(controller)
}
