import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { UpdatePlace } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

export class UpdatePlaceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist,
    private readonly updatePlace: UpdatePlace
  ) {}

  async handle (request: UpdatePlaceController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const checkError = await this.checkExist.check(request)
      if (checkError) {
        return forbidden(checkError)
      }
      const placeModel = await this.updatePlace.update(request)
      if (!placeModel) {
        return unprocessableEntity(new AlreadyExistsError(request.name))
      }
      return ok(placeModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdatePlaceController {
  export type Request = {
    id: number
    name: string
  }
}
