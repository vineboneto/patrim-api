import { SavePlace } from '@/domain/usecases'

export class SavePlaceSpy implements SavePlace {
  params: SavePlace.Params
  result = true
  async save (place: SavePlace.Params): Promise<SavePlace.Result> {
    this.params = place
    return this.result
  }
}
