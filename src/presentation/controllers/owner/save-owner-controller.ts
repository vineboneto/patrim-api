import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helper'
import { SaveOwner } from '@/domain/usecases'

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
    await this.saveOwner.save(request)
    return null
  }
}

export namespace SaveOwnerController {
  export type Request = {
    id?: string
    name: string
    sectorId: string
  }
}
