export interface UpdateCategory {
  update (UpdateCategory: UpdateCategory.Params): Promise<UpdateCategory.Result>
}

export namespace UpdateCategory {
  export type Params = {
    id: number
    name: string
  }

  export type Result = boolean
}
