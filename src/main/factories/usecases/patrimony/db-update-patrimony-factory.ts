import { makeUpdatePatrimonyDecorator } from '@/main/factories/decorators'
import { DbUpdatePatrimony } from '@/data/usecases'
import { UpdatePatrimony } from '@/domain/usecases'
import {
  CheckDataByFieldPostgres,
  UpdatePatrimonyPostgres,
  LoadPatrimonyFieldByIdPostgres
} from '@/infra/db/postgres-prisma'

export const makeDbUpdatePatrimony = (): UpdatePatrimony => {
  const checkPatrimonyByFieldPostgres = new CheckDataByFieldPostgres('number', 'patrimony')
  const loadPatrimonyFieldByIdPostgres = new LoadPatrimonyFieldByIdPostgres('number')
  const updatePatrimonyPostgres = new UpdatePatrimonyPostgres()
  const dbUpdatePatrimony = new DbUpdatePatrimony(
    updatePatrimonyPostgres,
    loadPatrimonyFieldByIdPostgres,
    checkPatrimonyByFieldPostgres
  )
  return makeUpdatePatrimonyDecorator(dbUpdatePatrimony)
}
