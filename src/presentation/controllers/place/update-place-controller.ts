import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { SavePlace, CheckAccountById, CheckPlaceById } from '@/domain/usecases'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helper'
import { AlreadyExistsError, InvalidParamError } from '@/presentation/errors'

export class UpdatePlaceController implements Controller {
  constructor (
    private readonly savePlace: SavePlace,
    private readonly checkAccountById: CheckAccountById,
    private readonly checkPlaceById: CheckPlaceById,
    private readonly validation: Validation
  ) {}

  async handle (request: UpdatePlaceController.Request): Promise<HttpResponse> {
    try {
      const { id, name, userId } = request
      const badRequestError = this.isBadRequest({ id, name, userId })
      if (badRequestError) {
        return badRequest(badRequestError)
      }
      const forbiddenError = await this.isForbidden({ id, name, userId })
      if (forbiddenError) {
        return forbidden(forbiddenError)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  private async isForbidden ({ id, name, userId }: UpdatePlaceController.Request): Promise<Error> {
    let isValid: boolean
    isValid = await this.checkPlaceById.checkById(id)
    if (!isValid) return new InvalidParamError('id')
    isValid = await this.checkAccountById.checkById(userId)
    if (!isValid) return new InvalidParamError('userId')
    isValid = await this.savePlace.save({ id, name, userId })
    if (!isValid) return new AlreadyExistsError(name)
    return null
  }

  private isBadRequest ({ id, name, userId }: UpdatePlaceController.Request): Error {
    if (!userId) {
      return this.validation.validate({ id, name })
    }
    return this.validation.validate({ id, name, userId })
  }
}

export namespace UpdatePlaceController {
  export type Request = {
    id: string
    name: string
    userId?: string
  }
}