import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimonies } from '@/domain/usecases'

export class LoadPatrimoniesController implements Controller {
  constructor (
    private readonly loadPatrimonies: LoadPatrimonies
  ) {}

  async handle (request: LoadPatrimoniesController.Request): Promise<HttpResponse> {
    try {
      const httpResponse = await this.loadPatrimonies.load(request)
      return httpResponse.length ? ok(httpResponse) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadPatrimoniesController {
  export type Request = {
    skip?: number
    take?: number
    accountId: number
  }
}
