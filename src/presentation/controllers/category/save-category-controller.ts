import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helper'
import { SaveCategory } from '@/domain/usecases'

export class SaveCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveCategory: SaveCategory
  ) {}

  async handle (request: SaveCategoryController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.saveCategory.save(request)
    return null
  }
}
export namespace SaveCategoryController {
  export type Request = {
    id: number
    name: string
  }
}
