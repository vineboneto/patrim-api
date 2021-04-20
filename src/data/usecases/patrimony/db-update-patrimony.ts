import { UpdatePatrimony } from '@/domain/usecases'
import {
  CheckPatrimonyByNumberRepository,
  LoadPatrimonyNumberByIdRepository,
  UpdatePatrimonyRepository
} from '@/data/protocols'

export class DbUpdatePatrimony implements UpdatePatrimony {
  constructor (
    private readonly updatePatrimonyRepository: UpdatePatrimonyRepository,
    private readonly loadPatrimonyNumberByIdRepository: LoadPatrimonyNumberByIdRepository,
    private readonly checkPatrimonyByNumberRepository: CheckPatrimonyByNumberRepository
  ) {}

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    const { number } = await this.loadPatrimonyNumberByIdRepository.loadNumberById(params.id)
    if (number === params.number) {
      return this.updatePatrimonyRepository.update(params)
    } else {
      await this.checkPatrimonyByNumberRepository.checkByNumber(params.number)
    }
    return null
  }
}
