import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimonyById } from '@/domain/usecases'

export class LoadPatrimonyByIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadPatrimonyById: LoadPatrimonyById
  ) {}

  async handle (request: LoadPatrimonyByIdController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
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
