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
})
