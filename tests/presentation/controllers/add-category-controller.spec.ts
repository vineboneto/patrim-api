import { AddCategoryController } from '@/presentation/controllers/'
import { AddCategorySpy, ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helper'
import { AlreadyExistsError } from '@/presentation/errors'

type SutTypes = {
  addCategorySpy: AddCategorySpy
  validationSpy: ValidationSpy
  sut: AddCategoryController
}

const makeSut = (): SutTypes => {
  const addCategorySpy = new AddCategorySpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddCategoryController(addCategorySpy, validationSpy)
  return {
    addCategorySpy,
    validationSpy,
    sut
  }
}

describe('AddCategoryController', async () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = { name: faker.name.jobTitle() }
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new Error()
    const validation = await sut.handle({ name: faker.name.jobArea() })
    expect(validation).toEqual(badRequest(new Error()))
  })

  test('Should call AddCategory with correct values', async () => {
    const { sut, addCategorySpy } = makeSut()
    const request = { name: faker.name.jobArea() }
    await sut.handle(request)
    expect(addCategorySpy.params).toEqual(request)
  })

  test('Should return AlreadyExists if AddCategory return false', async () => {
    const { sut, addCategorySpy } = makeSut()
    addCategorySpy.result = false
    const param = { name: faker.name.jobArea() }
    const exists = await sut.handle(param)
    expect(exists).toEqual(forbidden(new AlreadyExistsError(param.name)))
  })

  test('Should return 500 if AddCategory throws', async () => {
    const { sut, addCategorySpy } = makeSut()
    jest.spyOn(addCategorySpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle({ name: faker.name.jobArea() })
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ name: faker.name.jobArea() })
    expect(response).toEqual(noContent())
  })
})
