import { CheckExist } from '@/presentation/protocols'
import { CheckPatrimonyById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class CheckExistPatrimonyId implements CheckExist {
  constructor (
    private readonly checkPatrimonyById: CheckPatrimonyById,
    private readonly fieldName: string
  ) {}

  async check (input: object): Promise<Error> {
    const isValid = await this.checkPatrimonyById.checkById({ id: input[this.fieldName] })
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
