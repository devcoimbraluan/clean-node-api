import {httpResponse, httpRequest, Controller, AddAccount} from './signup-protocols'
import { badRequest, ok } from '../../helpers/http-helper'

import { serverError } from '../../helpers/http-helper'
import { Validation } from '../../helpers/validators/validation'

export class SignUpController implements Controller {
    
    private readonly addAccount: AddAccount
    private readonly validation: Validation

    constructor( addAccount: AddAccount, validation: Validation) {
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

