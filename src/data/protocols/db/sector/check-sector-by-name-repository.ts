export interface CheckSectorByNameRepository {
  checkByName (name: string | number): Promise<boolean>
}
