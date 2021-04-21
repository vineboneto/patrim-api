import { LoadPatrimoniesByOwnerId } from '@/domain/usecases'

export interface LoadPatrimoniesByOwnerIdRepository {
  loadByOwnerId (params: LoadPatrimoniesByOwnerIdRepository.Params): Promise<LoadPatrimoniesByOwnerIdRepository.Model>
}

export namespace LoadPatrimoniesByOwnerIdRepository {
  export type Params = LoadPatrimoniesByOwnerId.Params
  export type Model = LoadPatrimoniesByOwnerId.Model
}
