import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteOwner } from '@/domain/usecases'
import { ok } from '@/presentation/helper'

export class DeleteOwnerController implements Controller {
  constructor (
    private readonly deleteOwner: DeleteOwner
  ) {}

  async handle (request: DeleteOwnerController.Request): Promise<HttpResponse> {
    const deletedOwner = await this.deleteOwner.delete({ id: Number(request.id) })
    return ok(deletedOwner)
  }
}

export namespace DeleteOwnerController {
  export type Request = {
    id: string
  }
}
