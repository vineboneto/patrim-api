import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadPlaces } from '@/domain/usecases'
import { noContent } from '@/presentation/helper'

export class LoadPlacesController implements Controller {
  constructor (
    private readonly loadPlaces: LoadPlaces
  ) {}

  async handle (request: LoadPlacesController.Request): Promise<HttpResponse> {
    const places = await this.loadPlaces.load(request)
    return places.length ? null : noContent()
  }
}

export namespace LoadPlacesController {
  export type Request = {
    take?: number
    skip?: number
  }
}
