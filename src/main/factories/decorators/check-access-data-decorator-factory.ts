import { CheckAccessDataDecorator } from '@/main/decorators'
import { CheckAccessDataPostgres } from '@/infra/db/postgres-prisma'
import { Controller } from '@/presentation/protocols'

export const makeCheckAccessDataDecorator = (
  controller: Controller,
  templateDataAccess: CheckAccessDataDecorator.Template[]
): Controller => {
  const checkAccessDataPostgres = new CheckAccessDataPostgres()
  return new CheckAccessDataDecorator(
    checkAccessDataPostgres,
    templateDataAccess,
    controller
  )
}
