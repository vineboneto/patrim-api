import { DbAddOwner } from '@/data/usecases'
import { AddOwnerRepositorySpy, CheckSectorByIdRepositorySpy } from '@/tests/data/mocks'
import { mockAddOwnerParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddOwner
  addOwnerRepositorySpy: AddOwnerRepositorySpy
  checkSectorByIdRepositorySpy: CheckSectorByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const addOwnerRepositorySpy = new AddOwnerRepositorySpy()
  const checkSectorByIdRepositorySpy = new CheckSectorByIdRepositorySpy()
  const sut = new DbAddOwner(addOwnerRepositorySpy, checkSectorByIdRepositorySpy)
  return {
    sut,
    addOwnerRepositorySpy,
    checkSectorByIdRepositorySpy
  }
}

describe('DbAddOwner', () => {
  test('Should call CheckSectorByIdRepository with correct value', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    const params = mockAddOwnerParams()
    await sut.add(params)
    expect(checkSectorByIdRepositorySpy.params).toEqual({ id: params.sectorId })
  })

  test('Should return null if CheckSectorByIdRepository return false', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    checkSectorByIdRepositorySpy.result = false
    const owner = await sut.add(mockAddOwnerParams())
    expect(owner).toBeNull()
  })

  test('Should throw if CheckSectorByIdRepository throws', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSectorByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddOwnerParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddOwnerRepository with correct value', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    const params = mockAddOwnerParams()
    await sut.add(params)
    expect(addOwnerRepositorySpy.params).toEqual(params)
  })

  test('Should return null if AddOwnerRepository return null', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    addOwnerRepositorySpy.model = null
    const data = await sut.add(mockAddOwnerParams())
    expect(data).toBeNull()
  })

  test('Should return owner if AddOwnerRepository return owner', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    const data = await sut.add(mockAddOwnerParams())
    expect(data).toEqual(addOwnerRepositorySpy.model)
  })

  test('Should throw if AddOwnerRepository throws', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    jest.spyOn(addOwnerRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddOwnerParams())
    await expect(promise).rejects.toThrow()
  })
})
