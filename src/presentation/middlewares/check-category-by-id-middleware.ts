import { CheckCategoryById } from '@/domain/usecases'
import { HttpResponse, Middleware, Validation } from '@/presentation/protocols'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helper'

export class CheckCategoryByIdMiddleware implements Middleware {
  constructor (
    private readonly checkCategoryById: CheckCategoryById,
    private readonly validation: Validation
  ) {}

  async handle (params: CheckCategoryByIdMiddleware.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(params)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.checkCategoryById.checkById(params)
      if (!isValid) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CheckCategoryByIdMiddleware {
  export type Params = {
    id: number
  }
}
