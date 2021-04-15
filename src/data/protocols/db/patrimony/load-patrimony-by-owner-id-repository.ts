import { LoadPatrimonyByOwnerId } from '@/domain/usecases'

export interface LoadPatrimonyByOwnerIdRepository {
  loadByOwnerId (params: LoadPatrimonyByOwnerIdRepository.Params): Promise<LoadPatrimonyByOwnerIdRepository.Model>
}

export namespace LoadPatrimonyByOwnerIdRepository {
  export type Params = LoadPatrimonyByOwnerId.Params
  export type Model = LoadPatrimonyByOwnerId.Model
}
