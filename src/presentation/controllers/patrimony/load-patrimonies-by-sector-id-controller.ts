import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimoniesBySectorId } from '@/domain/usecases'

export class LoadPatrimoniesBySectorIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadPatrimoniesBySectorId: LoadPatrimoniesBySectorId
  ) {}

  async handle (request: LoadPatrimoniesBySectorIdController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const httpResponse = await this.loadPatrimoniesBySectorId.loadBySectorId({
        sectorId: request.id,
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

export namespace LoadPatrimoniesBySectorIdController {
  export type Request = {
    id: number
    accountId: number
    skip?: number
    take?: number
  }
}
