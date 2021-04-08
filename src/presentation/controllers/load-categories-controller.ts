import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadCategories } from '@/domain/usecases'

export class LoadCategoriesController implements Controller {
  constructor (
    private readonly loadCategories: LoadCategories
  ) {}

  async handle (): Promise<HttpResponse> {
    await this.loadCategories.load()
    return null
  }
}
