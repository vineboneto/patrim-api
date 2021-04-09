import { DeleteCategoryController } from '@/presentation/controllers'
import { DeleteCategorySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): DeleteCategoryController.Request => ({
  id: faker.datatype.number().toString()
})

type SutTypes = {
  sut: DeleteCategoryController
  deleteCategorySpy: DeleteCategorySpy
}

const makeSut = (): SutTypes => {
  const deleteCategorySpy = new DeleteCategorySpy()
  const sut = new DeleteCategoryController(deleteCategorySpy)
  return {
    sut,
    deleteCategorySpy
  }
}

describe('DeleteCategoryController', () => {
  test('Should call DeleteCategory with correct value', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    const { id } = mockRequest()
    await sut.handle({ id })
    expect(deleteCategorySpy.params).toEqual({ id: Number(id) })
  })
})
