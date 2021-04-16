import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError, unprocessableEntity } from '@/presentation/helper/http-helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { SaveSector } from '@/domain/usecases'

export class SaveSectorController implements Controller {
  constructor (
    private readonly saveSector: SaveSector,
    private readonly validation: Validation
  ) {}

  async handle (request: SaveSectorController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.saveSector.save(request)
      if (!isValid) {
        return unprocessableEntity(new AlreadyExistsError(request.name))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveSectorController {
  export type Request = {
    id?: number
    name: string
  }
}
