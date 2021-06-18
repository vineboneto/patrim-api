import { DbAddPatrimony } from '@/data/usecases'
import { AddPatrimony } from '@/domain/usecases'
import { CheckDataByFieldPostgres, AddPatrimonyPostgres } from '@/infra/db/postgres-prisma'

export const makeDbAddPatrimony = (): AddPatrimony => {
  const checkPatrimonyByFieldPostgres = new CheckDataByFieldPostgres('number', 'patrimony')
  const addPatrimonyPostgres = new AddPatrimonyPostgres()
  return new DbAddPatrimony(addPatrimonyPostgres, checkPatrimonyByFieldPostgres)
}
