import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError, forbidden } from '@/presentation/helper/http-helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { SaveSector } from '@/domain/usecases'

export class AddSectorController implements Controller {
  constructor (
    private readonly saveSector: SaveSector,
    private readonly validation: Validation
  ) {}

  async handle (request: AddSectorController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.saveSector.save(request)
      if (!isValid) return forbidden(new AlreadyExistsError(request.name))
      return noContent()
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
