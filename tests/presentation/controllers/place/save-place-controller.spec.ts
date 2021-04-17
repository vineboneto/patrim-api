import { SavePlaceController } from '@/presentation/controllers'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { AlreadyExistsError } from '@/presentation/errors'
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

  test('Should return 422 if SavePlace returns null', async () => {
    const { sut, savePlaceSpy } = makeSut()
    savePlaceSpy.model = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.name)))
  })

  test('Should return 200 on success', async () => {
    const { sut, savePlaceSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(savePlaceSpy.model))
  })

  test('Should return 500 if SavePlace throws', async () => {
    const { sut, savePlaceSpy } = makeSut()
    jest.spyOn(savePlaceSpy, 'save').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
