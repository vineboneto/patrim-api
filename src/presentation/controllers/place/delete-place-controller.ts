import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeletePlace } from '@/domain/usecases'

export class DeletePlaceController implements Controller {
  constructor (
    private readonly deletePlace: DeletePlace,
    private readonly checkExist: CheckExist,
    private readonly validation: Validation
  ) {}

  async handle (request: DeletePlaceController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const existError = await this.checkExist.check(request)
      if (existError) {
        return forbidden(existError)
      }
      const categoryDeleted = await this.deletePlace.delete(request)
      if (!categoryDeleted) {
        return forbidden(new LinkedDataError('patrimonies'))
      }
      return ok(categoryDeleted)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeletePlaceController {
  export type Request = {
    id: number
  }
}
