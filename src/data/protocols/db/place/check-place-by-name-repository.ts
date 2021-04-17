export interface CheckPlaceByNameRepository {
  checkByName (name: string): Promise<boolean>
}
