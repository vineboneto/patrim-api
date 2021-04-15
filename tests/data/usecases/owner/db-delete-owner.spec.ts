import { DbDeleteOwner } from '@/data/usecases'
import {
  DeleteOwnerRepositorySpy,
  CheckPatrimonyByOwnerIdRepositorySpy,
  mockDeleteOwnerParams
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbDeleteOwner
  deleteOwnerRepositorySpy: DeleteOwnerRepositorySpy
  checkPatrimonyByOwnerIdSpy: CheckPatrimonyByOwnerIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteOwnerRepositorySpy = new DeleteOwnerRepositorySpy()
  const checkPatrimonyByOwnerIdSpy = new CheckPatrimonyByOwnerIdRepositorySpy()
  const sut = new DbDeleteOwner(deleteOwnerRepositorySpy, checkPatrimonyByOwnerIdSpy)
  return {
    sut,
    deleteOwnerRepositorySpy,
    checkPatrimonyByOwnerIdSpy
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

  test('Should call CheckPatrimonyByOwnerIdRepository with correct value', async () => {
    const { sut, checkPatrimonyByOwnerIdSpy } = makeSut()
    const params = mockDeleteOwnerParams()
    await sut.delete(params)
    expect(checkPatrimonyByOwnerIdSpy.params).toEqual({ ownerId: params.id })
  })

  test('Should return null if CheckPatrimonyByOwnerIdRepository returns false', async () => {
    const { sut, checkPatrimonyByOwnerIdSpy } = makeSut()
    checkPatrimonyByOwnerIdSpy.result = true
    const data = await sut.delete(mockDeleteOwnerParams())
    expect(data).toBe(null)
  })
})
