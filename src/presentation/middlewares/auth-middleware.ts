import { HttpResponse, Middleware } from '@/presentation/protocols'
import { LoadAccountByToken } from '@/domain/usecases'
import { forbidden, ok, serverError } from '@/presentation/helper'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      const account = await this.loadAccountByToken.load(accessToken, this.role)
      if (!account) {
        return forbidden(new AccessDeniedError())
      }
      return ok({ id: account.id })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken: string
  }
}