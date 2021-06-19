import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { UpdatePatrimony } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

export class UpdatePatrimonyController implements Controller {
  constructor (private readonly updatePatrimony: UpdatePatrimony) {}

  async handle (request: UpdatePatrimonyController.Request): Promise<HttpResponse> {
    try {
      const patrimonyModel = await this.updatePatrimony.update(request)
      if (!patrimonyModel) {
        return unprocessableEntity(new AlreadyExistsError(request.number))
      }
      return ok(patrimonyModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdatePatrimonyController {
  export type Request = UpdatePatrimony.Params
}
