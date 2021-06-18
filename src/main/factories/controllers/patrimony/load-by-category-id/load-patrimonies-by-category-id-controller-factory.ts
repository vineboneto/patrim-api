import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadPatrimoniesByCategoryId } from '@/main/factories/usecases'
import { makeValidationId } from '@/main/factories/validation'
import { LoadPatrimoniesByCategoryIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPatrimoniesByCategoryIdController = (): Controller => {
  const controller = new LoadPatrimoniesByCategoryIdController(
    makeValidationId(),
    makeDbLoadPatrimoniesByCategoryId()
  )
  return makeLogControllerDecorator(controller)
}
