import { DbUpdateOwner } from '@/data/usecases'
import { CheckSectorByIdRepositorySpy, UpdateOwnerRepositorySpy } from '@/tests/data/mocks'
import { mockUpdateOwnerParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbUpdateOwner
  updateOwnerRepositorySpy: UpdateOwnerRepositorySpy
  checkSectorByIdRepositorySpy: CheckSectorByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateOwnerRepositorySpy = new UpdateOwnerRepositorySpy()
  const checkSectorByIdRepositorySpy = new CheckSectorByIdRepositorySpy()
  const sut = new DbUpdateOwner(updateOwnerRepositorySpy, checkSectorByIdRepositorySpy)
  return {
    sut,
    updateOwnerRepositorySpy,
    checkSectorByIdRepositorySpy
  }
}

describe('DbUpdateOwner', () => {
  test('Should call CheckSectorByIdRepository with correct value', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    const params = mockUpdateOwnerParams()
    await sut.update(params)
    expect(checkSectorByIdRepositorySpy.params).toEqual({ id: params.sectorId })
  })

  test('Should return null if CheckSectorByIdRepository return false', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    checkSectorByIdRepositorySpy.result = false
    const owner = await sut.update(mockUpdateOwnerParams())
    expect(owner).toBeNull()
  })

  test('Should throw if CheckSectorByIdRepository throws', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSectorByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateOwnerParams())
    await expect(promise).rejects.toThrow()
  })

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
