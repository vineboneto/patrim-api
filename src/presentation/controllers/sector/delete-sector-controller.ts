import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helper'
import { DeleteSector } from '@/domain/usecases'

export class DeleteSectorController implements Controller {
  constructor (
    private readonly deleteSector: DeleteSector,
    private readonly validationSpy: Validation
  ) {}

  async handle (request: DeleteSectorController.Request): Promise<HttpResponse> {
    const error = await this.validationSpy.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.deleteSector.delete({ id: Number(request.id) })
    return null
  }
}

export namespace DeleteSectorController {
  export type Request = {
    id: string
  }
}
