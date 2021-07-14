import { InvalidParamError } from "../../errors/invalid-params-error";
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
        const {email, password} = httpRequest.body
        if (!email) {
            return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))    
        }
        if (!password) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
        }
        const isValid = this.emailValidator.isValid(email)
        if (!isValid) {
            return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
        }
    }
}