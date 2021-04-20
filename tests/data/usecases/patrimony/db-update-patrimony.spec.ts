import { DbUpdatePatrimony } from '@/data/usecases'
import {
  LoadPatrimonyNumberByIdRepositorySpy,
  mockUpdatePatrimonyRepositoryParams,
  UpdatePatrimonyRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbUpdatePatrimony
  updatePatrimonyRepositorySpy: UpdatePatrimonyRepositorySpy
  loadPatrimonyNumberByIdRepositorySpy: LoadPatrimonyNumberByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const updatePatrimonyRepositorySpy = new UpdatePatrimonyRepositorySpy()
  const loadPatrimonyNumberByIdRepositorySpy = new LoadPatrimonyNumberByIdRepositorySpy()
  const sut = new DbUpdatePatrimony(updatePatrimonyRepositorySpy, loadPatrimonyNumberByIdRepositorySpy)
  return {
    sut,
    updatePatrimonyRepositorySpy,
    loadPatrimonyNumberByIdRepositorySpy
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

  test('Should throws if UpdatePatrimonyRepository throw', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    jest.spyOn(updatePatrimonyRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePatrimonyRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadPatrimonyNumberByIdRepository with correct values', async () => {
    const { sut, loadPatrimonyNumberByIdRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyRepositoryParams()
    await sut.update(params)
    expect(loadPatrimonyNumberByIdRepositorySpy.id).toEqual(params.id)
  })
})
