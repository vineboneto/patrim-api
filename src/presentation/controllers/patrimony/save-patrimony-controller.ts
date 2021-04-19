import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden } from '@/presentation/helper'
import { CheckCategoryById, CheckOwnerById, CheckPlaceById, SavePatrimony } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class SavePatrimonyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkCategoryById: CheckCategoryById,
    private readonly checkPlaceById: CheckPlaceById,
    private readonly checkOwnerById: CheckOwnerById,
    private readonly savePatrimony: SavePatrimony
  ) {}

  async handle (request: SavePatrimonyController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    let isValid: boolean
    isValid = await this.checkCategoryById.checkById({ id: request.categoryId })
    if (!isValid) {
      return forbidden(new InvalidParamError('categoryId'))
    }
    isValid = await this.checkPlaceById.checkById({ id: request.placeId })
    if (!isValid) {
      return forbidden(new InvalidParamError('placeId'))
    }
    isValid = await this.checkOwnerById.checkById({ id: request.ownerId })
    if (!isValid) {
      return forbidden(new InvalidParamError('ownerId'))
    }
    await this.savePatrimony.save(request)
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
