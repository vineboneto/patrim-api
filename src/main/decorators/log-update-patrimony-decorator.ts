import { UpdatePatrimony } from '@/domain/usecases'
import { LoadPatrimonyFieldByIdRepository, LogSwapPatrimonyRepository } from '@/data/protocols'

export class LogUpdatePatrimonyDecorator implements UpdatePatrimony {
  constructor (
    private readonly loadPatrimonyOwnerIdByIdRepository: LoadPatrimonyFieldByIdRepository,
    private readonly logSwapPatrimonyRepository: LogSwapPatrimonyRepository,
    private readonly updatePatrimony: UpdatePatrimony
  ) {}

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    const ownerId = await this.loadPatrimonyOwnerIdByIdRepository.loadFieldById(params.id)
    if (ownerId !== params.ownerId) {
      await this.logSwapPatrimonyRepository.logSwap({
        oldOwnerId: ownerId,
        newOwnerId: params.ownerId,
        patrimonyId: params.id,
        accountId: params.accountId
      })
    }
    return this.updatePatrimony.update(params)
  }
}
