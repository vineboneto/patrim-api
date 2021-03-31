import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, unauthorized } from '@/presentation/helper'
import { Authentication } from '@/domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: LoginController.Params): Promise<HttpResponse> {
    const error = await this.validation.validate(request)
    if (error) return badRequest(error)
    const authenticationModel = await this.authentication.auth(request)
    if (!authenticationModel) return unauthorized()
    return null
  }
}

export namespace LoginController {
  export type Params = {
    email: string
    password: string
  }
}
