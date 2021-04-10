export interface UpdateCategory {
  update (UpdateCategory: UpdateCategory.Params): Promise<UpdateCategory.Params>
}

export namespace UpdateCategory {
  export type Params = {
    id: number
  }

  export type Result = boolean
}
