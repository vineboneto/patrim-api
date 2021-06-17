import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helper'

import faker from 'faker'

export class ControllerSpy implements Controller {
  request: any
  httpResponse = ok(faker.datatype.uuid())
  async handle (request: any): Promise<HttpResponse> {
    this.request = request
    return this.httpResponse
  }
}
