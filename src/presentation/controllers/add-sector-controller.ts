import { AddSector } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helper/http-helper'

export class AddSectorController implements Controller {
  constructor (private readonly addSector: AddSector) {}

  async handle (request: AddSectorController.Request): Promise<HttpResponse> {
    if (!request.name) return badRequest(new MissingParamError('name'))
    await this.addSector.add(request)
    return null
  }
}

export namespace AddSectorController {
  export type Request = any
}
