import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helper'
import { DeletePatrimony } from '@/domain/usecases'

export class DeletePatrimonyController implements Controller {
  constructor (private readonly deletePatrimony: DeletePatrimony) {}

  async handle (request: DeletePatrimonyController.Request): Promise<HttpResponse> {
    try {
      const patrimonyDeleted = await this.deletePatrimony.delete(request)
      return ok(patrimonyDeleted)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeletePatrimonyController {
  export type Request = {
    id: number
  }
}
