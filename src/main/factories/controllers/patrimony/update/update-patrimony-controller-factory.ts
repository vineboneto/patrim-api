import { makeUpdatePatrimonyValidation, makeUpdatePatrimonyCheckExist } from '@/main/factories/controllers'
import { makeDbUpdatePatrimony } from '@/main/factories/usecases'
import { UpdatePatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdatePatrimonyController = (): Controller => {
  return new UpdatePatrimonyController(
    makeUpdatePatrimonyValidation(),
    makeUpdatePatrimonyCheckExist(),
    makeDbUpdatePatrimony()
  )
}
