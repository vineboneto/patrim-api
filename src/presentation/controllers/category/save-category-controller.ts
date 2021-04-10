import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden } from '@/presentation/helper'
import { CheckCategoryById, SaveCategory } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

export class SaveCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveCategory: SaveCategory,
    private readonly checkCategoryById: CheckCategoryById
  ) {}

  async handle (request: SaveCategoryController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.checkCategoryById.checkById(request.id)
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
