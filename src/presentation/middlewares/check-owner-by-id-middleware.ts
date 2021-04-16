import { CheckOwnerById } from '@/domain/usecases'
import { HttpResponse, Middleware, Validation } from '@/presentation/protocols'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helper'

export class CheckOwnerByIdMiddleware implements Middleware {
  constructor (
    private readonly checkOwnerById: CheckOwnerById,
    private readonly validation: Validation
  ) {}

  async handle (params: CheckOwnerByIdMiddleware.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(params)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.checkOwnerById.checkById(params)
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
    id: number
  }
}
