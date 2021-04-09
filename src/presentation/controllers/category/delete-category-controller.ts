import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok } from '@/presentation/helper'
import { InvalidParamError } from '@/presentation/errors'
import { DeleteCategory } from '@/domain/usecases'

export class DeleteCategoryController implements Controller {
  constructor (
    private readonly deleteCategory: DeleteCategory,
    private readonly validation: Validation
  ) {}

  async handle (request: DeleteCategoryController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const categoryDeleted = await this.deleteCategory.delete({ id: Number(request.id) })
    return categoryDeleted ? ok(categoryDeleted) : forbidden(new InvalidParamError('id'))
  }
}

export namespace DeleteCategoryController {
  export type Request = {
    id: string
  }
}
