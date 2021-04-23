import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimonyByNumber } from '@/domain/usecases'

export class LoadPatrimonyByNumberController implements Controller {
  constructor (
    private readonly loadPatrimonyByNumber: LoadPatrimonyByNumber
  ) {}

  async handle (request: LoadPatrimonyByNumberController.Request): Promise<HttpResponse> {
    try {
      const patrimonyModel = await this.loadPatrimonyByNumber.loadByNumber(request.number)
      return patrimonyModel ? ok(patrimonyModel) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadPatrimonyByNumberController {
  export type Request = {
    number: string
  }
}
