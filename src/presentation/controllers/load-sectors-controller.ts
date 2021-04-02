import { LoadSectors } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadSectorsController implements Controller {
  constructor (
    private readonly loadSectors: LoadSectors
  ) {}

  async handle (): Promise<HttpResponse> {
    await this.loadSectors.load()
    return null
  }
}
