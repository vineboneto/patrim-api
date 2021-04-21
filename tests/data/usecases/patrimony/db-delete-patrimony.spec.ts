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

  test('Should return null if DeletePatrimonyRepository return null', async () => {
    const { sut, deletePatrimonyRepositorySpy } = makeSut()
    deletePatrimonyRepositorySpy.model = null
    const data = await sut.delete(mockDeletePatrimonyRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should return patrimony on success', async () => {
    const { sut, deletePatrimonyRepositorySpy } = makeSut()
    const data = await sut.delete(mockDeletePatrimonyRepositoryParams())
    expect(data).toEqual(deletePatrimonyRepositorySpy.model)
  })
})
