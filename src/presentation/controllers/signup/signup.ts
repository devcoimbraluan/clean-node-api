import {httpResponse, httpRequest, Controller, EmailValidator, AddAccount} from './signup-protocols'
import { badRequest, ok } from '../../helpers/http-helper'
import { InvalidParamError } from '../../errors/invalid-params-error'
import { serverError } from '../../helpers/http-helper'
import { Validation } from '../../helpers/validators/validation'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount
    private readonly validation: Validation

    constructor(emailValidator: EmailValidator, addAccount: AddAccount, validation: Validation) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
        this.validation = validation
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
        const {name, email, password, passwordConfirmation } = httpRequest.body
        if (password !== passwordConfirmation){
            return badRequest(new InvalidParamError('passwordConfirmation'))
        }
        const isvValid = this.emailValidator.isValid(email)
        if (!isvValid) {
            return badRequest(new InvalidParamError('email'))
        }
        const account = await this.addAccount.add({
            name,
            email,
            password
        })
        return ok(account)
    }catch (error) {
            return serverError(error)
            }
        } 
    }

