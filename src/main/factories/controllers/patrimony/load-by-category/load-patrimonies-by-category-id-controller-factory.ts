import { makeLoadPatrimoniesByCategoryIdValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadPatrimoniesByCategoryId } from '@/main/factories/usecases'
import { LoadPatrimoniesByCategoryIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPatrimoniesByCategoryIdController = (): Controller => {
  const controller = new LoadPatrimoniesByCategoryIdController(
    makeLoadPatrimoniesByCategoryIdValidation(),
    makeDbLoadPatrimoniesByCategoryId()
  )
  return makeLogControllerDecorator(controller)
}
