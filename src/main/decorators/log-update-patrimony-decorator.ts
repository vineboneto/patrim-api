import { UpdatePatrimony } from '@/domain/usecases'
import { LoadPatrimonyOwnerIdByIdRepository, LogSwapPatrimonyRepository } from '@/data/protocols'

export class LogUpdatePatrimonyDecorator implements UpdatePatrimony {
  constructor (
    private readonly loadPatrimonyOwnerIdByIdRepository: LoadPatrimonyOwnerIdByIdRepository,
    private readonly logSwapPatrimonyRepository: LogSwapPatrimonyRepository,
    private readonly updatePatrimony: UpdatePatrimony
  ) {}

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    const ownerId = await this.loadPatrimonyOwnerIdByIdRepository.loadOwnerIdById(params.id)
    if (ownerId !== params.ownerId) {
      await this.logSwapPatrimonyRepository.logSwap({
        oldOwnerId: ownerId,
        newOwnerId: params.ownerId,
        patrimonyId: params.id
      })
    }
    return this.updatePatrimony.update(params)
  }
}
