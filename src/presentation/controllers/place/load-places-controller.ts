import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadPlaces } from '@/domain/usecases'

export class LoadPlacesController implements Controller {
  constructor (
    private readonly loadPlaces: LoadPlaces
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const places = await this.loadPlaces.load()
      return places.length ? ok(places) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
