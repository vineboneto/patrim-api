import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper/http-helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { AddSector } from '@/domain/usecases'

export class AddSectorController implements Controller {
  constructor (
    private readonly saveSector: AddSector,
    private readonly validation: Validation
  ) {}

  async handle (request: AddSectorController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const sectorModel = await this.saveSector.add(request)
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
  }
}
