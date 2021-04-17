import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helper'

export class SavePlaceController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: SavePlaceController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace SavePlaceController {
  export type Request = {
    id?: number
    name: string
  }
}
