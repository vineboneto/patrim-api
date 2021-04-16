import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbDeleteSector } from '@/main/factories/usecases'
import { DeleteSectorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeleteSectorController = (): Controller => {
  const controller = new DeleteSectorController(makeDbDeleteSector())
  return makeLogControllerDecorator(controller)
}
