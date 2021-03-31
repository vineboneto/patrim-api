import { AddCategoryController } from '@/presentation/controllers/'
import { AddCategorySpy } from '@/tests/presentation/mocks'
import faker from 'faker'

describe('AddCategoryController', () => {
  test('Should call AddSector with correct values', async () => {
    const addCategorySpy = new AddCategorySpy()
    const sut = new AddCategoryController(addCategorySpy)
    const request = { name: faker.name.jobTitle() }
    await sut.handle(request)
    expect(addCategorySpy.params).toEqual(request)
  })
})
