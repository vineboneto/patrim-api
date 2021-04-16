import { DbCheckCategoryById } from '@/data/usecases'
import { CheckCategoryByIdRepositorySpy, mockCheckCategoryByIdRepositoryParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbCheckCategoryById
  checkCategoryByIdRepositorySpy: CheckCategoryByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkCategoryByIdRepositorySpy = new CheckCategoryByIdRepositorySpy()
  const sut = new DbCheckCategoryById(checkCategoryByIdRepositorySpy)
  return {
    sut,
    checkCategoryByIdRepositorySpy
  }
}

describe('DbCheckCategoryById', () => {
  test('Should call CheckCategoryByIdRepository with correct value', async () => {
    const { sut, checkCategoryByIdRepositorySpy } = makeSut()
    const params = mockCheckCategoryByIdRepositoryParams()
    await sut.checkById(params)
    expect(checkCategoryByIdRepositorySpy.params).toEqual(params)
  })

  test('Should return true if CheckCategoryByIdRepository return true', async () => {
    const { sut } = makeSut()
    const check = await sut.checkById(mockCheckCategoryByIdRepositoryParams())
    expect(check).toBe(true)
  })

  test('Should return false if CheckCategoryByIdRepository return false', async () => {
    const { sut, checkCategoryByIdRepositorySpy } = makeSut()
    checkCategoryByIdRepositorySpy.result = false
    const check = await sut.checkById(mockCheckCategoryByIdRepositoryParams())
    expect(check).toBe(false)
  })

  test('Should throws if CheckCategoryByIdRepository throws', async () => {
    const { sut, checkCategoryByIdRepositorySpy } = makeSut()
    jest.spyOn(checkCategoryByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.checkById(mockCheckCategoryByIdRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
