import { CheckExist } from '@/presentation/protocols'

export class CheckExistSpy implements CheckExist {
  input: object
  result = null

  async check (input: object): Promise<Error> {
    this.input = input
    return this.result
  }
}
