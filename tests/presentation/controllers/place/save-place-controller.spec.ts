import { SavePlaceController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): SavePlaceController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

type SutTypes = {
  sut: SavePlaceController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new SavePlaceController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('SavePlaceController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
