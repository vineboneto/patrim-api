import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadOwnerById } from '@/domain/usecases'

export class LoadOwnerByIdController implements Controller {
  constructor (private readonly loadOwnerById: LoadOwnerById) {}

  async handle (request: LoadOwnerByIdController.Request): Promise<HttpResponse> {
    try {
      const ownerModel = await this.loadOwnerById.loadById(request)
      return ownerModel ? ok(ownerModel) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadOwnerByIdController {
  export type Request = {
    id: number
    accountId: number
  }
}
