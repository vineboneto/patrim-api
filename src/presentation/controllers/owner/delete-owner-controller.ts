import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteOwner } from '@/domain/usecases'

export class DeleteOwnerController implements Controller {
  constructor (
    private readonly deleteOwner: DeleteOwner
  ) {}

  async handle (request: DeleteOwnerController.Request): Promise<HttpResponse> {
    await this.deleteOwner.delete({ id: Number(request.id) })
    return null
  }
}

export namespace DeleteOwnerController {
  export type Request = {
    id: string
  }
}
