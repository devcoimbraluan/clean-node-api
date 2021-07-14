import { Authentication } from "../../../domain/usecases/authentication";
import { InvalidParamError } from "../../errors/invalid-params-error";
import { MissingParamError } from "../../errors/missing-params-error";
import { badRequest, serverError } from "../../helpers/http-helper";
import { Controller, httpRequest, httpResponse } from "../../protocols";
import { EmailValidator } from "../signup/signup-protocols";

export class LoginController implements Controller{
    private readonly emailValidator: EmailValidator
    private readonly authentication: Authentication

    constructor (emailValidator: EmailValidator, authentication: Authentication) {
        this.emailValidator = emailValidator
        this.authentication = authentication
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse>{
        try{
        const requiredFields = ['email', 'password']
        for (const field of requiredFields) {
        if(!httpRequest.body[field]) {
            return badRequest(new MissingParamError(field))
        }
    }
        const {email, password} = httpRequest.body
        const isValid = this.emailValidator.isValid(email)
        if (!isValid) {
            return badRequest(new InvalidParamError('email'))
            }
            await this.authentication.auth(email, password)
        }catch (error) {
            return serverError(error)
        }
        
    }
}

