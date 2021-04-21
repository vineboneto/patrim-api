import { UpdatePlaceController } from '@/presentation/controllers/'
import { AlreadyExistsError, InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { CheckExistSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { UpdatePlaceSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): UpdatePlaceController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.jobArea()
})

type SutTypes = {
  validationSpy: ValidationSpy
  sut: UpdatePlaceController
  checkExistSpy: CheckExistSpy
  updatePlaceSpy: UpdatePlaceSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const checkExistSpy = new CheckExistSpy()
  const updatePlaceSpy = new UpdatePlaceSpy()
  const sut = new UpdatePlaceController(validationSpy, checkExistSpy, updatePlaceSpy)
  return {
    sut,
    validationSpy,
    checkExistSpy,
    updatePlaceSpy
  }
}

describe('UpdatePlaceController', () => {
  test('Should call Validation with correct values', async () => {
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

  test('Should call CheckExist with correct values', async () => {
    const { sut, checkExistSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkExistSpy.input).toEqual(request)
  })

  test('Should return 403 if CheckExists fails', async () => {
    const { sut, checkExistSpy } = makeSut()
    checkExistSpy.result = new InvalidParamError('id')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })

  test('Should return 500 if CheckExists throws', async () => {
    const { sut, checkExistSpy } = makeSut()
    jest.spyOn(checkExistSpy, 'check').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call UpdatePlace with correct values', async () => {
    const { sut, updatePlaceSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updatePlaceSpy.params).toEqual(request)
  })

  test('Should return 403 if UpdatePlace fails', async () => {
    const { sut, updatePlaceSpy } = makeSut()
    updatePlaceSpy.model = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.name)))
  })

  test('Should return 200 on success', async () => {
    const { sut, updatePlaceSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updatePlaceSpy.model))
  })

  test('Should return 500 if UpdatePlace throws', async () => {
    const { sut, updatePlaceSpy } = makeSut()
    jest.spyOn(updatePlaceSpy, 'update').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
