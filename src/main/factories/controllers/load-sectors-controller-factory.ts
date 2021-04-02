import { LoadSectorsController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../decorators'
import { makeDbLoadSectors } from '../usecases'

export const makeLoadSectorsController = (): Controller => {
  const controller = new LoadSectorsController(makeDbLoadSectors())
  return makeLogControllerDecorator(controller)
}
