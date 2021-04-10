import { makeDbSaveSector, makeDbCheckSectorById } from '@/main/factories/usecases'
import { makeSaveSectorValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { SaveSectorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSaveSectorController = (): Controller => {
  const controller = new SaveSectorController(
    makeSaveSectorValidation(),
    makeDbSaveSector(),
    makeDbCheckSectorById()
  )
  return makeLogControllerDecorator(controller)
}
