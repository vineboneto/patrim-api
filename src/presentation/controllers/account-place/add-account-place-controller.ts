import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden } from '@/presentation/helper'

export class AddAccountPlaceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist
  ) {}

  async handle (request: AddAccountPlaceController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const checkError = await this.checkExist.check(request)
    if (checkError) {
      return forbidden(checkError)
    }
    return null
  }
}

export namespace AddAccountPlaceController {
  export type Request = {
    placeId: number
    accountId: number
  }
}
