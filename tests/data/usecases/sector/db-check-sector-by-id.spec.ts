import { DbCheckSectorById } from '@/data/usecases'
import { CheckSectorByIdRepositorySpy, mockCheckSectorByIdRepositoryParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbCheckSectorById
  checkSectorByIdRepositorySpy: CheckSectorByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSectorByIdRepositorySpy = new CheckSectorByIdRepositorySpy()
  const sut = new DbCheckSectorById(checkSectorByIdRepositorySpy)
  return {
    sut,
    checkSectorByIdRepositorySpy
  }
}

describe('DbCheckSectorById', () => {
  test('Should call CheckSectorByIdRepository with correct value', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    const params = mockCheckSectorByIdRepositoryParams()
    await sut.checkById(params)
    expect(checkSectorByIdRepositorySpy.params).toEqual(params)
  })

  test('Should return true if CheckSectorByIdRepository return true', async () => {
    const { sut } = makeSut()
    const check = await sut.checkById(mockCheckSectorByIdRepositoryParams())
    expect(check).toBe(true)
  })

  test('Should return false if CheckSectorByIdRepository return false', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    checkSectorByIdRepositorySpy.result = false
    const check = await sut.checkById(mockCheckSectorByIdRepositoryParams())
    expect(check).toBe(false)
  })

  test('Should throws if CheckSectorByIdRepository throws', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSectorByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.checkById(mockCheckSectorByIdRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
