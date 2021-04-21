import { AddPatrimony } from '@/domain/usecases'

export interface AddPatrimonyRepository {
  add (params: AddPatrimonyRepository.Params): Promise<AddPatrimonyRepository.Model>
}

export namespace AddPatrimonyRepository {
  export type Params = AddPatrimony.Params
  export type Model = AddPatrimony.Model
}
