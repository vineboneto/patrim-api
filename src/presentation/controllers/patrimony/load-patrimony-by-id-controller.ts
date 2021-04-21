import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helper'

export class LoadPatrimonyByIdController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: LoadPatrimonyByIdController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace LoadPatrimonyByIdController {
  export type Request = {
    id: number
  }
}
