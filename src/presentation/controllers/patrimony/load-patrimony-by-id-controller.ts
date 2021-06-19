import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimonyById } from '@/domain/usecases'

export class LoadPatrimonyByIdController implements Controller {
  constructor (private readonly loadPatrimonyById: LoadPatrimonyById) {}

  async handle (request: LoadPatrimonyByIdController.Request): Promise<HttpResponse> {
    try {
      const patrimonyModel = await this.loadPatrimonyById.loadById(request)
      return patrimonyModel ? ok(patrimonyModel) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadPatrimonyByIdController {
  export type Request = {
    id: number
    accountId: number
  }
}
