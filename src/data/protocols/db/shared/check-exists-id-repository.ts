export interface CheckExistsIdRepository {
  checkId (params: CheckExistsIdRepository.Params): Promise<CheckExistsIdRepository.Model>
}

export namespace CheckExistsIdRepository {
  export type Params = {
    id: number
    fieldDatabase: string
  }
  export type Model = boolean
}

export enum DatabaseFields {
  patrimony = 'patrimony',
  user = 'user',
  category = 'category',
  owner = 'owner',
  swapPatrimony = 'swapPatrimony',
  logError = 'logError',
  sector = 'sector'
}
