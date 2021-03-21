import { AddSector } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AddSectorController implements Controller {
  constructor (private readonly addSector: AddSector) {}

  async handle (request: AddSectorController.Request): Promise<HttpResponse> {
    await this.addSector.add(request)
    return null
  }
}

export namespace AddSectorController {
  export type Request = {
    name: string
  }
}
