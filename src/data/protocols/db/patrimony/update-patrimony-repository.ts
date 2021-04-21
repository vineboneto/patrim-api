import { UpdatePatrimony } from '@/domain/usecases'

export interface UpdatePatrimonyRepository {
  update (params: UpdatePatrimonyRepository.Params): Promise<UpdatePatrimonyRepository.Model>
}

export namespace UpdatePatrimonyRepository {
  export type Params = UpdatePatrimony.Params
  export type Model = UpdatePatrimony.Model
}
