import { AddPatrimonyController } from '@/presentation/controllers'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { AddPatrimonySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): AddPatrimonyController.Request => ({
  brand: faker.random.word(),
  number: faker.datatype.number().toString(),
  description: faker.random.words(),
  categoryId: faker.datatype.number(),
  accountId: faker.datatype.number(),
  ownerId: faker.datatype.number()
})

type SutTypes = {
  sut: AddPatrimonyController
  addPatrimonySpy: AddPatrimonySpy
}

const makeSut = (): SutTypes => {
  const addPatrimonySpy = new AddPatrimonySpy()
  const sut = new AddPatrimonyController(addPatrimonySpy)
  return {
    sut,
    addPatrimonySpy
  }
}

describe('AddPatrimonyController', () => {
  test('Should call AddPatrimony with correct values', async () => {
    const { sut, addPatrimonySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addPatrimonySpy.params).toEqual(request)
  })

  test('Should return 403 if AddPatrimony fails', async () => {
    const { sut, addPatrimonySpy } = makeSut()
    addPatrimonySpy.model = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.number)))
  })

  test('Should return 200 on success', async () => {
    const { sut, addPatrimonySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addPatrimonySpy.model))
  })

  test('Should return 500 if AddPatrimony throws', async () => {
    const { sut, addPatrimonySpy } = makeSut()
    jest.spyOn(addPatrimonySpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
