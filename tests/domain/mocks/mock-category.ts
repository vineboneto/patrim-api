import { AddCategory } from '@/domain/usecases'
import faker from 'faker'

export const mockAddCategoryParams = (): AddCategory.Params => ({
  name: faker.name.jobType()
})
