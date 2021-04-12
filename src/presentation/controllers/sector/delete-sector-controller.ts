import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper'
import { DeleteSector } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class DeleteSectorController implements Controller {
  constructor (
    private readonly deleteSector: DeleteSector,
    private readonly validation: Validation
  ) {}

  async handle (request: DeleteSectorController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const sectorDeleted = await this.deleteSector.delete({ id: request.id })
      return sectorDeleted ? ok(sectorDeleted) : forbidden(new InvalidParamError('id'))
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteSectorController {
  export type Request = {
    id: string
  }
}
