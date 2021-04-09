import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteCategory } from '@/domain/usecases'

export class DeleteCategoryController implements Controller {
  constructor (
    private readonly deleteCategory: DeleteCategory
  ) {}

  async handle (request: DeleteCategoryController.Request): Promise<HttpResponse> {
    await this.deleteCategory.delete({ id: Number(request.id) })
    return null
  }
}

export namespace DeleteCategoryController {
  export type Request = {
    id: string
  }
}
