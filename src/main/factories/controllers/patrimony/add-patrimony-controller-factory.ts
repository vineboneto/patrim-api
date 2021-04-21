import { makeAddPatrimonyValidation, makeAddPatrimonyCheckExist } from '@/main/factories/controllers'
import { makeDbAddPatrimony } from '@/main/factories/usecases'
import { AddPatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddPatrimonyController = (): Controller => {
  return new AddPatrimonyController(
    makeAddPatrimonyValidation(),
    makeAddPatrimonyCheckExist(),
    makeDbAddPatrimony()
  )
}
