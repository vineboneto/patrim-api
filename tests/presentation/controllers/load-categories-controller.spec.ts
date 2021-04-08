import { LoadCategoriesController } from '@/presentation/controllers'
import { serverError } from '@/presentation/helper'
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

  test('Should return 500 if LoadCategories throws', async () => {
    const { sut, loadCategoriesSpy } = makeSut()
    const error = new Error()
    jest.spyOn(loadCategoriesSpy, 'load').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(error))
  })
})
