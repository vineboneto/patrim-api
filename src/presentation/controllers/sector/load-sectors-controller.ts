import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadSectors } from '@/domain/usecases'

export class LoadSectorsController implements Controller {
  constructor (
    private readonly loadSectors: LoadSectors
  ) {}

  async handle (request: LoadSectorsController.Request): Promise<HttpResponse> {
    try {
      const sectors = await this.loadSectors.load(request)
      return sectors.model.length ? ok(sectors) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSectorsController {
  export type Request = {
    accountId: number
    take?: number
    skip?: number
  }
}
