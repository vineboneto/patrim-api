import { SavePatrimony } from '@/domain/usecases'

export interface AddPatrimonyRepository {
  add (params: AddPatrimonyRepository.Params): Promise<AddPatrimonyRepository.Model>
}

export namespace AddPatrimonyRepository {
  export type Params = Omit<SavePatrimony.Params, 'id'>
  export type Model = SavePatrimony.Model
}
