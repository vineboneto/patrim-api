import { AddCategory } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AddCategoryController implements Controller {
  constructor (private readonly addCategory: AddCategory) {}

  async handle (request: AddCategoryController.Request): Promise<HttpResponse> {
    await this.addCategory.add(request)
    return null
  }
}

export namespace AddCategoryController {
  export type Request = {
    name: string
  }
}
