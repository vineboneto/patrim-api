import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, ok, serverError } from '@/presentation/helper'
import { LoadSectorById } from '@/domain/usecases'

export class LoadSectorByIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadSectorById: LoadSectorById
  ) {}

  async handle (request: LoadSectorByIdController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const sectorModel = await this.loadSectorById.loadById(request)
      return sectorModel ? ok(sectorModel) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSectorByIdController {
  export type Request = {
    id: number
    accountId: number
  }
}
