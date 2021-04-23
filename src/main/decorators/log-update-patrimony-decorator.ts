import { UpdatePatrimony } from '@/domain/usecases'
import { LoadPatrimonyOwnerIdByIdRepository, LogSwapPatrimonyRepository } from '@/data/protocols'

export class LogUpdatePatrimonyDecorator implements UpdatePatrimony {
  constructor (
    private readonly loadPatrimonyOwnerIdByIdRepository: LoadPatrimonyOwnerIdByIdRepository,
    private readonly logSwapPatrimonyRepository: LogSwapPatrimonyRepository
  ) {}

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    const oldOwnerId = await this.loadPatrimonyOwnerIdByIdRepository.loadOwnerIdById(params.id)
    await this.logSwapPatrimonyRepository.logSwap({
      oldOwnerId,
      newOwnerId: params.ownerId,
      patrimonyId: params.id
    })
    return null
  }
}
