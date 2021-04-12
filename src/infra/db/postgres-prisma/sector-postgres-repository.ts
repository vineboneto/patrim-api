import {
  AddSectorRepository,
  CheckSectorByIdRepository,
  CheckSectorByNameRepository,
  DeleteSectorRepository,
  LoadSectorsRepository,
  UpdateSectorRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

import { PrismaClient } from '@prisma/client'

export class SectorPostgresRepository implements
  AddSectorRepository,
  UpdateSectorRepository,
  DeleteSectorRepository,
  CheckSectorByNameRepository,
  CheckSectorByIdRepository,
  LoadSectorsRepository {
  private readonly prismaClient: PrismaClient

  constructor () {
    this.prismaClient = PrismaHelper.getConnection()
  }

  async add (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Model> {
    const { name } = sector
    const sectorModel = await this.prismaClient.sector.create({
      data: {
        name
      }
    })
    return sectorModel !== null
  }

  async update (sector: UpdateSectorRepository.Params): Promise<UpdateSectorRepository.Result> {
    const { id, name } = sector
    const sectorResult = await this.prismaClient.sector.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      }
    })
    return sectorResult !== null
  }

  async delete (id: number): Promise<DeleteSectorRepository.Model> {
    const sectorDeleted = await this.prismaClient.sector.delete({
      where: {
        id: Number(id)
      }
    })
    return sectorDeleted
  }

  async checkByName (name: string): Promise<boolean> {
    const sector = await this.prismaClient.sector.findFirst({
      where: {
        name: name
      },
      select: {
        id: true
      }
    })
    return sector !== null
  }

  async checkById (id: number): Promise<CheckSectorByIdRepository.Result> {
    const sectorWithOnlyId = await this.prismaClient.sector.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        id: true
      }
    })
    return sectorWithOnlyId !== null
  }

  async loadAll (): Promise<LoadSectorsRepository.Model> {
    const sectors = await this.prismaClient.sector.findMany()
    return sectors
  }
}
