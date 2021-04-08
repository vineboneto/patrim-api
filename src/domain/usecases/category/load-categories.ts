export interface LoadCategories {
  load (): Promise<LoadCategories.Model>
}

export namespace LoadCategories {
  export type CategoryModel = {
    id: number
    name: string
  }

  export type Model = CategoryModel[]
}
