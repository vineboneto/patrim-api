import { AddCategoryController } from '@/presentation/controllers/'
import { AddCategorySpy, ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

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

describe('AddCategoryController', () => {
  test('Should call AddSector with correct values', async () => {
    const { sut, addCategorySpy } = makeSut()
    const request = { name: faker.name.jobTitle() }
    await sut.handle(request)
    expect(addCategorySpy.params).toEqual(request)
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = { name: faker.name.jobTitle() }
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
