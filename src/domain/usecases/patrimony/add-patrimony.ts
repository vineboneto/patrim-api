import { PatrimonyModel } from '@/domain/models'

export interface AddPatrimony {
  add (params: AddPatrimony.Params): Promise<AddPatrimony.Model>
}

export namespace AddPatrimony {
  export type Params = {
    number: string
    brand: string
    description?: string
    categoryId: number
    ownerId: number
    accountId: number
  }

  export type Model = PatrimonyModel
}
