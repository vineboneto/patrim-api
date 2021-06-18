import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeleteSector } from '@/domain/usecases'

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
      const sectorDeleted = await this.deleteSector.delete({
        id: Number(request.id),
        accountId: request.accountId
      })
      if (!sectorDeleted) {
        return unprocessableEntity(new LinkedDataError('owners'))
      }
      return ok(sectorDeleted)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteSectorController {
  export type Request = {
    id: string
    accountId: number
  }
}
