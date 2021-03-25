import { AddSectorController } from '@/presentation/controllers'
import { makeDbAddSector } from '@/main/factories/usecases'
import { makeAddSectorValidation } from '@/main/factories/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddSectorController = (): Controller => {
  return new AddSectorController(makeDbAddSector(), makeAddSectorValidation())
}
