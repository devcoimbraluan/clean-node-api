import {httpResponse, httpRequest, Controller, AddAccount} from './signup-controller-protocols'
import { badRequest, ok } from '../../helpers/http/http-helper'

import { serverError } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'

export class SignUpController implements Controller {
    constructor( 
        private readonly addAccount: AddAccount,
        private readonly  validation: Validation) {
        this.addAccount = addAccount
        this.validation = validation
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
        const {name, email, password, } = httpRequest.body
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

