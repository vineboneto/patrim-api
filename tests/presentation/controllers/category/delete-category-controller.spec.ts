import { DeleteCategoryController } from '@/presentation/controllers'
import { forbidden, ok, serverError } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeleteCategorySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): DeleteCategoryController.Request => ({
  id: faker.datatype.number()
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
    const params = mockRequest()
    await sut.handle(params)
    expect(deleteCategorySpy.params).toEqual(params)
  })

  test('Should return 403 if DeleteCategory return null', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    deleteCategorySpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new LinkedDataError('categories')))
  })

  test('Should return 200 with categoryDeleted if DeleteCategory succeeds', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(deleteCategorySpy.model))
  })

  test('Should return 500 if DeleteCategory throws', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    const error = new Error()
    jest.spyOn(deleteCategorySpy, 'delete').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
