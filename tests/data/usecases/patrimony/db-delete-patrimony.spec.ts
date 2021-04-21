import { DbDeletePatrimony } from '@/data/usecases'
import { DeletePatrimonyRepositorySpy, mockDeletePatrimonyRepositoryParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbDeletePatrimony
  deletePatrimonyRepositorySpy: DeletePatrimonyRepositorySpy
}

const makeSut = (): SutTypes => {
  const deletePatrimonyRepositorySpy = new DeletePatrimonyRepositorySpy()
  const sut = new DbDeletePatrimony(deletePatrimonyRepositorySpy)
  return {
    sut,
    deletePatrimonyRepositorySpy
  }
}

describe('DbDeletePatrimony', () => {
  test('Should call DeletePatrimonyRepository with correct value', async () => {
    const { sut, deletePatrimonyRepositorySpy } = makeSut()
    const params = mockDeletePatrimonyRepositoryParams()
    await sut.delete(params)
    expect(deletePatrimonyRepositorySpy.params).toEqual(params)
  })
})
