import { makeUpdatePatrimonyDecorator } from '@/main/factories/decorators'
import { DbUpdatePatrimony } from '@/data/usecases'
import { UpdatePatrimony } from '@/domain/usecases'
import {
  CheckDataByFieldPostgres,
  UpdatePatrimonyPostgres,
  LoadDataFieldByIdPostgres
} from '@/infra/db/postgres-prisma'

export const makeDbUpdatePatrimony = (): UpdatePatrimony => {
  const checkPatrimonyByFieldPostgres = new CheckDataByFieldPostgres('number', 'patrimony')
  const loadPatrimonyNumberByIdPostgres = new LoadDataFieldByIdPostgres('number', 'patrimony')
  const updatePatrimonyPostgres = new UpdatePatrimonyPostgres()
  const dbUpdatePatrimony = new DbUpdatePatrimony(
    updatePatrimonyPostgres,
    loadPatrimonyNumberByIdPostgres,
    checkPatrimonyByFieldPostgres
  )
  return makeUpdatePatrimonyDecorator(dbUpdatePatrimony)
}
