import { LoadOwners } from '@/domain/usecases'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoadOwnersController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadOwner: LoadOwners
  ) {}

  async handle (request: LoadOwnersController.Request): Promise<HttpResponse> {
    try {
      const { take, skip } = request
      const error = this.validation.validate({ take, skip })
      if (error) {
        return badRequest(error)
      }
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
