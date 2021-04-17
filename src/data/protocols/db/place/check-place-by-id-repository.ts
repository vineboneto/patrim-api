import { CheckPlaceById } from '@/domain/usecases'

export interface CheckPlaceByIdRepository {
  checkById (params: CheckPlaceByIdRepository.Params): Promise<CheckPlaceByIdRepository.Result>
}

export namespace CheckPlaceByIdRepository {
  export type Params = CheckPlaceById.Params
  export type Result = CheckPlaceById.Result
}
