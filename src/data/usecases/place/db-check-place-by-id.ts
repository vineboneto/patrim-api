import { CheckPlaceById } from '@/domain/usecases'
import { CheckPlaceByIdRepository } from '@/data/protocols'

export class DbCheckPlaceById implements CheckPlaceById {
  constructor (
    private readonly checkPlaceByIdRepository: CheckPlaceByIdRepository
  ) {}

  async checkById (id: number): Promise<CheckPlaceById.Result> {
    return this.checkPlaceByIdRepository.checkById(id)
  }
}
