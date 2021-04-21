import { makeDbCheckPatrimonyById } from '@/main/factories/usecases'
import { CheckExist } from '@/presentation/protocols'
import { CheckExistComposite, CheckExistPatrimonyId } from '@/validation/checks'

export const makeDeletePatrimonyCheckExist = (): CheckExist => {
  const checkExists: CheckExist[] = []
  checkExists.push(new CheckExistPatrimonyId(makeDbCheckPatrimonyById(), 'id'))
  return new CheckExistComposite(checkExists)
}
