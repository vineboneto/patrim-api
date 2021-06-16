import { DbCheckAccessData } from '@/data/usecases'
import { CheckAccessDataRepositorySpy } from '@/tests/data/mocks'
import { mockCheckAccessDataParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbCheckAccessData
  checkAccessDataRepositorySpy: CheckAccessDataRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkAccessDataRepositorySpy = new CheckAccessDataRepositorySpy()
  const sut = new DbCheckAccessData(
    checkAccessDataRepositorySpy
  )
  return {
    sut,
    checkAccessDataRepositorySpy
  }
}

describe('DbCheckAccessData', () => {
  test('Should calls CheckAccessDataRepository with correct value', async () => {
    const { sut, checkAccessDataRepositorySpy } = makeSut()
    const params = mockCheckAccessDataParams()
    await sut.checkAccess(params)
    expect(checkAccessDataRepositorySpy.callsCount).toBe(1)
    expect(checkAccessDataRepositorySpy.params).toEqual({
      accountId: params.accountId,
      databaseName: params.dataAccess[0].databaseName,
      id: params.dataAccess[0].id
    })
  })

  test('Should return false if CheckAccessDataRepository returns false', async () => {
    const { sut, checkAccessDataRepositorySpy } = makeSut()
    checkAccessDataRepositorySpy.result = false
    const data = await sut.checkAccess(mockCheckAccessDataParams())
    expect(data).toBe(false)
  })

  test('Should return true if CheckAccessDataRepository returns true', async () => {
    const { sut } = makeSut()
    const data = await sut.checkAccess(mockCheckAccessDataParams())
    expect(data).toBe(true)
  })

  test('Should CheckAccessDataRepository throws if CheckAccessDataRepository throws', async () => {
    const { sut, checkAccessDataRepositorySpy } = makeSut()
    jest.spyOn(checkAccessDataRepositorySpy, 'checkAccess').mockRejectedValueOnce(new Error())
    const promise = sut.checkAccess(mockCheckAccessDataParams())
    await expect(promise).rejects.toThrow()
  })
})
