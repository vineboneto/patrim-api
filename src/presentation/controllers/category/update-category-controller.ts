import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, serverError } from '@/presentation/helper'
import { UpdateCategory } from '@/domain/usecases'

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
      await this.updateCategory.update(request)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateCategoryController {
  export type Request = {
    id: number
    name: string
  }
}
