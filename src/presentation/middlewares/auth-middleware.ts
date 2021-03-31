import { HttpResponse, Middleware } from '@/presentation/protocols'
import { LoadAccountByToken } from '@/domain/usecases'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    const { accessToken } = request
    await this.loadAccountByToken.load(accessToken, this.role)
    return null
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken: string
  }
}
