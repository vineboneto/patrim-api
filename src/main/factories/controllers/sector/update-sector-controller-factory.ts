import { makeDbSaveSector, makeDbCheckSectorById } from '@/main/factories/usecases'
import { makeUpdateSectorValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdateSectorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateSectorController = (): Controller => {
  const controller = new UpdateSectorController(
    makeUpdateSectorValidation(),
    makeDbSaveSector(),
    makeDbCheckSectorById()
  )
  return makeLogControllerDecorator(controller)
}
