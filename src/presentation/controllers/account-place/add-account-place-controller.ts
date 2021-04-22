import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddAccountPlaceController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: AddAccountPlaceController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return null
  }
}

export namespace AddAccountPlaceController {
  export type Request = {
    placeId: number
    accountId: number
  }
}
