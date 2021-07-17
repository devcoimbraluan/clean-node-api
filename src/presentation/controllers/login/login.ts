import { badRequest, ok, serverError, unauthorized } from "../../helpers/http/http-helper";
import { Validation } from "../signup/signup-protocols";
import { Controller, httpRequest, httpResponse, Authentication } from "./login-protocols";

export class LoginController implements Controller{
    private readonly validation: Validation
    private readonly authentication: Authentication

    constructor (authentication: Authentication, validation: Validation) {
        this.validation = validation
        this.authentication = authentication
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse>{
        try{
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
        const {email, password} = httpRequest.body
            const accessToken = await this.authentication.auth({
                email,
                password
            })
            if (!accessToken) {
                return unauthorized()
            }
            return ok({accessToken})
        }catch (error) {
            return serverError(error)
        }
    }
}