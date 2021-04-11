import { CheckPlaceById, SavePlace } from '@/domain/usecases'

export class SavePlaceSpy implements SavePlace {
  params: SavePlace.Params
  result = true
  async save (place: SavePlace.Params): Promise<SavePlace.Result> {
    this.params = place
    return this.result
  }
}

export class CheckPlaceByIdSpy implements CheckPlaceById {
  id: string
  result = true
  async checkById (id: string): Promise<CheckPlaceById.Result> {
    this.id = id
    return this.result
  }
}
