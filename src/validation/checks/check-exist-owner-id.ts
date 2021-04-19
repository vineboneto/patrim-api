import { CheckExist } from '@/presentation/protocols'
import { CheckOwnerById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class CheckExistOwnerId implements CheckExist {
  constructor (
    private readonly checkOwnerById: CheckOwnerById,
    private readonly fieldName: string
  ) {}

  async check (input: object): Promise<Error> {
    const isValid = await this.checkOwnerById.checkById({ id: input[this.fieldName] })
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
