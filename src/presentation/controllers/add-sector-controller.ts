import { AddSector } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError, forbidden } from '@/presentation/helper/http-helper'
import { AlreadyExistsError } from '@/presentation/errors'

export class AddSectorController implements Controller {
  constructor (
    private readonly addSector: AddSector,
    private readonly validation: Validation
  ) {}

  async handle (request: AddSectorController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const isValid = await this.addSector.add(request)
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
