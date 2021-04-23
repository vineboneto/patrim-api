import { LoadPatrimonyByNumber } from '@/domain/usecases'
import { LoadPatrimonyByNumberRepository } from '@/data/protocols'

export class DbLoadPatrimonyByNumber implements LoadPatrimonyByNumber {
  constructor (
    private readonly loadPatrimonyByNumberRepository: LoadPatrimonyByNumberRepository
  ) {}

  async loadByNumber (number: string): Promise<LoadPatrimonyByNumber.Model> {
    return this.loadPatrimonyByNumberRepository.loadByNumber(number)
  }
}
