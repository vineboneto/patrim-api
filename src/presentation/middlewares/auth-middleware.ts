import { HttpResponse, Middleware } from '@/presentation/protocols'
import { LoadAccountByToken } from '@/domain/usecases'
import { forbidden } from '@/presentation/helper'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    const { accessToken } = request
    const account = await this.loadAccountByToken.load(accessToken, this.role)
    if (!account) {
      return forbidden(new AccessDeniedError())
    }
    return null
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken: string
  }
}
