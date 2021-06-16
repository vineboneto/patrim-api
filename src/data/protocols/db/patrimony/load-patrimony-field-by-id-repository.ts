export interface LoadPatrimonyFieldByIdRepository {
  loadFieldById (id: number): Promise<any>
}
