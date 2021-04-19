import { CheckPatrimonyById } from '@/domain/usecases'

export interface CheckPatrimonyByIdRepository {
  checkById (params: CheckPatrimonyByIdRepository.Params):
  Promise<CheckPatrimonyByIdRepository.Result>
}

export namespace CheckPatrimonyByIdRepository {
  export type Params = CheckPatrimonyById.Params
  export type Result = CheckPatrimonyById.Result
}
