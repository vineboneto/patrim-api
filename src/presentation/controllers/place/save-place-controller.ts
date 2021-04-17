import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, unprocessableEntity } from '@/presentation/helper'
import { SavePlace } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

export class SavePlaceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly savePlace: SavePlace
  ) {}

  async handle (request: SavePlaceController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const placeModel = await this.savePlace.save(request)
    if (!placeModel) {
      return unprocessableEntity(new AlreadyExistsError(request.name))
    }
    return ok(placeModel)
  }
}

export namespace SavePlaceController {
  export type Request = {
    id?: number
    name: string
  }
}
