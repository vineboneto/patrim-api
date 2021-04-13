import { CheckSectorById } from '@/domain/usecases'
import { HttpResponse, Middleware } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { noContent, notFound, serverError } from '@/presentation/helper'

export class CheckSectorByIdMiddleware implements Middleware {
  constructor (
    private readonly checkSectorById: CheckSectorById
  ) {}

  async handle (request: CheckSectorByIdMiddleware.Request): Promise<HttpResponse> {
    try {
      const { id } = request
      const isValid = await this.checkSectorById.checkById(id)
      if (!isValid) {
        return notFound(new InvalidParamError('id'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CheckSectorByIdMiddleware {
  export type Request = {
    id: string
  }
}
