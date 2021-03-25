import { AddSectorController } from '@/presentation/controllers'
import { AddSectorSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { badRequest, noContent, serverError, forbidden } from '@/presentation/helper/http-helper'
import { AlreadyExistsError } from '@/presentation/errors'

import faker from 'faker'

const mockRequest = (): AddSectorController.Request => ({
  name: faker.name.jobArea()
})

type SutTypes = {
  sut: AddSectorController
  addSectorSpy: AddSectorSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addSectorSpy = new AddSectorSpy()
  const sut = new AddSectorController(addSectorSpy, validationSpy)
  return {
    sut,
    addSectorSpy,
    validationSpy
  }
}

describe('AddSectorController', () => {
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
    expect(httpResponse).toEqual(badRequest(validationSpy.result))
  })

  test('Should call AddSector with correct values', async () => {
    const { sut, addSectorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addSectorSpy.params).toEqual(request)
  })

  test('Should return 403 if AddSector return false', async () => {
    const { sut, addSectorSpy } = makeSut()
    addSectorSpy.result = false
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new AlreadyExistsError(request.name)))
  })

  test('Should return 500 if AddSector throws', async () => {
    const { sut, addSectorSpy } = makeSut()
    jest.spyOn(addSectorSpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
