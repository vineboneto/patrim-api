import {
  AddPatrimonyRepository,
  CheckPatrimonyByCategoryIdRepository,
  CheckPatrimonyByIdRepository,
  CheckPatrimonyByNumberRepository,
  CheckPatrimonyByOwnerIdRepository,
  CheckPatrimonyByPlaceIdRepository,
  DeletePatrimonyRepository,
  LoadPatrimoniesByOwnerIdRepository,
  LoadPatrimoniesRepository,
  LoadPatrimonyByIdRepository,
  LoadPatrimonyNumberByIdRepository,
  UpdatePatrimonyRepository
} from '@/data/protocols'
import {
  mockAddUpdatePatrimonyParams,
  mockCheckPatrimonyByIdParams,
  mockDeletePatrimonyParams,
  mockLoadPatrimoniesByOwnerIdParams,
  mockLoadPatrimoniesParams,
  mockLoadPatrimonyById,
  mockPatrimoniesModel,
  mockPatrimonyModel,
  mockUpdatePatrimonyParams
} from '@/tests/domain/mocks'

export const mockAddPatrimonyRepositoryParams = ():
AddPatrimonyRepository.Params => mockAddUpdatePatrimonyParams()

export const mockUpdatePatrimonyRepositoryParams = ():
UpdatePatrimonyRepository.Params => mockUpdatePatrimonyParams()

export const mockCheckPatrimonyByIdRepositoryParams = ():
CheckPatrimonyByIdRepository.Params => mockCheckPatrimonyByIdParams()

export const mockDeletePatrimonyRepositoryParams = ():
DeletePatrimonyRepository.Params => mockDeletePatrimonyParams()

export const mockLoadPatrimoniesRepositoryParams = ():
LoadPatrimoniesRepository.Params => mockLoadPatrimoniesParams()

export const mockLoadPatrimonyByIdRepository = ():
LoadPatrimonyByIdRepository.Params => mockLoadPatrimonyById()

export const mockLoadPatrimoniesByOwnerIdRepositoryParams = ():
LoadPatrimoniesByOwnerIdRepository.Params => mockLoadPatrimoniesByOwnerIdParams()

export class AddPatrimonyRepositorySpy implements AddPatrimonyRepository {
  params: AddPatrimonyRepository.Params
  model = mockPatrimonyModel()
  async add (params: AddPatrimonyRepository.Params): Promise<AddPatrimonyRepository.Model> {
    this.params = params
    return this.model
  }
}

export class UpdatePatrimonyRepositorySpy implements UpdatePatrimonyRepository {
  params: UpdatePatrimonyRepository.Params
  model = mockPatrimonyModel()
  async update (params: UpdatePatrimonyRepository.Params): Promise<UpdatePatrimonyRepository.Model> {
    this.params = params
    return this.model
  }
}

export class DeletePatrimonyRepositorySpy implements DeletePatrimonyRepository {
  model = mockPatrimonyModel()
  params: DeletePatrimonyRepository.Params
  async delete (params: DeletePatrimonyRepository.Params): Promise<DeletePatrimonyRepository.Model> {
    this.params = params
    return this.model
  }
}

export class LoadPatrimoniesRepositorySpy implements LoadPatrimoniesRepository {
  models = mockPatrimoniesModel()
  params: LoadPatrimoniesRepository.Params
  async loadAll (params: LoadPatrimoniesRepository.Params): Promise<LoadPatrimoniesRepository.Model> {
    this.params = params
    return this.models
  }
}

export class LoadPatrimonyByIdRepositorySpy implements LoadPatrimonyByIdRepository {
  params: LoadPatrimonyByIdRepository.Params
  model = mockPatrimonyModel()
  async loadById (params: LoadPatrimonyByIdRepository.Params): Promise<LoadPatrimonyByIdRepository.Model> {
    this.params = params
    return this.model
  }
}

export class LoadPatrimonyNumberByIdRepositorySpy implements LoadPatrimonyNumberByIdRepository {
  id: number
  model = { number: mockUpdatePatrimonyParams().number }
  async loadNumberById (id: number): Promise<LoadPatrimonyNumberByIdRepository.Model> {
    this.id = id
    return this.model
  }
}

export class LoadPatrimoniesByOwnerIdRepositorySpy implements LoadPatrimoniesByOwnerIdRepository {
  params: LoadPatrimoniesByOwnerIdRepository.Params
  model = mockPatrimoniesModel()

  async loadByOwnerId (params: LoadPatrimoniesByOwnerIdRepository.Params):
  Promise<LoadPatrimoniesByOwnerIdRepository.Model> {
    this.params = params
    return this.model
  }
}

export class CheckPatrimonyByIdRepositorySpy implements CheckPatrimonyByIdRepository {
  params: CheckPatrimonyByIdRepository.Params
  result = true
  async checkById (params: CheckPatrimonyByIdRepository.Params): Promise<CheckPatrimonyByIdRepository.Result> {
    this.params = params
    return this.result
  }
}

export class CheckPatrimonyByNumberRepositorySpy implements CheckPatrimonyByNumberRepository {
  number: string
  result = false
  async checkByNumber (number: string): Promise<boolean> {
    this.number = number
    return this.result
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
