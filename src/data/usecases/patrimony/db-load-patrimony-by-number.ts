import { LoadPatrimonyByNumber } from '@/domain/usecases'
import { LoadPatrimonyByNumberRepository } from '@/data/protocols'

export class DbLoadPatrimonyByNumber implements LoadPatrimonyByNumber {
  constructor (
    private readonly loadPatrimonyByNumberRepository: LoadPatrimonyByNumberRepository
  ) {}

  async loadByNumber (params: LoadPatrimonyByNumber.Params): Promise<LoadPatrimonyByNumber.Model> {
    return this.loadPatrimonyByNumberRepository.loadByNumber(params)
  }
}
