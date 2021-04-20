import { DbUpdatePatrimony } from '@/data/usecases'
import { mockUpdatePatrimonyRepositoryParams, UpdatePatrimonyRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbUpdatePatrimony
  updatePatrimonyRepositorySpy: UpdatePatrimonyRepositorySpy
}

const makeSut = (): SutTypes => {
  const updatePatrimonyRepositorySpy = new UpdatePatrimonyRepositorySpy()
  const sut = new DbUpdatePatrimony(updatePatrimonyRepositorySpy)
  return {
    sut,
    updatePatrimonyRepositorySpy
  }
}

describe('DbUpdatePatrimony', () => {
  test('Should call UpdatePatrimonyRepository with correct values', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyRepositoryParams()
    await sut.update(params)
    expect(updatePatrimonyRepositorySpy.params).toEqual(params)
  })
  test('Should return null if UpdatePatrimonyRepository return null', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    updatePatrimonyRepositorySpy.model = null
    const data = await sut.update(mockUpdatePatrimonyRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should return patrimony on success', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    const data = await sut.update(mockUpdatePatrimonyRepositoryParams())
    expect(data).toBe(updatePatrimonyRepositorySpy.model)
  })

  test('Should throws UpdatePatrimonyRepository throw', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    jest.spyOn(updatePatrimonyRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePatrimonyRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
