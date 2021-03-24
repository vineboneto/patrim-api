import { AddSector } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, noContent, serverError } from '@/presentation/helper/http-helper'

export class AddSectorController implements Controller {
  constructor (
    private readonly addSector: AddSector,
    private readonly validation: Validation
  ) {}

  async handle (request: AddSectorController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)

      if (!request.name) return badRequest(new MissingParamError('name'))
      await this.addSector.add(request)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddSectorController {
  export type Request = any
}
