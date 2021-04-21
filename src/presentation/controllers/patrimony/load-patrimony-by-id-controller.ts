import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helper'

export class LoadPatrimonyByIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist
  ) {}

  async handle (request: LoadPatrimonyByIdController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.checkExist.check(request)
    return null
  }
}

export namespace LoadPatrimonyByIdController {
  export type Request = {
    id: number
  }
}
