import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper'
import { EmailInUseError } from '@/presentation/errors'
import { AddAccount, Authentication } from '@/domain/usecases'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)
      const isValid = await this.addAccount.add(request)
      if (!isValid) return forbidden(new EmailInUseError())
      const authentication = await this.authentication.auth({
        email: request.email,
        password: request.password
      })
      return ok(authentication)
    } catch (error) {
      return serverError(error)
    }
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
