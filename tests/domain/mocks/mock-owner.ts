import { CheckOwnerById, DeleteOwner, LoadOwners, SaveOwner, UpdateOwner } from '@/domain/usecases'
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

export const mockAddOwnerParams = (): SaveOwner.Params => ({
  name: faker.name.findName(),
  sectorId: faker.datatype.number()
})

export const mockUpdateOwnerParams = (): UpdateOwner.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number()
})

export const mockCheckOwnerByIdParams = (): CheckOwnerById.Params => ({
  id: faker.datatype.number()
})

export const mockDeleteOwnerParams = (): DeleteOwner.Params => ({
  id: faker.datatype.number()
})

export const mockLoadOwnersParams = (): LoadOwners.Params => ({
  skip: faker.datatype.number(),
  take: faker.datatype.number()
})

export class UpdateOwnerSpy implements UpdateOwner {
  params: UpdateOwner.Params
  model = mockOwnerModel()
  async update (sector: UpdateOwner.Params): Promise<UpdateOwner.Model> {
    this.params = sector
    return this.model
  }
}

export class SaveOwnerSpy implements SaveOwner {
  params: SaveOwner.Params
  model = mockOwnerModel()
  async save (owner: SaveOwner.Params): Promise<SaveOwner.Model> {
    this.params = owner
    return this.model
  }
}

export class CheckOwnerByIdSpy implements CheckOwnerById {
  params: CheckOwnerById.Params
  result = true
  async checkById (params: CheckOwnerById.Params): Promise<CheckOwnerById.Result> {
    this.params = params
    return this.result
  }
}

export class LoadOwnersSpy implements LoadOwners {
  model = mockOwnersModel()
  params: LoadOwners.Params
  async load (params: LoadOwners.Params): Promise<LoadOwners.Model> {
    this.params = params
    return this.model
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
