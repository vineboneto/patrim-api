import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: LoginController.Params): Promise<HttpResponse> {
    await this.validation.validate(request)
    return null
  }
}

export namespace LoginController {
  export type Params = {
    email: string
    password: string
  }
}
