export interface CheckExistsUserIdRepository {
  checkUserId (params: CheckExistsUserIdRepository.Params): Promise<CheckExistsUserIdRepository.Model>
}

export namespace CheckExistsUserIdRepository {
  export type Params = {
    accountId: number
    database: string
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
