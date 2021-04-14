import { LoadOwners } from '@/domain/usecases'
import { badRequest } from '@/presentation/helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoadOwnersController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadOwner: LoadOwners
  ) {}

  async handle (request: LoadOwnersController.Request): Promise<HttpResponse> {
    const { take, skip } = request
    const error = this.validation.validate({ take, skip })
    if (error) {
      return badRequest(error)
    }
    await this.loadOwner.load({ skip: Number(skip), take: Number(take) })
    return null
  }
}

export namespace LoadOwnersController {
  export type Request = {
    take: string
    skip: string
  }
}
