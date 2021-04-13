import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class SaveOwnerController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: SaveOwnerController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
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
