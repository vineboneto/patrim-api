import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helper'

export class LoginController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: LoginController.Params): Promise<HttpResponse> {
    const error = await this.validation.validate(request)
    if (error) return badRequest(error)
    return null
  }
}

export namespace LoginController {
  export type Params = {
    email: string
    password: string
  }
}
