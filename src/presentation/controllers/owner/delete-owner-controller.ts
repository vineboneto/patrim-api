import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeleteOwner } from '@/domain/usecases'

export class DeleteOwnerController implements Controller {
  constructor (
    private readonly deleteOwner: DeleteOwner,
    private readonly validation: Validation
  ) {}

  async handle (request: DeleteOwnerController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

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
