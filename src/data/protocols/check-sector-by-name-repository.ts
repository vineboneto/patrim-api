export interface CheckSectorByNameRepository {
  checkByName (name: string): Promise<boolean>
}
