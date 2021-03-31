import { AddCategory } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddCategoryController implements Controller {
  constructor (
    private readonly addCategory: AddCategory,
    private readonly validation: Validation
  ) {}

  async handle (request: AddCategoryController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    await this.addCategory.add(request)
    return null
  }
}

export namespace AddCategoryController {
  export type Request = {
    name: string
  }
}
