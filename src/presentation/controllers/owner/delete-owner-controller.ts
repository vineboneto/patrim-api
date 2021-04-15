import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteOwner, LoadPatrimonyByOwnerId } from '@/domain/usecases'
import { ok } from '@/presentation/helper'

export class DeleteOwnerController implements Controller {
  constructor (
    private readonly deleteOwner: DeleteOwner,
    private readonly loadPatrimonyByOwnerId: LoadPatrimonyByOwnerId
  ) {}

  async handle (request: DeleteOwnerController.Request): Promise<HttpResponse> {
    const { id } = request
    await this.loadPatrimonyByOwnerId.loadByOwnerId({ ownerId: Number(id) })
    const deletedOwner = await this.deleteOwner.delete({ id: Number(id) })
    return ok(deletedOwner)
  }
}

export namespace DeleteOwnerController {
  export type Request = {
    id: string
  }
}
