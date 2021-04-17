import {
  CheckPatrimonyByCategoryIdRepository,
  CheckPatrimonyByOwnerIdRepository,
  CheckPatrimonyByPlaceIdRepository,
  LoadPatrimonyByOwnerIdRepository
} from '@/data/protocols'

import faker from 'faker'

export class LoadPatrimonyByOwnerIdRepositorySpy implements LoadPatrimonyByOwnerIdRepository {
  params: LoadPatrimonyByOwnerIdRepository.Params
  model = {
    id: faker.datatype.number(),
    number: faker.datatype.uuid()
  }

  async loadByOwnerId (params: LoadPatrimonyByOwnerIdRepository.Params):
  Promise<LoadPatrimonyByOwnerIdRepository.Model> {
    this.params = params
    return this.model
  }
}

export class CheckPatrimonyByOwnerIdRepositorySpy implements CheckPatrimonyByOwnerIdRepository {
  params: CheckPatrimonyByOwnerIdRepository.Params
  result = false

  async checkByOwnerId (params: CheckPatrimonyByOwnerIdRepository.Params):
  Promise<CheckPatrimonyByOwnerIdRepository.Result> {
    this.params = params
    return this.result
  }
}

export class CheckPatrimonyByCategoryIdRepositorySpy implements CheckPatrimonyByCategoryIdRepository {
  params: CheckPatrimonyByCategoryIdRepository.Params
  result = false

  async checkByCategoryId (params: CheckPatrimonyByCategoryIdRepository.Params):
  Promise<CheckPatrimonyByCategoryIdRepository.Result> {
    this.params = params
    return this.result
  }
}

export class CheckPatrimonyByPlaceIdRepositorySpy implements CheckPatrimonyByPlaceIdRepository {
  params: CheckPatrimonyByPlaceIdRepository.Params
  result = false

  async checkByPlaceId (params: CheckPatrimonyByPlaceIdRepository.Params):
  Promise<CheckPatrimonyByPlaceIdRepository.Result> {
    this.params = params
    return this.result
  }
}
