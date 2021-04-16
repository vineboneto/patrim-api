import { LoadCategoriesController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadCategoriesSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadCategoriesController.Request => ({
  take: faker.datatype.number(),
  skip: faker.datatype.number()
})

type SutTypes = {
  sut: LoadCategoriesController
  loadCategoriesSpy: LoadCategoriesSpy
}

const makeSut = (): SutTypes => {
  const loadCategoriesSpy = new LoadCategoriesSpy()
  const sut = new LoadCategoriesController(loadCategoriesSpy)
  return {
    sut,
    loadCategoriesSpy
  }
}

describe('LoadCategoriesController', () => {
  test('Should call LoadCategories with correct value', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    const params = mockRequest()
    await sut.handle(params)
    expect(loadCategoriesSpy.params).toEqual(params)
  })

  test('Should return 204 if LoadCategories returns empty array', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    loadCategoriesSpy.categoriesModel = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if LoadCategories returns categories', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadCategoriesSpy.categoriesModel))
  })

  test('Should return 500 if LoadCategories throws', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    const error = new Error()
    jest.spyOn(loadCategoriesSpy, 'load').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
