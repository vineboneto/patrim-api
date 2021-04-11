import { CheckPlaceByNameRepository } from '@/data/protocols'

export class CheckPlaceByNameRepositorySpy implements CheckPlaceByNameRepository {
  name: string
  result = false

  async checkByName (name: string): Promise<CheckPlaceByNameRepository.Result> {
    this.name = name
    return this.result
  }
}
