import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { AddPlace } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

export class AddPlaceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly savePlace: AddPlace
  ) {}

  async handle (request: AddPlaceController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const placeModel = await this.savePlace.add(request)
      if (!placeModel) {
        return unprocessableEntity(new AlreadyExistsError(request.name))
      }
      return ok(placeModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddPlaceController {
  export type Request = {
    name: string
  }
}
