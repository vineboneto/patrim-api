import { DbDeletePatrimony } from '@/data/usecases'
import { DeletePatrimonyRepositorySpy } from '@/tests/data/mocks'
import { mockDeletePatrimonyParams } from '@/tests/domain/mocks'

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
    const params = mockDeletePatrimonyParams()
    await sut.delete(params)
    expect(deletePatrimonyRepositorySpy.params).toEqual(params)
  })

  test('Should return null if DeletePatrimonyRepository return null', async () => {
    const { sut, deletePatrimonyRepositorySpy } = makeSut()
    deletePatrimonyRepositorySpy.model = null
    const data = await sut.delete(mockDeletePatrimonyParams())
    expect(data).toBe(null)
  })

  test('Should return patrimony on success', async () => {
    const { sut, deletePatrimonyRepositorySpy } = makeSut()
    const data = await sut.delete(mockDeletePatrimonyParams())
    expect(data).toEqual(deletePatrimonyRepositorySpy.model)
  })

  test('Should throw if DeletePatrimonyRepository throws', async () => {
    const { sut, deletePatrimonyRepositorySpy } = makeSut()
    jest.spyOn(deletePatrimonyRepositorySpy, 'delete').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeletePatrimonyParams())
    await expect(promise).rejects.toThrow()
  })
})
