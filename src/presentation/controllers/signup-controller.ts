import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return null
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
