import { UpdateSectorController } from '@/presentation/controllers/'
import { AlreadyExistsError } from '@/presentation/errors'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { UpdateSectorSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): UpdateSectorController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.jobArea(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  validationSpy: ValidationSpy
  sut: UpdateSectorController
  updateSectorSpy: UpdateSectorSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updateSectorSpy = new UpdateSectorSpy()
  const sut = new UpdateSectorController(validationSpy, updateSectorSpy)
  return {
    sut,
    validationSpy,
    updateSectorSpy
  }
}

describe('UpdateSectorController', () => {
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

  test('Should call UpdateSector with correct values', async () => {
    const { sut, updateSectorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateSectorSpy.params).toEqual(request)
  })

  test('Should return 403 if UpdateSector fails', async () => {
    const { sut, updateSectorSpy } = makeSut()
    updateSectorSpy.model = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.name)))
  })

  test('Should return 200 on success', async () => {
    const { sut, updateSectorSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updateSectorSpy.model))
  })

  test('Should return 500 if UpdateSector throws', async () => {
    const { sut, updateSectorSpy } = makeSut()
    jest.spyOn(updateSectorSpy, 'update').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
