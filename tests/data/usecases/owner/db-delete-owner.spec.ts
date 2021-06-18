import { DbDeleteOwner } from '@/data/usecases'
import { DeleteOwnerRepositorySpy, CheckPatrimonyByFieldRepositorySpy } from '@/tests/data/mocks'
import { mockDeleteOwnerParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeleteOwner
  deleteOwnerRepositorySpy: DeleteOwnerRepositorySpy
  checkPatrimonyByFieldSpy: CheckPatrimonyByFieldRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteOwnerRepositorySpy = new DeleteOwnerRepositorySpy()
  const checkPatrimonyByFieldSpy = new CheckPatrimonyByFieldRepositorySpy()
  const sut = new DbDeleteOwner(deleteOwnerRepositorySpy, checkPatrimonyByFieldSpy)
  return {
    sut,
    deleteOwnerRepositorySpy,
    checkPatrimonyByFieldSpy
  }
}

describe('DbDeleteOwner', () => {
  test('Should call DeleteOwnerRepository with correct value', async () => {
    const { sut, deleteOwnerRepositorySpy } = makeSut()
    const params = mockDeleteOwnerParams()
    await sut.delete(params)
    expect(deleteOwnerRepositorySpy.params).toEqual(params)
  })

  test('Should return null if DeleteOwnerRepository return null', async () => {
    const { sut, deleteOwnerRepositorySpy } = makeSut()
    deleteOwnerRepositorySpy.model = null
    const data = await sut.delete(mockDeleteOwnerParams())
    expect(data).toBe(null)
  })

  test('Should return owner deleted on success', async () => {
    const { sut, deleteOwnerRepositorySpy } = makeSut()
    const data = await sut.delete(mockDeleteOwnerParams())
    expect(data).toEqual(deleteOwnerRepositorySpy.model)
  })

  test('Should throw if DeleteOwnerRepository throws', async () => {
    const { sut, deleteOwnerRepositorySpy } = makeSut()
    jest.spyOn(deleteOwnerRepositorySpy, 'delete').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteOwnerParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckPatrimonyByFieldRepository with correct value', async () => {
    const { sut, checkPatrimonyByFieldSpy } = makeSut()
    const params = mockDeleteOwnerParams()
    await sut.delete(params)
    expect(checkPatrimonyByFieldSpy.params).toEqual({
      value: params.id,
      accountId: params.accountId
    })
  })

  test('Should return null if CheckPatrimonyByFieldRepository returns false', async () => {
    const { sut, checkPatrimonyByFieldSpy } = makeSut()
    checkPatrimonyByFieldSpy.result = true
    const data = await sut.delete(mockDeleteOwnerParams())
    expect(data).toBe(null)
  })

  test('Should throw if CheckPatrimonyByFieldRepository throws', async () => {
    const { sut, checkPatrimonyByFieldSpy } = makeSut()
    jest.spyOn(checkPatrimonyByFieldSpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteOwnerParams())
    await expect(promise).rejects.toThrow()
  })
})
