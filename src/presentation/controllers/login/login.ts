import { MissingParamError } from "../../errors/missing-params-error";
import { badRequest } from "../../helpers/http-helper";
import { Controller, httpRequest, httpResponse } from "../../protocols";

export class LoginController implements Controller{
    async handle (httpRequest: httpRequest): Promise<httpResponse>{
        if (!httpRequest.body.email) {
            return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))    
        }
        if (!httpRequest.body.passowrd) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
        }
    }
}