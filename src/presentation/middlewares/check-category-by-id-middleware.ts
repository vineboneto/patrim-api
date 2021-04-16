import { CheckCategoryById } from '@/domain/usecases'
import { HttpResponse, Middleware } from '@/presentation/protocols'
import { noContent, notFound, serverError } from '@/presentation/helper'

export class CheckCategoryByIdMiddleware implements Middleware {
  constructor (
    private readonly checkCategoryById: CheckCategoryById
  ) {}

  async handle (params: CheckCategoryByIdMiddleware.Params): Promise<HttpResponse> {
    try {
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
