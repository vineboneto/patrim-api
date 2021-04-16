import { Controller, HttpResponse } from '@/presentation/protocols'
import { forbidden, ok, serverError } from '@/presentation/helper'
import { DeleteSector } from '@/domain/usecases'
import { LinkedDataError } from '@/presentation/errors'

export class DeleteSectorController implements Controller {
  constructor (
    private readonly deleteSector: DeleteSector
  ) {}

  async handle (request: DeleteSectorController.Request): Promise<HttpResponse> {
    try {
      const sectorDeleted = await this.deleteSector.delete(request)
      if (!sectorDeleted) {
        return forbidden(new LinkedDataError('owners'))
      }
      return ok(sectorDeleted)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteSectorController {
  export type Request = {
    id: number
  }
}
