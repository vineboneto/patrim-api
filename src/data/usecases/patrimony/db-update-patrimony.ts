import { UpdatePatrimony } from '@/domain/usecases'
import { LoadPatrimonyNumberByIdRepository, UpdatePatrimonyRepository } from '@/data/protocols'

export class DbUpdatePatrimony implements UpdatePatrimony {
  constructor (
    private readonly updatePatrimonyRepository: UpdatePatrimonyRepository,
    private readonly loadPatrimonyNumberByIdRepository: LoadPatrimonyNumberByIdRepository
  ) {}

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    await this.loadPatrimonyNumberByIdRepository.loadNumberById(params.id)
    return this.updatePatrimonyRepository.update(params)
  }
}
