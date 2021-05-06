import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { UpdateCategory } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

export class UpdateCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist,
    private readonly updateCategory: UpdateCategory
  ) {}

  async handle (request: UpdateCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const checkError = await this.checkExist.check(request)
      if (checkError) {
        return forbidden(checkError)
      }
      const categoryModel = await this.updateCategory.update(request)
      if (!categoryModel) {
        return unprocessableEntity(new AlreadyExistsError(request.name))
      }
      return ok(categoryModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateCategoryController {
  export type Request = {
    id: number
    name: string
    accountId: number
  }
}
