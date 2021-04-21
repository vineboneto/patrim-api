import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper'
import { DeletePatrimony } from '@/domain/usecases'

export class DeletePatrimonyController implements Controller {
  constructor (
    private readonly deletePatrimony: DeletePatrimony,
    private readonly checkExist: CheckExist,
    private readonly validation: Validation
  ) {}

  async handle (request: DeletePatrimonyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const existError = await this.checkExist.check(request)
      if (existError) {
        return forbidden(existError)
      }
      const patrimonyDeleted = await this.deletePatrimony.delete(request)
      return ok(patrimonyDeleted)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace DeletePatrimonyController {
  export type Request = {
    id: number
  }
}
