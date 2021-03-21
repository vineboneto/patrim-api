import { AddSector } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AddSectorController implements Controller {
  constructor (private readonly addSector: AddSector) {}

  async handle (request: AddSectorController.Request): Promise<HttpResponse> {
    if (!request.name) {
      return {
        statusCode: 400,
        body: 'Missing param: name'
      }
    }
    await this.addSector.add(request)
    return null
  }
}

export namespace AddSectorController {
  export type Request = any
}
