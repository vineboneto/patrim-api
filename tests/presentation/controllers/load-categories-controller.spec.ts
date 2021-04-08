import { LoadCategoriesController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadCategoriesSpy } from '@/tests/domain/mocks'

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
  test('Should call LoadCategories', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    await sut.handle()
    expect(loadCategoriesSpy.callsCount).toBe(1)
  })

  test('Should return 204 if LoadCategories returns empty array', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    loadCategoriesSpy.categoriesModel = []
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if LoadCategories returns categories', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadCategoriesSpy.categoriesModel))
  })

  test('Should return 500 if LoadCategories throws', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    const error = new Error()
    jest.spyOn(loadCategoriesSpy, 'load').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(error))
  })
})
