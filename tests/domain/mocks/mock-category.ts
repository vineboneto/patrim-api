import { AddCategory, LoadCategories } from '@/domain/usecases'
import faker from 'faker'

export const mockAddCategoryParams = (): AddCategory.Params => ({
  name: faker.name.jobType()
})

export const mockAddCategoriesParams = (): AddCategory.Params[] => ([
  mockAddCategoryParams(),
  mockAddCategoryParams(),
  mockAddCategoryParams()
])

export const mockCategoriesModel = (): LoadCategories.Model => ([
  {
    id: faker.datatype.number(),
    name: faker.name.findName()
  },
  {
    id: faker.datatype.number(),
    name: faker.name.findName()
  },
  {
    id: faker.datatype.number(),
    name: faker.name.findName()
  }
])
