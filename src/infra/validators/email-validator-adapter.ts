import { EmailValidator } from '@/validation/protocols'

import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    validator.isEmail(email)
    return null
  }
}
