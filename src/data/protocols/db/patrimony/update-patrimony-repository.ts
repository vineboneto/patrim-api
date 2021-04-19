import { SavePatrimony } from '@/domain/usecases'

export interface UpdatePatrimonyRepository {
  update (params: UpdatePatrimonyRepository.Params): Promise<UpdatePatrimonyRepository.Model>
}

export namespace UpdatePatrimonyRepository {
  export type Params = {
    id: number
    number: string
    brand: string
    description?: string
    categoryId: number
    ownerId: number
    placeId: number
  }

  export type Model = SavePatrimony.Model
}
