import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadPlaces } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helper'

export class LoadPlacesController implements Controller {
  constructor (
    private readonly loadPlaces: LoadPlaces
  ) {}

  async handle (request: LoadPlacesController.Request): Promise<HttpResponse> {
    try {
      const places = await this.loadPlaces.load(request)
      return places.length ? ok(places) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadPlacesController {
  export type Request = {
    take?: number
    skip?: number
  }
}
