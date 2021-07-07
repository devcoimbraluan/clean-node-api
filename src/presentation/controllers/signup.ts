import {httpResponse, httpRequest} from '../protocols/http'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
    handle (httpRequest: httpRequest): httpResponse {
        if (!httpRequest.body.name) {
            return badRequest(new MissingParamError('name'))
            }
        if(!httpRequest.body.email) {
        return badRequest(new MissingParamError('email'))
        }
        const requiredFields = ['name', 'email', 'password']
        for (const field of requiredFields) {
            if(!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
    }
}