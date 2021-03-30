import { EmailValidator } from '@/validation/protocols'

export class EmailValidatorSpy implements EmailValidator {
  email: string
  emailValid = true
  isValid (email: string): boolean {
    this.email = email
    return this.emailValid
  }
}
