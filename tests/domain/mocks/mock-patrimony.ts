import { PatrimonyModel } from '@/domain/models'
import { CheckPatrimonyById, LoadPatrimoniesByOwnerId, AddPatrimony, UpdatePatrimony, DeletePatrimony, LoadPatrimonies, LoadPatrimonyById, LoadPatrimoniesByCategoryId } from '@/domain/usecases'

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
  },
  place: {
    id: faker.datatype.number(),
    name: faker.name.findName()
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
  placeId: faker.datatype.number()

})

export const mockAddUpdatePatrimonyParams = (): AddPatrimony.Params => ({
  number: faker.datatype.number().toString(),
  brand: faker.random.word(),
  description: faker.random.words(),
  categoryId: faker.datatype.number(),
  ownerId: faker.datatype.number(),
  placeId: faker.datatype.number()
})

export const mockDeletePatrimonyParams = (): DeletePatrimony.Params => ({
  id: faker.datatype.number()
})

export const mockCheckPatrimonyByIdParams = (): CheckPatrimonyById.Params => ({
  id: faker.datatype.number()
})

export const mockLoadPatrimoniesParams = (): LoadPatrimonies.Params => ({
  skip: faker.datatype.number(),
  take: faker.datatype.number()
})

export const mockLoadPatrimonyById = (): LoadPatrimonyById.Params => ({
  id: faker.datatype.number()
})

export const mockLoadPatrimoniesByOwnerIdParams = (): LoadPatrimoniesByOwnerId.Params => ({
  ownerId: faker.datatype.number()
})

export const mockLoadPatrimoniesByCategoryIdParams = (): LoadPatrimoniesByCategoryId.Params => ({
  categoryId: faker.datatype.number()
})

export class UpdatePatrimonySpy implements UpdatePatrimony {
  params: UpdatePatrimony.Params
  model = mockPatrimonyModel()
  async update (patrimony: UpdatePatrimony.Params): Promise<AddPatrimony.Model> {
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

export class LoadPatrimoniesSpy implements LoadPatrimonies {
  models = mockPatrimoniesModel()
  params: LoadPatrimonies.Params
  async load (params: LoadPatrimonies.Params): Promise<LoadPatrimonies.Model> {
    this.params = params
    return this.models
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

export class CheckPatrimonyByIdSpy implements CheckPatrimonyById {
  params: CheckPatrimonyById.Params
  result = true
  async checkById (params: CheckPatrimonyById.Params): Promise<CheckPatrimonyById.Result> {
    this.params = params
    return this.result
  }
}

export class LoadPatrimoniesByOwnerIdSpy implements LoadPatrimoniesByOwnerId {
  params: LoadPatrimoniesByOwnerId.Params
  model = mockPatrimoniesModel()

  async loadByOwnerId (params: LoadPatrimoniesByOwnerId.Params): Promise<LoadPatrimoniesByOwnerId.Model> {
    this.params = params
    return this.model
  }
}

export class LoadPatrimoniesByCategoryIdSpy implements LoadPatrimoniesByCategoryId {
  params: LoadPatrimoniesByCategoryId.Params
  model = mockPatrimoniesModel()

  async loadByCategoryId (params: LoadPatrimoniesByCategoryId.Params): Promise<LoadPatrimoniesByCategoryId.Model> {
    this.params = params
    return this.model
  }
}
