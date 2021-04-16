import { DbCheckOwnerById } from '@/data/usecases'
import { CheckOwnerByIdRepositorySpy, mockCheckOwnerByIdRepositoryParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbCheckOwnerById
  checkOwnerByIdRepositorySpy: CheckOwnerByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkOwnerByIdRepositorySpy = new CheckOwnerByIdRepositorySpy()
  const sut = new DbCheckOwnerById(checkOwnerByIdRepositorySpy)
  return {
    sut,
    checkOwnerByIdRepositorySpy
  }
}

describe('DbCheckOwnerById', () => {
  test('Should call CheckOwnerByIdRepository with correct value', async () => {
    const { sut, checkOwnerByIdRepositorySpy } = makeSut()
    const params = mockCheckOwnerByIdRepositoryParams()
    await sut.checkById(params)
    expect(checkOwnerByIdRepositorySpy.params).toEqual(params)
  })

  test('Should return true if CheckOwnerByIdRepository return true', async () => {
    const { sut } = makeSut()
    const check = await sut.checkById(mockCheckOwnerByIdRepositoryParams())
    expect(check).toBe(true)
  })

  test('Should return false if CheckOwnerByIdRepository return false', async () => {
    const { sut, checkOwnerByIdRepositorySpy } = makeSut()
    checkOwnerByIdRepositorySpy.result = false
    const check = await sut.checkById(mockCheckOwnerByIdRepositoryParams())
    expect(check).toBe(false)
  })

  test('Should throws if CheckOwnerByIdRepository throws', async () => {
    const { sut, checkOwnerByIdRepositorySpy } = makeSut()
    jest.spyOn(checkOwnerByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.checkById(mockCheckOwnerByIdRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
