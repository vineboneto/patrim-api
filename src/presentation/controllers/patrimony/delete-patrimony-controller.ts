import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helper'
import { DeletePatrimony } from '@/domain/usecases'

export class DeletePatrimonyController implements Controller {
  constructor (
    private readonly deletePatrimony: DeletePatrimony,
    private readonly validation: Validation
  ) {}

  async handle (request: DeletePatrimonyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
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
