import { SavePlaceController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { SavePlaceSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): SavePlaceController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

type SutTypes = {
  sut: SavePlaceController
  validationSpy: ValidationSpy
  savePlaceSpy: SavePlaceSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const savePlaceSpy = new SavePlaceSpy()
  const sut = new SavePlaceController(validationSpy, savePlaceSpy)
  return {
    sut,
    validationSpy,
    savePlaceSpy
  }
}

describe('SavePlaceController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call SavePlace with correct value', async () => {
    const { sut, savePlaceSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(savePlaceSpy.params).toEqual(request)
  })
})
