import { CheckPlaceById } from '@/domain/usecases'
import { HttpResponse, Middleware, Validation } from '@/presentation/protocols'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helper'

export class CheckPlaceByIdMiddleware implements Middleware {
  constructor (
    private readonly checkPlaceById: CheckPlaceById,
    private readonly validation: Validation
  ) {}

  async handle (params: CheckPlaceByIdMiddleware.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(params)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.checkPlaceById.checkById(params)
      if (!isValid) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CheckPlaceByIdMiddleware {
  export type Params = {
    id: number
  }
}
