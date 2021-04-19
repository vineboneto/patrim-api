import { makeSaveToAddPatrimonyValidation, makeSaveToAddPatrimonyCheckExist } from '@/main/factories/controllers'
import { makeDbSavePatrimony } from '@/main/factories/usecases'
import { SavePatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSaveToAddPatrimonyController = (): Controller => {
  return new SavePatrimonyController(
    makeSaveToAddPatrimonyValidation(),
    makeSaveToAddPatrimonyCheckExist(),
    makeDbSavePatrimony()
  )
}
