import { CheckAccessData } from '@/domain/usecases'
import { CheckAccessDataDecorator } from '@/main/decorators'
import { makeDbCheckAccessData } from '@/main/factories/usecases'
import { Controller } from '@/presentation/protocols'

export const makeCheckAccessDataDecorator = (
  controller: Controller,
  templateDataAccess: CheckAccessData.DataAccess[]
): Controller => {
  const dbCheckAccessData = makeDbCheckAccessData()
  return new CheckAccessDataDecorator(
    dbCheckAccessData,
    templateDataAccess,
    controller
  )
}
