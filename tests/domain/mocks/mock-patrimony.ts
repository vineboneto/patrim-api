import { PatrimonyModel } from '@/domain/models'
import {
  LoadPatrimoniesByOwnerId,
  AddPatrimony,
  UpdatePatrimony,
  DeletePatrimony,
  LoadPatrimonies,
  LoadPatrimonyById,
  LoadPatrimoniesByCategoryId,
  LoadPatrimonyByNumber,
  LoadPatrimoniesBySectorId
} from '@/domain/usecases'

import faker from 'faker'

export const mockPatrimonyModel = (): PatrimonyModel => ({
  id: faker.datatype.number(),
  brand: faker.random.word(),
  number: faker.datatype.number().toString(),
  description: faker.random.words(),
  category: {
    id: faker.datatype.number(),
    name: faker.name.findName()
  },
  owner: {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    sector: {
      id: faker.datatype.number(),
      name: faker.name.findName()
    }
  }
})

export const mockPatrimoniesModel = (): PatrimonyModel[] => ([
  mockPatrimonyModel(),
  mockPatrimonyModel(),
  mockPatrimonyModel()
])

export const mockUpdatePatrimonyParams = (): UpdatePatrimony.Params => ({
  id: faker.datatype.number(),
  number: '123',
  brand: faker.random.word(),
  description: faker.random.words(),
  categoryId: faker.datatype.number(),
  ownerId: faker.datatype.number(),
  accountId: faker.datatype.number()

})

export const mockAddPatrimonyParams = (): AddPatrimony.Params => ({
  number: faker.datatype.number().toString(),
  brand: faker.random.word(),
  description: faker.random.words(),
  categoryId: faker.datatype.number(),
  ownerId: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export const mockDeletePatrimonyParams = (): DeletePatrimony.Params => ({
  id: faker.datatype.number()
})

export const mockLoadPatrimoniesParams = (): LoadPatrimonies.Params => ({
  skip: faker.datatype.number(),
  take: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export const mockLoadPatrimonyByIdParams = (): LoadPatrimonyById.Params => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export const mockLoadPatrimoniesByOwnerIdParams = (): LoadPatrimoniesByOwnerId.Params => ({
  ownerId: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export const mockLoadPatrimoniesBySectorIdParams = (): LoadPatrimoniesBySectorId.Params => ({
  sectorId: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export const mockLoadPatrimoniesByCategoryIdParams = (): LoadPatrimoniesByCategoryId.Params => ({
  categoryId: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export const mockLoadPatrimonyByNumberParams = (): LoadPatrimonyByNumber.Params => ({
  accountId: faker.datatype.number(),
  number: faker.datatype.number().toString()
})

export class UpdatePatrimonySpy implements UpdatePatrimony {
  params: UpdatePatrimony.Params
  model = mockPatrimonyModel()
  callsCount = 0

  async update (patrimony: UpdatePatrimony.Params): Promise<AddPatrimony.Model> {
    this.callsCount++
    this.params = patrimony
    return this.model
  }
}

export class AddPatrimonySpy implements AddPatrimony {
  params: AddPatrimony.Params
  model = mockPatrimonyModel()
  async add (patrimony: AddPatrimony.Params): Promise<AddPatrimony.Model> {
    this.params = patrimony
    return this.model
  }
}

export class LoadPatrimonyByIdSpy implements LoadPatrimonyById {
  model = mockPatrimonyModel()
  params: LoadPatrimonyById.Params
  async loadById (params: LoadPatrimonyById.Params): Promise<LoadPatrimonyById.Model> {
    this.params = params
    return this.model
  }
}

export class LoadPatrimonyByNumberSpy implements LoadPatrimonyByNumber {
  model = mockPatrimonyModel()
  params: LoadPatrimonyByNumber.Params
  async loadByNumber (params: LoadPatrimonyByNumber.Params): Promise<LoadPatrimonyByNumber.Model> {
    this.params = params
    return this.model
  }
}

export class LoadPatrimoniesSpy implements LoadPatrimonies {
  params: LoadPatrimonies.Params
  result = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async load (params: LoadPatrimonies.Params): Promise<LoadPatrimonies.Model> {
    this.params = params
    return this.result
  }
}

export class DeletePatrimonySpy implements DeletePatrimony {
  params: DeletePatrimony.Params
  model = mockPatrimonyModel()
  async delete (params: DeletePatrimony.Params): Promise<DeletePatrimony.Model> {
    this.params = params
    return this.model
  }
}

export class LoadPatrimoniesByOwnerIdSpy implements LoadPatrimoniesByOwnerId {
  params: LoadPatrimonies.Params
  result = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadByOwnerId (params: LoadPatrimoniesByOwnerId.Params): Promise<LoadPatrimoniesByOwnerId.Model> {
    this.params = params
    return this.result
  }
}

export class LoadPatrimoniesBySectorIdSpy implements LoadPatrimoniesBySectorId {
  params: LoadPatrimonies.Params
  result = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadBySectorId (params: LoadPatrimoniesBySectorId.Params): Promise<LoadPatrimoniesBySectorId.Model> {
    this.params = params
    return this.result
  }
}

export class LoadPatrimoniesByCategoryIdSpy implements LoadPatrimoniesByCategoryId {
  params: LoadPatrimonies.Params
  result = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadByCategoryId (params: LoadPatrimoniesByCategoryId.Params): Promise<LoadPatrimoniesByCategoryId.Model> {
    this.params = params
    return this.result
  }
}
