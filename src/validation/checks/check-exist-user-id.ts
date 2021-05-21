import { CheckExist } from '@/presentation/protocols'
import { CheckExistsIdRepository } from '@/data/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class CheckExistUserId implements CheckExist {
  constructor (
    private readonly checkExistsIdRepository: CheckExistsIdRepository,
    private readonly fieldName: string
  ) {}

  async check (input: object): Promise<Error> {
    const isValid = await this.checkExistsIdRepository.checkId({
      id: input[this.fieldName],
      fieldDatabase: this.fieldName
    })
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
