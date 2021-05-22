import { makeLoadSectorByIdValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadSectorById } from '@/main/factories/usecases'
import { LoadSectorByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadSectorByIdController = (): Controller => {
  const controller = new LoadSectorByIdController(
    makeLoadSectorByIdValidation(),
    makeDbLoadSectorById()
  )
  return makeLogControllerDecorator(controller)
}
