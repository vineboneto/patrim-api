export interface LoadPatrimonyByOwnerId {
  loadByOwnerId (params: LoadPatrimonyByOwnerId.Params): Promise<LoadPatrimonyByOwnerId.Model>
}

export namespace LoadPatrimonyByOwnerId {
  export type Params = {
    ownerId: number
  }
  export type Model = {
    id: number
    number: string
  }
}
