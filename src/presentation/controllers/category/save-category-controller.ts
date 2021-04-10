import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden } from '@/presentation/helper'
import { SaveCategory } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

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
    const isValid = await this.saveCategory.save(request)
    if (!isValid) {
      return forbidden(new AlreadyExistsError(request.name))
    }
    return null
  }
}
export namespace SaveCategoryController {
  export type Request = {
    id: number
    name: string
  }
}
