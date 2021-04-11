import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { SavePlace, CheckAccountById } from '@/domain/usecases'
import { badRequest, forbidden } from '@/presentation/helper'
import { InvalidParamError } from '@/presentation/errors'

export class AddPlaceController implements Controller {
  constructor (
    private readonly savePlace: SavePlace,
    private readonly checkAccountById: CheckAccountById,
    private readonly validation: Validation
  ) {}

  async handle (request: AddPlaceController.Request): Promise<HttpResponse> {
    const { name, userId } = request
    const error = this.validate({ name, userId })
    if (error) {
      return badRequest(error)
    }
    const exists = await this.checkAccountById.checkById(userId)
    if (!exists) {
      return forbidden(new InvalidParamError('userId'))
    }
    return null
  }

  private validate ({ name, userId }: AddPlaceController.Request): Error {
    if (!userId) {
      return this.validation.validate({ name })
    }
    return this.validation.validate({ name, userId })
  }
}

export namespace AddPlaceController {
  export type Request = {
    name: string
    userId?: string
  }
}
