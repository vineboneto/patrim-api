import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helper'
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
    await this.deleteCategory.delete({ id: Number(request.id) })
    return null
  }
}

export namespace DeleteCategoryController {
  export type Request = {
    id: string
  }
}
