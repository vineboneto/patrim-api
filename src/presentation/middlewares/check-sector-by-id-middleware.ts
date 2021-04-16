import { CheckSectorById } from '@/domain/usecases'
import { HttpResponse, Middleware, Validation } from '@/presentation/protocols'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helper'

export class CheckSectorByIdMiddleware implements Middleware {
  constructor (
    private readonly checkSectorById: CheckSectorById,
    private readonly validation: Validation
  ) {}

  async handle (params: CheckSectorByIdMiddleware.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(params)
      if (error) {
        return badRequest(error)
      }
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
