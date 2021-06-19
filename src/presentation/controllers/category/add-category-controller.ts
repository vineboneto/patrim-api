import { Controller, HttpResponse } from '@/presentation/protocols'
import { unprocessableEntity, serverError, ok } from '@/presentation/helper/'
import { AlreadyExistsError } from '@/presentation/errors'
import { AddCategory } from '@/domain/usecases'

export class AddCategoryController implements Controller {
  constructor (
    private readonly addCategory: AddCategory
  ) {}

  async handle (request: AddCategoryController.Request): Promise<HttpResponse> {
    try {
      const categoryModel = await this.addCategory.add(request)
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
    accountId: number
  }
}
