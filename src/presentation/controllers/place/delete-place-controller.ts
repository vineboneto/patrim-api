import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeletePlace } from '@/domain/usecases'

export class DeletePlaceController implements Controller {
  constructor (
    private readonly deletePlace: DeletePlace
  ) {}

  async handle (request: DeletePlaceController.Request): Promise<HttpResponse> {
    await this.deletePlace.delete(request)
    return null
  }
}

export namespace DeletePlaceController {
  export type Request = {
    id: number
  }
}
