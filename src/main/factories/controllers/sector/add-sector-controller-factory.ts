import { makeDbAddSector } from '@/main/factories/usecases'
import { makeAddSectorValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { AddSectorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddSectorController = (): Controller => {
  const controller = new AddSectorController(makeDbAddSector(), makeAddSectorValidation())
  return makeLogControllerDecorator(controller)
}
