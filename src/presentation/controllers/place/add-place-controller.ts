import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { SavePlace, CheckAccountById } from '@/domain/usecases'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helper'
import { AlreadyExistsError, InvalidParamError } from '@/presentation/errors'

export class AddPlaceController implements Controller {
  constructor (
    private readonly savePlace: SavePlace,
    private readonly checkAccountById: CheckAccountById,
    private readonly validation: Validation
  ) {}

  async handle (request: AddPlaceController.Request): Promise<HttpResponse> {
    try {
      const { name, userId } = request
      const badRequestError = this.isBadRequest({ name, userId })
      if (badRequestError) {
        return badRequest(badRequestError)
      }
      const forbiddenError = await this.isForbidden({ name, userId })
      if (forbiddenError) {
        return forbidden(forbiddenError)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  private async isForbidden ({ name, userId }: AddPlaceController.Request): Promise<Error> {
    let isValid = true
    if (userId) isValid = await this.checkAccountById.checkById(userId)
    if (!isValid) return new InvalidParamError('userId')
    isValid = await this.savePlace.save({ name, userId })
    if (!isValid) return new AlreadyExistsError(name)
    return null
  }

  private isBadRequest ({ name, userId }: AddPlaceController.Request): Error {
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
