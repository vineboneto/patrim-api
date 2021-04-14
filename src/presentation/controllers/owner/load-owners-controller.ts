import { badRequest } from '@/presentation/helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoadOwnersController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: LoadOwnersController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace LoadOwnersController {
  export type Request = {
    take: string
    skip: string
  }
}
