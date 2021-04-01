import { AddSectorController } from '@/presentation/controllers'
import { makeDbAddSector } from '@/main/factories/usecases'
import { makeAddSectorValidation } from '@/main/factories/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators'

export const makeAddSectorController = (): Controller => {
  const controller = new AddSectorController(makeDbAddSector(), makeAddSectorValidation())
  return makeLogControllerDecorator(controller)
}
