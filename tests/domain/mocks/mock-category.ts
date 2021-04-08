import { AddCategory, LoadCategories } from '@/domain/usecases'
import faker from 'faker'

export const mockAddCategoryParams = (): AddCategory.Params => ({
  name: faker.name.jobType()
})

export const mockCategoryModels = (): LoadCategories.Model => ([
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
