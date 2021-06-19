import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helper'
import { UpdateOwner } from '@/domain/usecases'

export class UpdateOwnerController implements Controller {
  constructor (private readonly updateOwner: UpdateOwner) {}

  async handle (request: UpdateOwnerController.Request): Promise<HttpResponse> {
    try {
      const owner = await this.updateOwner.update(request)
      return ok(owner)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateOwnerController {
  export type Request = {
    id: number
    name: string
    sectorId: number
    accountId: number
  }
}
