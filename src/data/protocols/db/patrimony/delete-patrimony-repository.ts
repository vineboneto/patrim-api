import { DeletePatrimony } from '@/domain/usecases'

export interface DeletePatrimonyRepository {
  delete (params: DeletePatrimonyRepository.Params): Promise<DeletePatrimonyRepository.Model>
}

export namespace DeletePatrimonyRepository {
  export type Params = DeletePatrimony.Params
  export type Model = DeletePatrimony.Model
}
