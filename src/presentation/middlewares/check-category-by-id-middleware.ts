import { CheckCategoryById } from '@/domain/usecases'
import { HttpResponse, Middleware } from '@/presentation/protocols'

export class CheckCategoryByIdMiddleware implements Middleware {
  constructor (
    private readonly checkCategoryById: CheckCategoryById
  ) {}

  async handle (request: CheckCategoryByIdMiddleware.Request): Promise<HttpResponse> {
    const { id } = request
    await this.checkCategoryById.checkById(id)
    return null
  }
}

export namespace CheckCategoryByIdMiddleware {
  export type Request = {
    id: string
  }
}
