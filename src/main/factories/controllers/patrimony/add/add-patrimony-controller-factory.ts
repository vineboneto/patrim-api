import { makeAddPatrimonyValidation, makeAddPatrimonyCheckExist } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddPatrimony } from '@/main/factories/usecases'
import { AddPatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddPatrimonyController = (): Controller => {
  const controller = new AddPatrimonyController(
    makeAddPatrimonyValidation(),
    makeAddPatrimonyCheckExist(),
    makeDbAddPatrimony()
  )
  return makeLogControllerDecorator(controller)
}
