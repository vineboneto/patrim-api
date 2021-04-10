import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helper'
import { CheckCategoryById, SaveCategory } from '@/domain/usecases'
import { AlreadyExistsError, InvalidParamError } from '@/presentation/errors'

export class SaveCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveCategory: SaveCategory,
    private readonly checkCategoryById: CheckCategoryById
  ) {}

  async handle (request: SaveCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const exists = await this.checkCategoryById.checkById(request.id)
      if (!exists) {
        return forbidden(new InvalidParamError('id'))
      }
      const isValid = await this.saveCategory.save(request)
      if (!isValid) {
        return forbidden(new AlreadyExistsError(request.name))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace SaveCategoryController {
  export type Request = {
    id: number
    name: string
  }
}
