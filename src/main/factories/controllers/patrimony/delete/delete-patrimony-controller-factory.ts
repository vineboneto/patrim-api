import { makeDeletePatrimonyCheckExist, makeDeletePatrimonyValidation } from '@/main/factories/controllers'
import { makeDbDeletePatrimony } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { DeletePatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeletePatrimonyController = (): Controller => {
  const controller = new DeletePatrimonyController(
    makeDbDeletePatrimony(),
    makeDeletePatrimonyCheckExist(),
    makeDeletePatrimonyValidation()
  )
  return makeLogControllerDecorator(controller)
}
