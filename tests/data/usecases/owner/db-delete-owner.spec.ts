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
})
