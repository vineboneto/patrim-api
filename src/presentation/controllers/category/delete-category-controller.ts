import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeleteCategory } from '@/domain/usecases'

export class DeleteCategoryController implements Controller {
  constructor (
    private readonly deleteCategory: DeleteCategory,
    private readonly checkExist: CheckExist,
    private readonly validation: Validation
  ) {}

  async handle (request: DeleteCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const existError = await this.checkExist.check(request)
      if (existError) {
        return forbidden(existError)
      }
      const categoryDeleted = await this.deleteCategory.delete(request)
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
    id: number
  }
}
