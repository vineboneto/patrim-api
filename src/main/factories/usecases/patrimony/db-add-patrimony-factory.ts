import { DbAddPatrimony } from '@/data/usecases'
import { AddPatrimony } from '@/domain/usecases'
import { CheckPatrimonyByFieldPostgres, AddPatrimonyPostgres } from '@/infra/db/postgres-prisma'

export const makeDbAddPatrimony = (): AddPatrimony => {
  const checkPatrimonyByFieldPostgres = new CheckPatrimonyByFieldPostgres('number')
  const addPatrimonyPostgres = new AddPatrimonyPostgres()
  return new DbAddPatrimony(addPatrimonyPostgres, checkPatrimonyByFieldPostgres)
}
