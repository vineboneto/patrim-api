import { UpdatePatrimony } from '@/domain/usecases'
import { LoadPatrimonyOwnerIdByIdRepository } from '@/data/protocols'

export class LogUpdatePatrimonyDecorator implements UpdatePatrimony {
  constructor (
    private readonly loadPatrimonyOwnerIdByIdRepository: LoadPatrimonyOwnerIdByIdRepository
  ) {}

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    await this.loadPatrimonyOwnerIdByIdRepository.loadOwnerIdById(params.id)
    return null
  }
}
