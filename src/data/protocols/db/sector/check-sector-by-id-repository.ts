import { CheckSectorById } from '@/domain/usecases'

export interface CheckSectorByIdRepository {
  checkById (params: CheckSectorByIdRepository.Params): Promise<CheckSectorByIdRepository.Result>
}

export namespace CheckSectorByIdRepository {
  export type Params = CheckSectorById.Params
  export type Result = CheckSectorById.Result
}
