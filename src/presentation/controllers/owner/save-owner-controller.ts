import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helper'

export class SaveOwnerController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: SaveOwnerController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
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
