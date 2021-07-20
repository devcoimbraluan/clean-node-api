import {Validation} from '../../protocols/validation'
import { EmailValidator } from '../../protocols/email-validator'
import { InvalidParamError } from '../../errors/invalid-params-error'

export class EmailValidation implements Validation {
    constructor (
        private readonly fieldName: string, 
        private readonly emailValidator: EmailValidator) {
        this.fieldName = fieldName
        this.emailValidator = emailValidator
    }
    validate (input: any): Error {
        const isvValid = this.emailValidator.isValid(input[this.fieldName])
        if (!isvValid) {
            return new InvalidParamError(this.fieldName)
        }
    }
}