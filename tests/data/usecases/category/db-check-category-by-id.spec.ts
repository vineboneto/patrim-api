import { DbCheckCategoryById } from '@/data/usecases'
import { CheckCategoryByIdRepositorySpy } from '@/tests/data/mocks'
import { mockCheckCategoryByIdParams } from '@/tests/domain/mocks'

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
    const params = mockCheckCategoryByIdParams()
    await sut.checkById(params)
    expect(checkCategoryByIdRepositorySpy.params).toEqual(params)
  })

  test('Should return true if CheckCategoryByIdRepository return true', async () => {
    const { sut } = makeSut()
    const check = await sut.checkById(mockCheckCategoryByIdParams())
    expect(check).toBe(true)
  })

  test('Should return false if CheckCategoryByIdRepository return false', async () => {
    const { sut, checkCategoryByIdRepositorySpy } = makeSut()
    checkCategoryByIdRepositorySpy.result = false
    const check = await sut.checkById(mockCheckCategoryByIdParams())
    expect(check).toBe(false)
  })

  test('Should throws if CheckCategoryByIdRepository throws', async () => {
    const { sut, checkCategoryByIdRepositorySpy } = makeSut()
    jest.spyOn(checkCategoryByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.checkById(mockCheckCategoryByIdParams())
    await expect(promise).rejects.toThrow()
  })
})
