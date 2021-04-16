import { CheckOwnerById } from '@/domain/usecases'

export interface CheckOwnerByIdRepository {
  checkById (params: CheckOwnerByIdRepository.Params): Promise<CheckOwnerByIdRepository.Result>
}

export namespace CheckOwnerByIdRepository {
  export type Params = CheckOwnerById.Params
  export type Result = CheckOwnerById.Result
}
