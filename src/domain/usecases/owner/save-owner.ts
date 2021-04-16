import { OwnerModel } from '@/domain/models'

export interface SaveOwner {
  save (params: SaveOwner.Params): Promise<SaveOwner.Model>
}

export namespace SaveOwner {
  export type Params = {
    id?: number
    name: string
    sectorId: number
  }

  export type Model = OwnerModel
}
