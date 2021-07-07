import {httpResponse, httpRequest, Controller, EmailValidator} from '../protocols'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { InvalidParamError } from '../errors/invalid-params-error'
import { ServerError } from '../errors/server-error'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    handle (httpRequest: httpRequest): httpResponse {
        try {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
        for (const field of requiredFields) {
            if(!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
        const {email, password, passwordConfirmation } = httpRequest.body
        if (password !== passwordConfirmation){
            return badRequest(new InvalidParamError('passwordConfirmation'))
        }
        const isvValid = this.emailValidator.isValid(email)
        if (!isvValid) {
            return badRequest(new InvalidParamError('email'))
        }} catch (error) {
            return {
                statusCode: 500,
                body: new ServerError()
            } 
        } 
    }
}
