import { PatrimonyModel } from '@/domain/models'

export interface DeletePatrimony {
  delete (params: DeletePatrimony.Params): Promise<DeletePatrimony.Model>
}

export namespace DeletePatrimony {
  export type Params = {
    id: number
  }
  export type Model = PatrimonyModel
}
