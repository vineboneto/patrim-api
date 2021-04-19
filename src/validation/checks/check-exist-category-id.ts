import { CheckExist } from '@/presentation/protocols'
import { CheckCategoryById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class CheckExistCategoryId implements CheckExist {
  constructor (
    private readonly checkCategoryById: CheckCategoryById,
    private readonly fieldName: string
  ) {}

  async check (input: object): Promise<Error> {
    const isValid = await this.checkCategoryById.checkById({ id: input[this.fieldName] })
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
