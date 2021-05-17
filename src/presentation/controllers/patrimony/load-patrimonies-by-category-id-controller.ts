import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimoniesByCategoryId } from '@/domain/usecases'

export class LoadPatrimoniesByCategoryIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadPatrimoniesByCategoryId: LoadPatrimoniesByCategoryId
  ) {}

  async handle (request: LoadPatrimoniesByCategoryIdController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const httpResponse = await this.loadPatrimoniesByCategoryId.loadByCategoryId({
        categoryId: request.id,
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

export namespace LoadPatrimoniesByCategoryIdController {
  export type Request = {
    id: number
    accountId: number
    skip?: number
    take?: number
  }
}
