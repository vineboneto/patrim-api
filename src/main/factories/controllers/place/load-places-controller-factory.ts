import { makeDbLoadPlaces } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { Controller } from '@/presentation/protocols'
import { LoadPlacesController } from '@/presentation/controllers'

export const makeLoadPlacesController = (): Controller => {
  const controller = new LoadPlacesController(makeDbLoadPlaces())
  return makeLogControllerDecorator(controller)
}
