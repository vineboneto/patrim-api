import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError, unauthorized } from '@/presentation/helper'
import { Authentication } from '@/domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (request: LoginController.Params): Promise<HttpResponse> {
    try {
      const authenticationModel = await this.authentication.auth(request)
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Params = {
    email: string
    password: string
  }
}
