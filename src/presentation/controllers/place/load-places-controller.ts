import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadPlaces } from '@/domain/usecases'

export class LoadPlacesController implements Controller {
  constructor (
    private readonly loadPlaces: LoadPlaces
  ) {}

  async handle (request: LoadPlacesController.Request): Promise<HttpResponse> {
    await this.loadPlaces.load(request)
    return null
  }
}

export namespace LoadPlacesController {
  export type Request = {
    take?: number
    skip?: number
  }
}
