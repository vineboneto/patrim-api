import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, unprocessableEntity, serverError, ok } from '@/presentation/helper/'
import { AlreadyExistsError } from '@/presentation/errors'
import { AddCategory } from '@/domain/usecases'

export class AddCategoryController implements Controller {
  constructor (
    private readonly saveCategory: AddCategory,
    private readonly validation: Validation
  ) {}

  async handle (request: AddCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const categoryModel = await this.saveCategory.add(request)
      if (!categoryModel) {
        return unprocessableEntity(new AlreadyExistsError(request.name))
      }
      return ok(categoryModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddCategoryController {
  export type Request = {
    name: string
  }
}
