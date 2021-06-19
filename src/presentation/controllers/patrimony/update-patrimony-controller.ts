import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { UpdatePatrimony } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

export class UpdatePatrimonyController implements Controller {
  constructor (private readonly updatePatrimony: UpdatePatrimony) {}

  async handle (request: UpdatePatrimonyController.Request): Promise<HttpResponse> {
    try {
      const patrimonyModel = await this.updatePatrimony.update({
        id: Number(request.id),
        number: request?.number,
        brand: request.brand,
        description: request?.description,
        categoryId: Number(request.categoryId),
        ownerId: Number(request.ownerId),
        accountId: request.accountId
      })
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
  export type Request = {
    id: string
    number?: string
    brand: string
    description?: string
    categoryId: string
    ownerId: string
    accountId: number
  }
}
