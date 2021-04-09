import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { DeleteCategory } from '@/domain/usecases'

export class DeleteCategoryController implements Controller {
  constructor (
    private readonly deleteCategory: DeleteCategory,
    private readonly validation: Validation
  ) {}

  async handle (request: DeleteCategoryController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    await this.deleteCategory.delete({ id: Number(request.id) })
    return null
  }
}

export namespace DeleteCategoryController {
  export type Request = {
    id: string
  }
}
