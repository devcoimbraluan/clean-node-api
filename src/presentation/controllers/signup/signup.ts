import {httpResponse, httpRequest, Controller, EmailValidator, AddAccount} from './signup-protocols'
import { MissingParamError } from '../../errors/missing-params-error'
import { badRequest } from '../../helpers/http-helper'
import { InvalidParamError } from '../../errors/invalid-params-error'
import { certo } from '../../helpers/http-helper'
import { serverError } from '../../helpers/http-helper'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
        for (const field of requiredFields) {
            if(!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
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
        return certo(account)
    }catch (error) {
            return serverError()
            } 
        } 
    }

