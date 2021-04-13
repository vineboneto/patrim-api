import { CheckCategoryById } from '@/domain/usecases'
import { HttpResponse, Middleware } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helper'

export class CheckCategoryByIdMiddleware implements Middleware {
  constructor (
    private readonly checkCategoryById: CheckCategoryById
  ) {}

  async handle (request: CheckCategoryByIdMiddleware.Request): Promise<HttpResponse> {
    try {
      const { id } = request
      const isValid = await this.checkCategoryById.checkById(id)
      if (!isValid) {
        return notFound(new InvalidParamError('id'))
      }
      return ok({ id })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CheckCategoryByIdMiddleware {
  export type Request = {
    id: string
  }
}
