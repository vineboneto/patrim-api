import { CheckExist } from '@/presentation/protocols'

export class CheckExistComposite implements CheckExist {
  constructor (
    private readonly checkExists: CheckExist[]
  ) {}

  async check (input: object): Promise<Error> {
    for (const checkExist of this.checkExists) {
      const error = await checkExist.check(input)
      if (error) {
        return error
      }
    }
    return null
  }
}
