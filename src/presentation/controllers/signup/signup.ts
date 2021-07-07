import {httpResponse, httpRequest, Controller, EmailValidator, AddAccount} from './signup-protocols'
import { MissingParamError } from '../../errors/missing-params-error'
import { badRequest } from '../../helpers/http-helper'
import { InvalidParamError } from '../../errors/invalid-params-error'
import { ServerError } from '../../errors/server-error'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }

    handle (httpRequest: httpRequest): httpResponse {
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
        const account = this.addAccount.add({
            name,
            email,
            password
        })
        return{
            statusCode: 200,
            body: account
        }
    }catch (error) {
            return {
                statusCode: 500,
                body: new ServerError()
            } 
        } 
    }
}
