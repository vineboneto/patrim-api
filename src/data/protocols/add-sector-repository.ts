import { Params as ParamsDomain, Result as ResultDomain } from '../../domain/usecases/add-sector'

export interface AddSectorRepository {
  addSector: (sector: Params) => Promise<Result>
}

export type Params = ParamsDomain

export type Result = ResultDomain
