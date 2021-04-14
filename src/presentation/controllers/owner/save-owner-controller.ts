import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper'
import { SaveOwner } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class SaveOwnerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveOwner: SaveOwner
  ) {}

  async handle (request: SaveOwnerController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const owner = await this.saveOwner.save(request)
      if (!owner) {
        return forbidden(new InvalidParamError('sectorId'))
      }
      return ok(owner)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveOwnerController {
  export type Request = {
    id?: string
    name: string
    sectorId: string
  }
}
