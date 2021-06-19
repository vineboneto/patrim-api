import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { UpdateSector } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

export class UpdateSectorController implements Controller {
  constructor (private readonly updateSector: UpdateSector) {}

  async handle (request: UpdateSectorController.Request): Promise<HttpResponse> {
    try {
      const sectorModel = await this.updateSector.update(request)
      if (!sectorModel) {
        return unprocessableEntity(new AlreadyExistsError(request.name))
      }
      return ok(sectorModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateSectorController {
  export type Request = {
    id: number
    name: string
    accountId: number
  }
}
