import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteSector } from '@/domain/usecases'

export class DeleteSectorController implements Controller {
  constructor (
    private readonly deleteSector: DeleteSector
  ) {}

  async handle (request: DeleteSectorController.Request): Promise<HttpResponse> {
    await this.deleteSector.delete({ id: Number(request.id) })
    return null
  }
}

export namespace DeleteSectorController {
  export type Request = {
    id: string
  }
}
