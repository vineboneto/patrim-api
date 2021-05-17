import { LoadOwners } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadOwnersController implements Controller {
  constructor (
    private readonly loadOwner: LoadOwners
  ) {}

  async handle (request: LoadOwnersController.Request): Promise<HttpResponse> {
    try {
      const owners = await this.loadOwner.load(request)
      return owners.model.length ? ok(owners) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadOwnersController {
  export type Request = {
    accountId: number
    take?: number
    skip?: number
  }
}
