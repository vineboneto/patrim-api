import { DeleteOwner, LoadOwners, AddOwner, UpdateOwner, LoadOwnerById } from '@/domain/usecases'
import { OwnerModel } from '@/domain/models'

import faker from 'faker'

export const mockOwnerModel = (): OwnerModel => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  sector: {
    id: faker.datatype.number(),
    name: faker.name.findName()
  }
})

export const mockOwnersModel = (): OwnerModel[] => ([
  mockOwnerModel(),
  mockOwnerModel(),
  mockOwnerModel()
])

export const mockAddOwnerParams = (): AddOwner.Params => ({
  name: faker.name.findName(),
  sectorId: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export const mockUpdateOwnerParams = (): UpdateOwner.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export const mockDeleteOwnerParams = (): DeleteOwner.Params => ({
  id: faker.datatype.number()
})

export const mockLoadOwnersParams = (): LoadOwners.Params => ({
  skip: faker.datatype.number(),
  take: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export const mockLoadOwnerByIdParams = (): LoadOwnerById.Params => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export class UpdateOwnerSpy implements UpdateOwner {
  params: UpdateOwner.Params
  model = mockOwnerModel()
  async update (params: UpdateOwner.Params): Promise<UpdateOwner.Model> {
    this.params = params
    return this.model
  }
}

export class AddOwnerSpy implements AddOwner {
  params: AddOwner.Params
  model = mockOwnerModel()
  async add (params: AddOwner.Params): Promise<AddOwner.Model> {
    this.params = params
    return this.model
  }
}

export class LoadOwnerByIdSpy implements LoadOwnerById {
  model = mockOwnerModel()
  params: LoadOwnerById.Params
  async loadById (params: LoadOwnerById.Params): Promise<LoadOwnerById.Model> {
    this.params = params
    return this.model
  }
}

export class LoadOwnersSpy implements LoadOwners {
  params: LoadOwners.Params
  result = {
    model: mockOwnersModel(),
    count: mockOwnersModel().length
  }

  async load (params: LoadOwners.Params): Promise<LoadOwners.Model> {
    this.params = params
    return this.result
  }
}

export class DeleteOwnerSpy implements DeleteOwner {
  params: DeleteOwner.Params
  model = mockOwnerModel()
  async delete (params: DeleteOwner.Params): Promise<DeleteOwner.Model> {
    this.params = params
    return this.model
  }
}
