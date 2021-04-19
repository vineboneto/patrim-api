import { makeSaveToUpdatePatrimonyValidation, makeSaveToUpdatePatrimonyCheckExist } from '@/main/factories/controllers'
import { makeDbSavePatrimony } from '@/main/factories/usecases'
import { SavePatrimonyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSaveToUpdatePatrimonyController = (): Controller => {
  return new SavePatrimonyController(
    makeSaveToUpdatePatrimonyValidation(),
    makeSaveToUpdatePatrimonyCheckExist(),
    makeDbSavePatrimony()
  )
}
