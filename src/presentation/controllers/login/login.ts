import { MissingParamError } from "../../errors/missing-params-error";
import { badRequest } from "../../helpers/http-helper";
import { Controller, httpRequest, httpResponse } from "../../protocols";
import { EmailValidator } from "../signup/signup-protocols";

export class LoginController implements Controller{
    private readonly emailValidator: EmailValidator

    constructor (emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse>{
        if (!httpRequest.body.email) {
            return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))    
        }
        if (!httpRequest.body.password) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
        }
        this.emailValidator.isValid(httpRequest.body.email)
    }
}