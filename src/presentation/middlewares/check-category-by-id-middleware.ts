import { CheckCategoryById } from '@/domain/usecases'
import { HttpResponse, Middleware } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { notFound } from '@/presentation/helper'

export class CheckCategoryByIdMiddleware implements Middleware {
  constructor (
    private readonly checkCategoryById: CheckCategoryById
  ) {}

  async handle (request: CheckCategoryByIdMiddleware.Request): Promise<HttpResponse> {
    const { id } = request
    const isValid = await this.checkCategoryById.checkById(id)
    if (!isValid) {
      return notFound(new InvalidParamError('id'))
    }
    return null
  }
}

export namespace CheckCategoryByIdMiddleware {
  export type Request = {
    id: string
  }
}
