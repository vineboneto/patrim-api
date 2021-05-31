import { makeLoadPatrimoniesBySectorIdValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadPatrimoniesBySectorId } from '@/main/factories/usecases'
import { LoadPatrimoniesBySectorIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPatrimoniesBySectorIdController = (): Controller => {
  const controller = new LoadPatrimoniesBySectorIdController(
    makeLoadPatrimoniesBySectorIdValidation(),
    makeDbLoadPatrimoniesBySectorId()
  )
  return makeLogControllerDecorator(controller)
}
