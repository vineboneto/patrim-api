import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { AddPatrimony } from '@/domain/usecases'

export class AddPatrimonyController implements Controller {
  constructor (private readonly addPatrimony: AddPatrimony) {}

  async handle (request: AddPatrimonyController.Request): Promise<HttpResponse> {
    try {
      const patrimonyModel = await this.addPatrimony.add(request)
      if (!patrimonyModel) {
        return unprocessableEntity(new AlreadyExistsError(request.number))
      }
      return ok(patrimonyModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddPatrimonyController {
  export type Request = {
    number: string
    brand: string
    description?: string
    categoryId: number
    accountId: number
    ownerId: number
  }
}
