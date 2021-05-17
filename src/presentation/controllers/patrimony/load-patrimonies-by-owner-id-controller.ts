import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimoniesByOwnerId } from '@/domain/usecases'

export class LoadPatrimoniesByOwnerIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadPatrimoniesByOwnerId: LoadPatrimoniesByOwnerId
  ) {}

  async handle (request: LoadPatrimoniesByOwnerIdController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const httpResponse = await this.loadPatrimoniesByOwnerId.loadByOwnerId({
        ownerId: request.id,
        skip: request.skip,
        take: request.take,
        accountId: request.accountId
      })
      return httpResponse.model.length ? ok(httpResponse) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadPatrimoniesByOwnerIdController {
  export type Request = {
    id: number
    accountId: number
    skip?: number
    take?: number
  }
}
