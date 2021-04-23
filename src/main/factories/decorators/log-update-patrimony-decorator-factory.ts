import { UpdatePatrimony } from '@/domain/usecases'
import { LogPostgresRepository, PatrimonyPostgresRepository } from '@/infra/db/postgres-prisma'
import { LogUpdatePatrimonyDecorator } from '@/main/decorators'

export const makeUpdatePatrimonyDecorator = (updatePatrimony: UpdatePatrimony): UpdatePatrimony => {
  return new LogUpdatePatrimonyDecorator(
    new PatrimonyPostgresRepository(),
    new LogPostgresRepository(),
    updatePatrimony
  )
}
