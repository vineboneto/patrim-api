import { UpdatePatrimony } from '@/domain/usecases'
import { LogPostgresRepository, LoadPatrimonyFieldByIdPostgres } from '@/infra/db/postgres-prisma'
import { LogUpdatePatrimonyDecorator } from '@/main/decorators'

export const makeUpdatePatrimonyDecorator = (updatePatrimony: UpdatePatrimony): UpdatePatrimony => {
  return new LogUpdatePatrimonyDecorator(
    new LoadPatrimonyFieldByIdPostgres('ownerId'),
    new LogPostgresRepository(),
    updatePatrimony
  )
}
