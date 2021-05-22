import { makeDbUpdateSector } from '@/main/factories/usecases'
import { makeUpdateSectorValidation, makeCheckExistSectorValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdateSectorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateSectorController = (): Controller => {
  const controller = new UpdateSectorController(
    makeUpdateSectorValidation(),
    makeCheckExistSectorValidation(),
    makeDbUpdateSector()
  )
  return makeLogControllerDecorator(controller)
}
