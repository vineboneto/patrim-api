import { makeDbCheckSectorById, makeDbUpdateSector } from '@/main/factories/usecases'
import { makeUpdateSectorValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdateSectorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { CheckExistSectorId } from '@/validation/checks'

export const makeUpdateSectorController = (): Controller => {
  const controller = new UpdateSectorController(
    makeUpdateSectorValidation(),
    new CheckExistSectorId(makeDbCheckSectorById(), 'id'),
    makeDbUpdateSector()
  )
  return makeLogControllerDecorator(controller)
}
