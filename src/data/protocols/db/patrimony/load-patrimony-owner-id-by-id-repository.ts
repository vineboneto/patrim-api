export interface LoadPatrimonyOwnerIdByIdRepository {
  loadOwnerIdById (id: number): Promise<number>
}
