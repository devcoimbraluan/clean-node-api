import { ServerError } from '../../errors/server-error'
import { httpResponse } from '../../protocols/http'
import { UnauthorizedError } from '../../errors/unauthorized-error'

export const badRequest = (error: Error): httpResponse => ({
        statusCode: 400,
        body: error
     })

export const unauthorized = (): httpResponse => ({
        statusCode: 401,
        body: new UnauthorizedError()
})

export const serverError = (error: Error): httpResponse => ({
        statusCode: 500,
        body: new ServerError(error.stack)
})

export const ok = (data: any): httpResponse => ({
        statusCode: 200,
        body: data
})