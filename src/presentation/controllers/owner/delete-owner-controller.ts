import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteOwner } from '@/domain/usecases'
import { forbidden, ok, serverError } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'

export class DeleteOwnerController implements Controller {
  constructor (
    private readonly deleteOwner: DeleteOwner
  ) {}

  async handle (request: DeleteOwnerController.Request): Promise<HttpResponse> {
    try {
      const { id } = request
      const deletedOwner = await this.deleteOwner.delete({ id: Number(id) })
      if (!deletedOwner) {
        return forbidden(new LinkedDataError('patrimonies'))
      }
      return ok(deletedOwner)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteOwnerController {
  export type Request = {
    id: string
  }
}
