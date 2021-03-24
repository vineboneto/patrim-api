import { AddSector } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helper/http-helper'

export class AddSectorController implements Controller {
  constructor (
    private readonly addSector: AddSector,
    private readonly validation: Validation
  ) {}

  async handle (request: AddSectorController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      console.log(error)
      if (error) {
        return badRequest(error)
      }
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
