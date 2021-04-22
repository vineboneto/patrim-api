import { AddAccountPlaceController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): AddAccountPlaceController.Request => ({
  accountId: faker.datatype.number(),
  placeId: faker.datatype.number()
})

type SutTypes = {
  sut: AddAccountPlaceController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddAccountPlaceController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('AddAccountPlaceController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
