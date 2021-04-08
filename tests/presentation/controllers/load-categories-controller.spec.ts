import { LoadCategoriesController } from '@/presentation/controllers'
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
})
