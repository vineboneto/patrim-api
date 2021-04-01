import { LogPostgresRepository } from '@/infra/db/postgres-prisma'
import { LogControllerDecorator } from '@/main/decorators'
import { Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  return new LogControllerDecorator(controller, new LogPostgresRepository())
}
