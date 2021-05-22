import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { LoadCategoryById } from '@/domain/usecases'

export class LoadCategoryByIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadCategoryById: LoadCategoryById
  ) {}

  async handle (request: LoadCategoryByIdController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const categoryModel = await this.loadCategoryById.loadById(request)
      return categoryModel ? ok(categoryModel) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadCategoryByIdController {
  export type Request = {
    id: number
    accountId: number
  }
}
