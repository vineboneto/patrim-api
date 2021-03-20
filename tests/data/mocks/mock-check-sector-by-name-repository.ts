import { CheckSectorByNameRepository } from '@/data/protocols/check-sector-by-name-repository'

export class CheckSectorByNameRepositorySpy implements CheckSectorByNameRepository {
  name: string
  result = false

  async checkByName (name: string): Promise<boolean> {
    this.name = name
    return await this.result
  }
}
