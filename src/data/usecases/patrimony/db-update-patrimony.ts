import { UpdatePatrimony } from '@/domain/usecases'
import { UpdatePatrimonyRepository } from '@/data/protocols'

export class DbUpdatePatrimony implements UpdatePatrimony {
  constructor (
    private readonly updatePatrimonyRepository: UpdatePatrimonyRepository
  ) {}

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    return this.updatePatrimonyRepository.update(params)
  }
}
