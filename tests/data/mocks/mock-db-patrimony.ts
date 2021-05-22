import {
  AddPatrimonyRepository,
  CheckPatrimonyByCategoryIdRepository,
  CheckPatrimonyByIdRepository,
  CheckPatrimonyByNumberRepository,
  CheckPatrimonyByOwnerIdRepository,
  DeletePatrimonyRepository,
  LoadPatrimoniesByCategoryIdRepository,
  LoadPatrimoniesByOwnerIdRepository,
  LoadPatrimoniesRepository,
  LoadPatrimonyByIdRepository,
  LoadPatrimonyByNumberRepository,
  LoadPatrimonyNumberByIdRepository,
  LoadPatrimonyOwnerIdByIdRepository,
  UpdatePatrimonyRepository
} from '@/data/protocols'
import {
  mockPatrimoniesModel,
  mockPatrimonyModel,
  mockUpdatePatrimonyParams
} from '@/tests/domain/mocks'

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
  params: LoadPatrimoniesRepository.Params
  result = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadAll (params: LoadPatrimoniesRepository.Params): Promise<LoadPatrimoniesRepository.Model> {
    this.params = params
    return this.result
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

export class LoadPatrimonyByNumberRepositorySpy implements LoadPatrimonyByNumberRepository {
  params: LoadPatrimonyByNumberRepository.Params
  model = mockPatrimonyModel()
  async loadByNumber (params: LoadPatrimonyByNumberRepository.Params): Promise<LoadPatrimonyByNumberRepository.Model> {
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

export class LoadPatrimonyOwnerIdByIdRepositorySpy implements LoadPatrimonyOwnerIdByIdRepository {
  id: number
  ownerId = mockUpdatePatrimonyParams().ownerId
  async loadOwnerIdById (id: number): Promise<number> {
    this.id = id
    return this.ownerId
  }
}

export class LoadPatrimoniesByOwnerIdRepositorySpy implements LoadPatrimoniesByOwnerIdRepository {
  params: LoadPatrimoniesByOwnerIdRepository.Params
  result = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadByOwnerId (params: LoadPatrimoniesByOwnerIdRepository.Params):
  Promise<LoadPatrimoniesByOwnerIdRepository.Model> {
    this.params = params
    return this.result
  }
}

export class LoadPatrimoniesByCategoryIdRepositorySpy implements LoadPatrimoniesByCategoryIdRepository {
  params: LoadPatrimoniesByCategoryIdRepository.Params
  result = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadByCategoryId (params: LoadPatrimoniesByCategoryIdRepository.Params):
  Promise<LoadPatrimoniesByCategoryIdRepository.Model> {
    this.params = params
    return this.result
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
  params: CheckPatrimonyByNumberRepository.Params
  callsCount = 0
  result = false
  async checkByNumber (params: CheckPatrimonyByNumberRepository.Params): Promise<boolean> {
    this.callsCount++
    this.params = params
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
