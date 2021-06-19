import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadSectorById } from '@/domain/usecases'

export class LoadSectorByIdController implements Controller {
  constructor (private readonly loadSectorById: LoadSectorById) {}

  async handle (request: LoadSectorByIdController.Request): Promise<HttpResponse> {
    try {
      const sectorModel = await this.loadSectorById.loadById(request)
      return sectorModel ? ok(sectorModel) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSectorByIdController {
  export type Request = {
    id: number
    accountId: number
  }
}
