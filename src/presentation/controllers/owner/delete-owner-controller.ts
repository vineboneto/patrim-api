import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeleteOwner } from '@/domain/usecases'

export class DeleteOwnerController implements Controller {
  constructor (private readonly deleteOwner: DeleteOwner) {}

  async handle (request: DeleteOwnerController.Request): Promise<HttpResponse> {
    try {
      const categoryDeleted = await this.deleteOwner.delete({
        id: Number(request.id),
        accountId: request.accountId
      })
      if (!categoryDeleted) {
        return unprocessableEntity(new LinkedDataError('patrimonies'))
      }
      return ok(categoryDeleted)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteOwnerController {
  export type Request = {
    id: string
    accountId: number
  }
}
