import { makeUpdatePatrimonyValidation, makeUpdatePatrimonyCheckExist } from '@/main/factories/controllers'
import { makeLogControllerDecorator, makeUpdatePatrimonyDecorator } from '@/main/factories/decorators'
import { makeDbUpdatePatrimony } from '@/main/factories/usecases'
import { UpdatePatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdatePatrimonyController = (): Controller => {
  const updatePatrimony = makeDbUpdatePatrimony()
  const controller = new UpdatePatrimonyController(
    makeUpdatePatrimonyValidation(),
    makeUpdatePatrimonyCheckExist(),
    makeUpdatePatrimonyDecorator(updatePatrimony)
  )
  return makeLogControllerDecorator(controller)
}
