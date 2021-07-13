export class ServerError extends Error {
    constructor () {
        super('Internal server error')
        this.name = 'ServerError'
        Error.captureStackTrace(this, this.constructor)
    }
}