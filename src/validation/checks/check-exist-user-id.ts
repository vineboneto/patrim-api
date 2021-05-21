import { CheckExist } from '@/presentation/protocols'
import { CheckExistsUserIdRepository } from '@/data/protocols'
import { AccessDeniedError } from '@/presentation/errors'

const field = 'accountId'

export class CheckExistUserId implements CheckExist {
  constructor (
    private readonly checkExistsIdRepository: CheckExistsUserIdRepository,
    private readonly database: string
  ) {}

  async check (input: object): Promise<Error> {
    const isValid = await this.checkExistsIdRepository.checkUserId({
      accountId: input[field],
      database: this.database
    })
    if (!isValid) {
      return new AccessDeniedError()
    }
    return null
  }
}
