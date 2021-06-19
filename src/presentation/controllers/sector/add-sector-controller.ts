import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper/http-helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { AddSector } from '@/domain/usecases'

export class AddSectorController implements Controller {
  constructor (private readonly addSector: AddSector) {}

  async handle (request: AddSectorController.Request): Promise<HttpResponse> {
    try {
      const sectorModel = await this.addSector.add(request)
      if (!sectorModel) {
        return unprocessableEntity(new AlreadyExistsError(request.name))
      }
      return ok(sectorModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddSectorController {
  export type Request = {
    name: string
    accountId: number
  }
}
