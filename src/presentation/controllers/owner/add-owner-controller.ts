import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helper'
import { AddOwner } from '@/domain/usecases'

export class AddOwnerController implements Controller {
  constructor (private readonly addOwner: AddOwner) {}

  async handle (request: AddOwnerController.Request): Promise<HttpResponse> {
    try {
      const owner = await this.addOwner.add(request)
      return ok(owner)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddOwnerController {
  export type Request = {
    name: string
    sectorId: number
    accountId: number
  }
}
