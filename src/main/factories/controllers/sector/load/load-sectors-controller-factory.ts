import { makeDbLoadSectors } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { LoadSectorsController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadSectorsController = (): Controller => {
  const controller = new LoadSectorsController(makeDbLoadSectors())
  return makeLogControllerDecorator(controller)
}
