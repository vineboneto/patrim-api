import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden } from '@/presentation/helper'
import { CheckCategoryById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class SavePatrimonyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkCategoryById: CheckCategoryById
  ) {}

  async handle (request: SavePatrimonyController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const isValid = await this.checkCategoryById.checkById({ id: request.categoryId })
    if (!isValid) {
      return forbidden(new InvalidParamError('categoryId'))
    }
    return null
  }
}

export namespace SavePatrimonyController {
  export type Request = {
    id?: number
    number: string
    brand: string
    description?: string
    categoryId: number
    placeId: number
    ownerId: number
  }
}
