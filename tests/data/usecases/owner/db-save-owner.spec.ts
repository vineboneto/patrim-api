import { DbSaveOwner } from '@/data/usecases'
import {
  AddOwnerRepositorySpy,
  CheckSectorByIdRepositorySpy,
  mockAddOwnerRepositoryParams,
  mockUpdateOwnerRepositoryParams,
  UpdateOwnerRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSaveOwner
  addOwnerRepositorySpy: AddOwnerRepositorySpy
  updateOwnerRepositorySpy: UpdateOwnerRepositorySpy
  checkSectorByIdRepositorySpy: CheckSectorByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const addOwnerRepositorySpy = new AddOwnerRepositorySpy()
  const updateOwnerRepositorySpy = new UpdateOwnerRepositorySpy()
  const checkSectorByIdRepositorySpy = new CheckSectorByIdRepositorySpy()
  const sut = new DbSaveOwner(addOwnerRepositorySpy, updateOwnerRepositorySpy, checkSectorByIdRepositorySpy)
  return {
    sut,
    addOwnerRepositorySpy,
    updateOwnerRepositorySpy,
    checkSectorByIdRepositorySpy
  }
}

describe('DbSaveOwner', () => {
  test('Should call CheckSectorByIdRepository with correct value', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    const params = mockUpdateOwnerRepositoryParams()
    await sut.save(params)
    expect(checkSectorByIdRepositorySpy.params).toEqual({ id: params.sectorId })
  })

  test('Should return null if CheckSectorByIdRepository return false', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    checkSectorByIdRepositorySpy.result = false
    const owner = await sut.save(mockUpdateOwnerRepositoryParams())
    expect(owner).toBeNull()
  })

  test('Should throw if CheckSectorByIdRepository throws', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSectorByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockUpdateOwnerRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddOwnerRepository with correct value', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    const params = mockAddOwnerRepositoryParams()
    await sut.save(params)
    expect(addOwnerRepositorySpy.params).toEqual(params)
  })

  test('Should return null if AddOwnerRepository return null', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    addOwnerRepositorySpy.model = null
    const owner = await sut.save(mockAddOwnerRepositoryParams())
    expect(owner).toBeNull()
  })

  test('Should return owner if AddOwnerRepository return owner', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    const owner = await sut.save(mockAddOwnerRepositoryParams())
    expect(owner).toEqual(addOwnerRepositorySpy.model)
  })

  test('Should throw if AddOwnerRepository throws', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    jest.spyOn(addOwnerRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddOwnerRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateOwnerRepository with correct value', async () => {
    const { sut, updateOwnerRepositorySpy } = makeSut()
    const params = mockUpdateOwnerRepositoryParams()
    await sut.save(params)
    expect(updateOwnerRepositorySpy.params).toEqual(params)
  })

  test('Should return null if UpdateOwnerRepository return null', async () => {
    const { sut, updateOwnerRepositorySpy } = makeSut()
    updateOwnerRepositorySpy.model = null
    const owner = await sut.save(mockUpdateOwnerRepositoryParams())
    expect(owner).toBeNull()
  })

  test('Should return owner if UpdateOwnerRepository returns owner', async () => {
    const { sut, updateOwnerRepositorySpy } = makeSut()
    const owner = await sut.save(mockUpdateOwnerRepositoryParams())
    expect(owner).toEqual(updateOwnerRepositorySpy.model)
  })

  test('Should throw if UpdateOwnerRepository throws', async () => {
    const { sut, updateOwnerRepositorySpy } = makeSut()
    jest.spyOn(updateOwnerRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockUpdateOwnerRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
