import { AddSectorController } from '@/presentation/controllers'
import { AddSectorSpy } from '@/tests/presentation/mocks'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, serverError } from '@/presentation/helper/http-helper'

import faker from 'faker'

const mockRequest = (): AddSectorController.Request => ({
  name: faker.name.jobArea()
})

type SutTypes = {
  sut: AddSectorController
  addSectorSpy: AddSectorSpy
}

const makeSut = (): SutTypes => {
  const addSectorSpy = new AddSectorSpy()
  const sut = new AddSectorController(addSectorSpy)
  return {
    sut,
    addSectorSpy
  }
}

describe('AddSectorController', () => {
  test('Should call AddSector with correct values', async () => {
    const { sut, addSectorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addSectorSpy.params).toEqual(request)
  })

  test('Should return 400 if name not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 500 if AddSector throws', async () => {
    const { sut, addSectorSpy } = makeSut()
    jest.spyOn(addSectorSpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
