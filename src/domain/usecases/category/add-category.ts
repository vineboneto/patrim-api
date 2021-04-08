export interface AddCategory {
  add (category: AddCategory.Params): Promise<AddCategory.Result>
}

export namespace AddCategory {
  export type Params = {
    name: string
  }
  export type Result = boolean
}
