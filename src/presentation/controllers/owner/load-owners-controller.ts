import { LoadOwners } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadOwnersController implements Controller {
  constructor (
    private readonly loadOwner: LoadOwners
  ) {}

  async handle (request: LoadOwnersController.Request): Promise<HttpResponse> {
    try {
      const { take, skip } = request
      const owners = await this.loadOwner.load({ skip: Number(skip), take: Number(take) })
      return owners.length ? ok(owners) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadOwnersController {
  export type Request = {
    take: string
    skip: string
  }
}
