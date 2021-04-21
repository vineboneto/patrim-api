import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbCheckSectorById, makeDbDeleteSector } from '@/main/factories/usecases'
import { makeDeleteSectorValidation } from '@/main/factories/controllers'
import { DeleteSectorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { CheckExistSectorId } from '@/validation/checks'

export const makeDeleteSectorController = (): Controller => {
  const controller = new DeleteSectorController(
    makeDbDeleteSector(),
    new CheckExistSectorId(makeDbCheckSectorById(), 'id'),
    makeDeleteSectorValidation()
  )
  return makeLogControllerDecorator(controller)
}
