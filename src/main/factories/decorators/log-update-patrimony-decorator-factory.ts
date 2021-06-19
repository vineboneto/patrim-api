import { UpdatePatrimony } from '@/domain/usecases'
import { LogPostgresRepository, LoadDataFieldByIdPostgres } from '@/infra/db/postgres-prisma'
import { LogUpdatePatrimonyDecorator } from '@/main/decorators'

export const makeUpdatePatrimonyDecorator = (updatePatrimony: UpdatePatrimony): UpdatePatrimony => {
  return new LogUpdatePatrimonyDecorator(
    new LoadDataFieldByIdPostgres('ownerId', 'patrimony'),
    new LogPostgresRepository(),
    updatePatrimony
  )
}
