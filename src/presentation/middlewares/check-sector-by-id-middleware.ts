import { CheckSectorById } from '@/domain/usecases'
import { HttpResponse, Middleware } from '@/presentation/protocols'
import { noContent, notFound, serverError } from '@/presentation/helper'

export class CheckSectorByIdMiddleware implements Middleware {
  constructor (
    private readonly checkSectorById: CheckSectorById
  ) {}

  async handle (params: CheckSectorByIdMiddleware.Params): Promise<HttpResponse> {
    try {
      const isValid = await this.checkSectorById.checkById(params)
      if (!isValid) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CheckSectorByIdMiddleware {
  export type Params = {
    id: number
  }
}
