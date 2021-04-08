import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError } from '@/presentation/helper'
import { LoadCategories } from '@/domain/usecases'

export class LoadCategoriesController implements Controller {
  constructor (
    private readonly loadCategories: LoadCategories
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const httpResponse = await this.loadCategories.load()
      return httpResponse.length ? null : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
