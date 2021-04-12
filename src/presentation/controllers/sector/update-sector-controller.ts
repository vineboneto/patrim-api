import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helper'
import { CheckSectorById, SaveSector } from '@/domain/usecases'
import { AlreadyExistsError, InvalidParamError } from '@/presentation/errors'

export class UpdateSectorController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveSector: SaveSector,
    private readonly checkSectorById: CheckSectorById
  ) {}

  async handle (request: UpdateSectorController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const exists = await this.checkSectorById.checkById(request.id)
      if (!exists) {
        return forbidden(new InvalidParamError('id'))
      }
      const isValid = await this.saveSector.save(request)
      if (!isValid) {
        return forbidden(new AlreadyExistsError(request.name))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace UpdateSectorController {
  export type Request = {
    id: string
    name: string
  }
}
