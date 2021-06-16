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
})
