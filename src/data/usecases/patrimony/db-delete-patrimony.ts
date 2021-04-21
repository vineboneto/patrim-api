import { DeletePatrimonyRepository } from '@/data/protocols'
import { DeletePatrimony } from '@/domain/usecases'

export class DbDeletePatrimony implements DeletePatrimony {
  constructor (
    private readonly deletePatrimonyRepository: DeletePatrimonyRepository
  ) {}

  async delete (params: DeletePatrimony.Params): Promise<DeletePatrimony.Model> {
    await this.deletePatrimonyRepository.delete(params)
    return null
  }
}
