import { makeAddAccountPlaceValidation, makeAddAccountPlaceCheckExist } from '@/main/factories/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddAccountPlace } from '@/main/factories/usecases'
import { AddAccountPlaceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddAccountPlaceController = (): Controller => {
  const controller = new AddAccountPlaceController(
    makeAddAccountPlaceValidation(),
    makeAddAccountPlaceCheckExist(),
    makeDbAddAccountPlace()
  )
  return makeLogControllerDecorator(controller)
}
