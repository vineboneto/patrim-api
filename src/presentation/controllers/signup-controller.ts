import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helper'
import { EmailInUseError } from '@/presentation/errors'
import { AddAccount } from '@/domain/usecases'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)
      const isValid = await this.addAccount.add(request)
      if (!isValid) return forbidden(new EmailInUseError())
      return noContent()
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
