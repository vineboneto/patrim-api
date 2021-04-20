import { PatrimonyModel } from '@/domain/models'

export interface UpdatePatrimony {
  update ()
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
