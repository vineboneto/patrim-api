import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteOwner, LoadPatrimonyByOwnerId } from '@/domain/usecases'
import { forbidden, ok } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'

export class DeleteOwnerController implements Controller {
  constructor (
    private readonly deleteOwner: DeleteOwner,
    private readonly loadPatrimonyByOwnerId: LoadPatrimonyByOwnerId
  ) {}

  async handle (request: DeleteOwnerController.Request): Promise<HttpResponse> {
    const { id } = request
    const existingPatrimony = await this.loadPatrimonyByOwnerId.loadByOwnerId({ ownerId: Number(id) })
    if (existingPatrimony) {
      return forbidden(new LinkedDataError('patrimonies'))
    }
    const deletedOwner = await this.deleteOwner.delete({ id: Number(id) })
    return ok(deletedOwner)
  }
}

export namespace DeleteOwnerController {
  export type Request = {
    id: string
  }
}
