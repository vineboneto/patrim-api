import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok } from '@/presentation/helper'
import { SaveOwner } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class SaveOwnerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveOwner: SaveOwner
  ) {}

  async handle (request: SaveOwnerController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const owner = await this.saveOwner.save(request)
    if (!owner) {
      return badRequest(new InvalidParamError('sectorId'))
    }
    return ok(owner)
  }
}

export namespace SaveOwnerController {
  export type Request = {
    id?: string
    name: string
    sectorId: string
  }
}
