import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helper'

export class AddAccountPlaceController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: AddAccountPlaceController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
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
