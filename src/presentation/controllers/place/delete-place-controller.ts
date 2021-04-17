import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeletePlace } from '@/domain/usecases'
import { forbidden, ok } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'

export class DeletePlaceController implements Controller {
  constructor (
    private readonly deletePlace: DeletePlace
  ) {}

  async handle (request: DeletePlaceController.Request): Promise<HttpResponse> {
    const placeModel = await this.deletePlace.delete(request)
    if (!placeModel) {
      return forbidden(new LinkedDataError('patrimonies'))
    }
    return ok(placeModel)
  }
}

export namespace DeletePlaceController {
  export type Request = {
    id: number
  }
}
