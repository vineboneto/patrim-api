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
  const updatePatrimonyPostgres = new UpdatePatrimonyPostgres()
  const loadPatrimonyFieldByIdPostgres = new LoadPatrimonyFieldByIdPostgres('number')
  const dbUpdatePatrimony = new DbUpdatePatrimony(
    updatePatrimonyPostgres,
    loadPatrimonyFieldByIdPostgres,
    checkPatrimonyByFieldPostgres
  )
  return makeUpdatePatrimonyDecorator(dbUpdatePatrimony)
}
