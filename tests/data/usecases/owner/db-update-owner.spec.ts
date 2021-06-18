import { DbUpdateOwner } from '@/data/usecases'
import { UpdateOwnerRepositorySpy } from '@/tests/data/mocks'
import { mockUpdateOwnerParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbUpdateOwner
  updateOwnerRepositorySpy: UpdateOwnerRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateOwnerRepositorySpy = new UpdateOwnerRepositorySpy()
  const sut = new DbUpdateOwner(updateOwnerRepositorySpy)
  return {
    sut,
    updateOwnerRepositorySpy
  }
}

describe('DbUpdateOwner', () => {
  test('Should call UpdateOwnerRepository with correct value', async () => {
    const { sut, updateOwnerRepositorySpy } = makeSut()
    const params = mockUpdateOwnerParams()
    await sut.update(params)
    expect(updateOwnerRepositorySpy.params).toEqual(params)
  })

  test('Should return null if UpdateOwnerRepository return null', async () => {
    const { sut, updateOwnerRepositorySpy } = makeSut()
    updateOwnerRepositorySpy.model = null
    const owner = await sut.update(mockUpdateOwnerParams())
    expect(owner).toBeNull()
  })

  test('Should return owner if UpdateOwnerRepository returns owner', async () => {
    const { sut, updateOwnerRepositorySpy } = makeSut()
    const owner = await sut.update(mockUpdateOwnerParams())
    expect(owner).toEqual(updateOwnerRepositorySpy.model)
  })

  test('Should throw if UpdateOwnerRepository throws', async () => {
    const { sut, updateOwnerRepositorySpy } = makeSut()
    jest.spyOn(updateOwnerRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateOwnerParams())
    await expect(promise).rejects.toThrow()
  })
})
