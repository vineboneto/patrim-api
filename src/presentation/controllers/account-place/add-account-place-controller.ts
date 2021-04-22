import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, serverError } from '@/presentation/helper'
import { AddAccountPlace } from '@/domain/usecases'

export class AddAccountPlaceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist,
    private readonly addAccountPlace: AddAccountPlace
  ) {}

  async handle (request: AddAccountPlaceController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const checkError = await this.checkExist.check(request)
      if (checkError) {
        return forbidden(checkError)
      }
      await this.addAccountPlace.add(request)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddAccountPlaceController {
  export type Request = {
    placeId: number
    accountId: number
  }
}
