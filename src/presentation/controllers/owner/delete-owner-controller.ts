import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeleteOwner } from '@/domain/usecases'

export class DeleteOwnerController implements Controller {
  constructor (
    private readonly deleteOwner: DeleteOwner,
    private readonly checkExist: CheckExist,
    private readonly validation: Validation
  ) {}

  async handle (request: DeleteOwnerController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const existError = await this.checkExist.check(request)
      if (existError) {
        return forbidden(existError)
      }
      const categoryDeleted = await this.deleteOwner.delete(request)
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
    id: number
    accountId: number
  }
}
