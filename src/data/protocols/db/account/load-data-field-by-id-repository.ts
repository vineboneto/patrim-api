export interface LoadDataFieldByIdRepository {
  loadFieldById (id: number): Promise<any>
}
