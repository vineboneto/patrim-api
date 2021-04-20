import { PatrimonyModel } from '@/domain/models'

export interface UpdatePatrimony {
  update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model>
}

export namespace UpdatePatrimony {
  export type Params = {
    id: number
    number: string
    brand: string
    description?: string
    categoryId: number
    ownerId: number
    placeId: number
  }
  export type Model = PatrimonyModel
}
