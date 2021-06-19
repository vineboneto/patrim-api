import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadCategoryById } from '@/domain/usecases'

export class LoadCategoryByIdController implements Controller {
  constructor (
    private readonly loadCategoryById: LoadCategoryById
  ) {}

  async handle (request: LoadCategoryByIdController.Request): Promise<HttpResponse> {
    try {
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
