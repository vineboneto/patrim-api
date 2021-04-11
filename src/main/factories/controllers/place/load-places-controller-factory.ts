import { makeDbLoadPlaces } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { LoadPlacesController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPlacesController = (): Controller => {
  const controller = new LoadPlacesController(makeDbLoadPlaces())
  return makeLogControllerDecorator(controller)
}
