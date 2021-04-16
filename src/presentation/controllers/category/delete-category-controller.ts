import { Controller, HttpResponse } from '@/presentation/protocols'
import { forbidden, ok, serverError } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeleteCategory } from '@/domain/usecases'

export class DeleteCategoryController implements Controller {
  constructor (
    private readonly deleteCategory: DeleteCategory
  ) {}

  async handle (request: DeleteCategoryController.Request): Promise<HttpResponse> {
    try {
      const categoryDeleted = await this.deleteCategory.delete(request)
      if (!categoryDeleted) {
        return forbidden(new LinkedDataError('categories'))
      }
      return ok(categoryDeleted)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteCategoryController {
  export type Request = {
    id: number
  }
}
