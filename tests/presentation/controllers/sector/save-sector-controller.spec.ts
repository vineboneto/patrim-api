import { SaveSectorController } from '@/presentation/controllers'
import { badRequest, noContent, serverError, unprocessableEntity } from '@/presentation/helper/http-helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { SaveSectorSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): SaveSectorController.Request => ({
  name: faker.name.jobArea()
})

type SutTypes = {
  sut: SaveSectorController
  saveSectorSpy: SaveSectorSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const saveSectorSpy = new SaveSectorSpy()
  const sut = new SaveSectorController(saveSectorSpy, validationSpy)
  return {
    sut,
    saveSectorSpy,
    validationSpy
  }
}

describe('SaveSectorController', () => {
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

  test('Should call SaveSector with correct values', async () => {
    const { sut, saveSectorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveSectorSpy.params).toEqual({
      id: Number(request.id),
      name: request.name
    })
  })

  test('Should return 422 if SaveSector return false', async () => {
    const { sut, saveSectorSpy } = makeSut()
    saveSectorSpy.result = false
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.name)))
  })

  test('Should return 500 if SaveSector throws', async () => {
    const { sut, saveSectorSpy } = makeSut()
    jest.spyOn(saveSectorSpy, 'save').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
