import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadCategories } from '@/domain/usecases'

export class LoadCategoriesController implements Controller {
  constructor (private readonly loadCategories: LoadCategories) {}

  async handle (request: LoadCategoriesController.Request): Promise<HttpResponse> {
    try {
      const httpResponse = await this.loadCategories.load(request)
      return httpResponse.model.length ? ok(httpResponse) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadCategoriesController {
  export type Request = {
    accountId: number
    skip?: number
    take?: number
  }
}
