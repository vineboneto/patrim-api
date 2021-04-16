import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteOwner } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helper'

export class DeleteOwnerController implements Controller {
  constructor (
    private readonly deleteOwner: DeleteOwner
  ) {}

  async handle (request: DeleteOwnerController.Request): Promise<HttpResponse> {
    try {
      const { id } = request
      const deletedOwner = await this.deleteOwner.delete({ id: Number(id) })
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
