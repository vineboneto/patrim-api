import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok } from '@/presentation/helper'
import { DeleteSector } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

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
    const sectorDeleted = await this.deleteSector.delete({ id: Number(request.id) })
    return sectorDeleted ? ok(sectorDeleted) : forbidden(new InvalidParamError('id'))
  }
}

export namespace DeleteSectorController {
  export type Request = {
    id: string
  }
}
