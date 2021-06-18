import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeleteCategory } from '@/domain/usecases'

export class DeleteCategoryController implements Controller {
  constructor (
    private readonly deleteCategory: DeleteCategory,
    private readonly validation: Validation
  ) {}

  async handle (request: DeleteCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const categoryDeleted = await this.deleteCategory.delete({
        id: Number(request.id),
        accountId: request.accountId
      })
      if (!categoryDeleted) {
        return unprocessableEntity(new LinkedDataError('categories'))
      }
      return ok(categoryDeleted)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteCategoryController {
  export type Request = {
    id: string
    accountId: number
  }
}
