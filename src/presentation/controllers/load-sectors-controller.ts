import { LoadSectors } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helper'

export class LoadSectorsController implements Controller {
  constructor (
    private readonly loadSectors: LoadSectors
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const sectors = await this.loadSectors.load()
      return sectors.length ? ok(sectors) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
