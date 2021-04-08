import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError } from '@/presentation/helper'
import { LoadCategories } from '@/domain/usecases'

export class LoadCategoriesController implements Controller {
  constructor (
    private readonly loadCategories: LoadCategories
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      await this.loadCategories.load()
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
