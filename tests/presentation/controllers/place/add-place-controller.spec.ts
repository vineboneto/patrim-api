import { AddPlaceController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { CheckAccountByIdSpy, SavePlaceSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): AddPlaceController.Request => ({
  name: faker.name.jobArea(),
  userId: faker.datatype.number()
})

type SutTypes = {
  sut: AddPlaceController
  addPlaceSpy: SavePlaceSpy
  validationSpy: ValidationSpy
  checkAccountByIdSpy: CheckAccountByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addPlaceSpy = new SavePlaceSpy()
  const checkAccountByIdSpy = new CheckAccountByIdSpy()
  const sut = new AddPlaceController(addPlaceSpy, checkAccountByIdSpy, validationSpy)
  return {
    sut,
    addPlaceSpy,
    checkAccountByIdSpy,
    validationSpy
  }
}

describe('AddPlaceController', () => {
  test('Should call Validation with only name if userId is undefined', async () => {
    const { sut, validationSpy } = makeSut()
    const { name } = mockRequest()
    await sut.handle({ name })
    expect(validationSpy.input).toEqual({ name })
  })

  test('Should call Validation with name and userId if userId not is undefined', async () => {
    const { sut, validationSpy } = makeSut()
    const { name, userId } = mockRequest()
    await sut.handle({ name, userId })
    expect(validationSpy.input).toEqual({ name, userId })
  })
})
