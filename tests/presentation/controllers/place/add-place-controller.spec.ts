import { AddPlaceController } from '@/presentation/controllers'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddPlaceSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): AddPlaceController.Request => ({
  name: faker.name.findName()
})

type SutTypes = {
  sut: AddPlaceController
  validationSpy: ValidationSpy
  addPlaceSpy: AddPlaceSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addPlaceSpy = new AddPlaceSpy()
  const sut = new AddPlaceController(validationSpy, addPlaceSpy)
  return {
    sut,
    validationSpy,
    addPlaceSpy
  }
}

describe('AddPlaceController', () => {
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

  test('Should call AddPlace with correct value', async () => {
    const { sut, addPlaceSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addPlaceSpy.params).toEqual(request)
  })

  test('Should return 422 if AddPlace returns null', async () => {
    const { sut, addPlaceSpy } = makeSut()
    addPlaceSpy.model = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.name)))
  })

  test('Should return 200 on success', async () => {
    const { sut, addPlaceSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addPlaceSpy.model))
  })

  test('Should return 500 if AddPlace throws', async () => {
    const { sut, addPlaceSpy } = makeSut()
    jest.spyOn(addPlaceSpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
