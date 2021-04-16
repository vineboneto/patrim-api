import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, unprocessableEntity, serverError, ok } from '@/presentation/helper/'
import { AlreadyExistsError } from '@/presentation/errors'
import { SaveCategory } from '@/domain/usecases'

export class SaveCategoryController implements Controller {
  constructor (
    private readonly saveCategory: SaveCategory,
    private readonly validation: Validation
  ) {}

  async handle (request: SaveCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const categoryModel = await this.saveCategory.save(request)
      if (!categoryModel) {
        return unprocessableEntity(new AlreadyExistsError(request.name))
      }
      return ok(categoryModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveCategoryController {
  export type Request = {
    id?: number
    name: string
  }
}
