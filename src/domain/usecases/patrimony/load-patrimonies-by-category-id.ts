import { PatrimonyModel } from '@/domain/models'

export interface LoadPatrimoniesByCategoryId {
  loadByCategoryId (params: LoadPatrimoniesByCategoryId.Params): Promise<LoadPatrimoniesByCategoryId.Model>
}

export namespace LoadPatrimoniesByCategoryId {
  export type Params = {
    categoryId: number
    accountId: number
    skip?: number
    take?: number
  }
  export type Model = {
    model: PatrimonyModel[]
    count: number
  }
}
