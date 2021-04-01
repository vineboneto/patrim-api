import { AddCategory } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helper/'
import { AlreadyExistsError } from '@/presentation/errors'

export class AddCategoryController implements Controller {
  constructor (
    private readonly addCategory: AddCategory,
    private readonly validation: Validation
  ) {}

  async handle (request: AddCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)
      if (!await this.addCategory.add(request)) return forbidden(new AlreadyExistsError(request.name))
      return noContent()
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
