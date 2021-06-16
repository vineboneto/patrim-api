import { makeUpdatePatrimonyValidation } from '@/main/factories/controllers'
import { makeLogControllerDecorator, makeUpdatePatrimonyDecorator } from '@/main/factories/decorators'
import { makeDbCheckAccessData, makeDbUpdatePatrimony } from '@/main/factories/usecases'
import { UpdatePatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdatePatrimonyController = (): Controller => {
  const controller = new UpdatePatrimonyController(
    makeUpdatePatrimonyValidation(),
    makeDbCheckAccessData(),
    makeUpdatePatrimonyDecorator(makeDbUpdatePatrimony())
  )
  return makeLogControllerDecorator(controller)
}
