import { CheckOwnerById } from '@/domain/usecases'
import { HttpResponse, Middleware } from '@/presentation/protocols'
import { noContent, notFound, serverError } from '@/presentation/helper'

export class CheckOwnerByIdMiddleware implements Middleware {
  constructor (
    private readonly checkOwnerById: CheckOwnerById
  ) {}

  async handle (params: CheckOwnerByIdMiddleware.Params): Promise<HttpResponse> {
    try {
      const { id } = params
      const isValid = await this.checkOwnerById.checkById(id)
      if (!isValid) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CheckOwnerByIdMiddleware {
  export type Params = {
    id: string
  }
}
