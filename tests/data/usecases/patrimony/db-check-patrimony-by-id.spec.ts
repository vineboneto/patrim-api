import { DbCheckPatrimonyById } from '@/data/usecases'
import { CheckPatrimonyByIdRepositorySpy, mockCheckPatrimonyByIdRepositoryParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbCheckPatrimonyById
  checkPatrimonyByIdRepositorySpy: CheckPatrimonyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPatrimonyByIdRepositorySpy = new CheckPatrimonyByIdRepositorySpy()
  const sut = new DbCheckPatrimonyById(checkPatrimonyByIdRepositorySpy)
  return {
    sut,
    checkPatrimonyByIdRepositorySpy
  }
}

describe('DbCheckPatrimonyById', () => {
  test('Should call CheckPatrimonyByIdRepository with correct value', async () => {
    const { sut, checkPatrimonyByIdRepositorySpy } = makeSut()
    const params = mockCheckPatrimonyByIdRepositoryParams()
    await sut.checkById(params)
    expect(checkPatrimonyByIdRepositorySpy.params).toEqual(params)
  })

  test('Should return false if CheckPatrimonyByIdRepository returns false', async () => {
    const { sut, checkPatrimonyByIdRepositorySpy } = makeSut()
    checkPatrimonyByIdRepositorySpy.result = false
    const data = await sut.checkById(mockCheckPatrimonyByIdRepositoryParams())
    expect(data).toBe(false)
  })

  test('Should return true if CheckPatrimonyByIdRepository returns true', async () => {
    const { sut } = makeSut()
    const data = await sut.checkById(mockCheckPatrimonyByIdRepositoryParams())
    expect(data).toBe(true)
  })

  test('Should throw CheckPatrimonyByIdRepository throws', async () => {
    const { sut, checkPatrimonyByIdRepositorySpy } = makeSut()
    jest.spyOn(checkPatrimonyByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.checkById(mockCheckPatrimonyByIdRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
