import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadCategories } from '@/domain/usecases'

export class LoadCategoriesController implements Controller {
  constructor (
    private readonly loadCategories: LoadCategories
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const httpResponse = await this.loadCategories.load()
      return httpResponse.length ? ok(httpResponse) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
