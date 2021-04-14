import { DbDeleteOwner } from '@/data/usecases'
import { DeleteOwnerRepositorySpy, mockDeleteOwnerParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbDeleteOwner
  deleteOwnerRepositorySpy: DeleteOwnerRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteOwnerRepositorySpy = new DeleteOwnerRepositorySpy()
  const sut = new DbDeleteOwner(deleteOwnerRepositorySpy)
  return {
    sut,
    deleteOwnerRepositorySpy
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

  test('Should return throw if DeleteOwnerRepository throws', async () => {
    const { sut, deleteOwnerRepositorySpy } = makeSut()
    jest.spyOn(deleteOwnerRepositorySpy, 'delete').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteOwnerParams())
    await expect(promise).rejects.toThrow()
  })
})
