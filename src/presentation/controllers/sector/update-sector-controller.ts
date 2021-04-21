import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { UpdateSector } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

export class UpdateSectorController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist,
    private readonly updateSector: UpdateSector
  ) {}

  async handle (request: UpdateSectorController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const checkError = await this.checkExist.check(request)
      if (checkError) {
        return forbidden(checkError)
      }
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
  }
}
